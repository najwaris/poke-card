<template>
    <main class="container py-4" v-if="merged">
        <div class="row g-4">
            <div class="col-12 col-lg-5">
                <div class="card">
                    <div class="card-body text-center">
                        <img :src="merged.sprites.artwork || merged.sprites.front" :alt="merged.name" class="img-fluid"
                            style="max-height: 320px; object-fit: contain" />
                    </div>
                </div>
            </div>

            <div class="col-12 col-lg-7">
                <div class="d-flex align-items-start justify-content-between mb-2">
                    <h2 class="text-capitalize mb-0">{{ merged.name }}</h2>
                    <span v-if="merged.favorite" class="badge text-bg-danger align-self-center">★ Favorite</span>
                </div>
                <p class="text-muted">{{ merged.summary }}</p>
                <div class="mb-3 d-flex flex-wrap gap-2">
                    <span v-for="t in merged.types" :key="t" class="badge rounded-pill text-bg-dark badge-type">{{ t
                        }}</span>
                </div>

                <div class="row g-3 mb-3">
                    <div class="col-6 col-md-4">
                        <div class="card text-center">
                            <div class="card-body">
                                <div class="fw-bold">Height</div>
                                <div>{{ merged.height }} dm</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 col-md-4">
                        <div class="card text-center">
                            <div class="card-body">
                                <div class="fw-bold">Weight</div>
                                <div>{{ merged.weight }} hg</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-4">
                        <div class="card text-center">
                            <div class="card-body">
                                <div class="fw-bold">Abilities</div>
                                <div class="small text-muted">{{ merged.abilities.join(', ') }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mb-4">
                    <h5 class="mb-3">Base Stats</h5>
                    <div v-for="s in merged.stats" :key="s.name" class="mb-2">
                        <div class="d-flex justify-content-between small"><span class="text-uppercase">{{ s.name
                                }}</span><span>{{ s.base }}</span></div>
                        <div class="stat-bar">
                            <div :style="{ width: Math.min(100, Math.round((s.base / 180) * 100)) + '%' }"></div>
                        </div>
                    </div>
                </div>

                <div class="mb-4">
                    <h5 class="mb-3">Moves</h5>
                    <div class="d-flex flex-wrap gap-2">
                        <span v-for="m in merged.moves" :key="m" class="badge rounded-pill text-bg-light">{{ m }}</span>
                    </div>
                </div>

                <div class="d-flex gap-2">
                    <RouterLink class="btn btn-outline-secondary" to="/">← Back</RouterLink>
                    <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#editModal">Edit</button>
                </div>
            </div>
        </div>

        <!-- Edit Modal -->
        <div class="modal fade" id="editModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit {{ merged.name }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form @submit.prevent="save">
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="summary" class="form-label">Summary</label>
                                <textarea id="summary" v-model="summary" rows="3" class="form-control"
                                    placeholder="Write a short summary…"></textarea>
                            </div>
                            <div class="form-check">
                                <input id="fav" v-model="favorite" class="form-check-input" type="checkbox" />
                                <label for="fav" class="form-check-label">Mark as favorite</label>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-secondary"
                                data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" class="btn btn-danger">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Toast -->
        <div class="toast-container position-fixed bottom-0 end-0 p-3">
            <div ref="toastEl" class="toast align-items-center text-bg-success border-0" role="alert"
                aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">Saved!</div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
                        aria-label="Close"></button>
                </div>
            </div>
        </div>
    </main>

    <main v-else class="container py-5">
        <Loader label="Loading Pokémon…" :tall="true" />
    </main>
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { usePokemonStore } from '../stores/pokemon';
import Loader from '../components/Loader.vue';

let toastInstance; // why: avoid re-instantiating bootstrap Toast

const route = useRoute();
const store = usePokemonStore();
const name = computed(() => route.params.name);

const merged = computed(() => store.getMergedByName(name.value));
const summary = ref('');
const favorite = ref(false);

onMounted(async () => {
    // Ensure list exists (for URL); not strictly necessary but helpful
    if (!store.list.length) await store.loadList();
    // Ensure details loaded for direct link navigation
    const item = store.list.find((x) => x.name === name.value);
    if (item) await store.loadDetails(item.name, item.url);
    else {
        // fallback: fetch by constructed URL
        await store.loadDetails(name.value, `https://pokeapi.co/api/v2/pokemon/${name.value}`);
    }
    // hydrate form
    summary.value = merged.value?.summary || '';
    favorite.value = !!merged.value?.favorite;

    // Bootstrap toast lazy init
    import('bootstrap/js/dist/toast').then(({ default: Toast }) => {
        const el = toastEl.value;
        if (el) toastInstance = Toast.getOrCreateInstance(el);
    });
});

const toastEl = ref(null);

watch(merged, (m) => {
    if (!m) return;
    summary.value = m.summary || '';
    favorite.value = !!m.favorite;
});

function save() {
    store.setEdit(name.value, { summary: summary.value, favorite: favorite.value });
    if (toastInstance) toastInstance.show();
}
</script>