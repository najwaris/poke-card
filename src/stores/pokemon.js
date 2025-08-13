import { defineStore } from 'pinia';

const LIST_URL = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0';

function safeLocalStorageGet(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
}
function safeLocalStorageSet(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* quota */ }
}

export const usePokemonStore = defineStore('pokemon', {
    state: () => ({
        list: [], // { name, url }
        detailsMap: {}, // name -> details
        edited: safeLocalStorageGet('edited', {}), // name -> { summary, favorite }
        isLoadingList: false,
        loadingNames: new Set(),
        error: null,
    }),
    getters: {
        getDetailsByName: (state) => (name) => state.detailsMap[name] || null,
        getMergedByName: (state) => (name) => {
            const d = state.detailsMap[name];
            const e = state.edited[name] || {};
            if (!d) return null;
            return { ...d, edited: e, summary: e.summary ?? defaultSummary(d), favorite: !!e.favorite };
        },
    },
    actions: {
        async loadList() {
            if (this.list.length) return; // don't refetch
            this.isLoadingList = true;
            this.error = null;
            try {
                const res = await fetch(LIST_URL);
                if (!res.ok) throw new Error('Failed to load list');
                const json = await res.json();
                this.list = json.results; // [{ name, url }]
            } catch (e) {
                this.error = e.message || String(e);
            } finally {
                this.isLoadingList = false;
            }
        },

        async loadDetails(name, url) {
            if (this.detailsMap[name]) return this.detailsMap[name];
            if (this.loadingNames.has(name)) return null;
            this.loadingNames.add(name);
            try {
                const res = await fetch(url);
                if (!res.ok) throw new Error(`Failed to load ${name}`);
                const data = await res.json();
                // derive short fields to avoid heavy objects in state
                const details = simplifyPokemon(data);
                this.detailsMap[name] = details;
                return details;
            } catch (e) {
                console.warn(e);
                throw e;
            } finally {
                this.loadingNames.delete(name);
            }
        },

        async prefetchDetails(concurrency = 10) {
            // Why: Prevent hammering API; fetch in limited parallel
            const queue = [...this.list];
            const workers = Array.from({ length: concurrency }, async () => {
                while (queue.length) {
                    const item = queue.shift();
                    try { await this.loadDetails(item.name, item.url); } catch {/* ignore */ }
                }
            });
            await Promise.all(workers);
        },

        setEdit(name, payload) {
            const prev = this.edited[name] || {};
            this.edited[name] = { ...prev, ...payload };
            safeLocalStorageSet('edited', this.edited);
        },
    },
});

function simplifyPokemon(p) {
    const artwork = p.sprites?.other?.['official-artwork']?.front_default || p.sprites?.front_default;
    const types = (p.types || []).map((t) => t.type.name);
    const abilities = (p.abilities || []).map((a) => a.ability.name);
    const stats = (p.stats || []).map((s) => ({ name: s.stat.name, base: s.base_stat }));
    const moves = (p.moves || []).slice(0, 12).map((m) => m.move.name);
    return {
        id: p.id,
        name: p.name,
        height: p.height,
        weight: p.weight,
        types,
        abilities,
        stats,
        moves,
        sprites: {
            artwork,
            front: p.sprites?.front_default,
            back: p.sprites?.back_default,
        },
    };
}

function defaultSummary(d) {
    const typeText = d.types?.join(', ');
    return `A ${typeText} Pokémon with base stats optimized for balance.`;
}