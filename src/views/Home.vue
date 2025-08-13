<template>
    <main class="container py-4">
        <h1 class="display-5 fw-bold mb-3">PokéDex</h1>
        <p class="text-muted mb-4">Explore the first 100 Pokémon. Search by name and tap a card for full details.</p>

        <SearchBar v-model="query" class="mb-4" />

        <div v-if="error" class="alert alert-danger d-flex justify-content-between align-items-center" role="alert">
            <div><strong>Oops:</strong> {{ error }}</div>
            <button class="btn btn-sm btn-outline-danger" @click="retry">Retry</button>
        </div>

        <Loader v-if="isLoadingList" label="Fetching Pokémon list…" :tall="true" />

        <div v-else>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
                <div v-for="p in filtered" :key="p.name" class="col">
                    <PokemonCard :name="p.name" :url="p.url" />
                </div>
            </div>
            <p v-if="!filtered.length" class="text-center text-muted py-5">No Pokémon found for “{{ query }}”.</p>
        </div>
    </main>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { usePokemonStore } from '../stores/pokemon';
import Loader from '../components/Loader.vue';
import SearchBar from '../components/SearchBar.vue';
import PokemonCard from '../components/PokemonCard.vue';

const store = usePokemonStore();
const query = ref('');

onMounted(async () => {
    await store.loadList();
    // Start prefetch in background (no await)
    store.prefetchDetails(10);
});

const isLoadingList = computed(() => store.isLoadingList);
const error = computed(() => store.error);
const filtered = computed(() => {
    const q = query.value.trim().toLowerCase();
    if (!q) return store.list;
    return store.list.filter((p) => p.name.toLowerCase().includes(q));
});

function retry() { store.loadList(); }
</script>