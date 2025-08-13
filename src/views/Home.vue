<template>
    <div>
        <Navbar />

        <main class="container py-5">
            <!-- Hero Section -->
            <div class="text-center mb-5 animate__animated animate__fadeIn">
                <h1 class="display-4 fw-bold mb-3 text-primary text-shadow pokedex-title">
                    Poké<span class="text-warning">Dex</span>
                </h1>
                <p class="lead text-muted mb-4">
                    Discover and explore the original Pokémon universe
                    <i class="bi bi-stars ms-2 text-warning"></i>
                </p>

                <!-- Search and Filter Row -->
                <div class="d-flex justify-content-center mb-4 animate__animated animate__fadeIn">
                    <div class="bg-light rounded-3 p-3 shadow-sm w-100" style="max-width: 800px;">
                        <div class="row g-2 align-items-center">
                            <div class="col-md-4">
                                <Filter v-model="selectedType" class="w-100" @filter-change="handleFilterChange" />
                            </div>
                            <div class="col-md-8">
                                <SearchBar v-model="query" class="w-100" @search="handleSearch" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Error State -->
            <div v-if="error"
                class="alert alert-danger d-flex justify-content-between align-items-center animate__animated animate__shakeX"
                role="alert">
                <div>
                    <i class="bi bi-exclamation-triangle-fill me-2"></i>
                    <strong>Oops:</strong> {{ error }}
                </div>
                <button class="btn btn-sm btn-outline-danger" @click="retry">
                    <i class="bi bi-arrow-clockwise me-1"></i> Retry
                </button>
            </div>

            <!-- Loading State -->
            <Loader v-if="isLoadingList" label="Fetching Pokémon list..." :tall="true" />

            <!-- Results Grid -->
            <div v-else>
                <!-- Active Filters Indicator -->
                <div v-if="selectedType || query"
                    class="d-flex justify-content-center mb-4 animate__animated animate__fadeIn">
                    <div class="badge bg-light text-dark p-3 shadow-sm">
                        <span v-if="selectedType" class="me-2">
                            <span class="text-muted">Type:</span>
                            <span class="type-badge ms-2" :class="selectedType.toLowerCase()">
                                {{ capitalizeFirstLetter(selectedType) }}
                            </span>
                        </span>
                        <span v-if="query">
                            <span class="text-muted">Search:</span>
                            <span class="ms-2 fw-semibold">"{{ query }}"</span>
                        </span>
                        <button v-if="selectedType || query" @click="clearFilters"
                            class="btn btn-sm btn-link text-danger ms-3">
                            <i class="bi bi-x-lg"></i> Clear
                        </button>
                    </div>
                </div>

                <!-- Pokémon Grid -->
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    <div v-for="p in filtered" :key="p.name" class="col animate__animated animate__fadeInUp"
                        :style="{ 'animation-delay': `${(store.list.indexOf(p) % 10) * 0.05}s` }">
                        <PokemonCard :name="p.name" :url="p.url" />
                    </div>
                </div>

                <!-- Empty State -->
                <div v-if="!filtered.length" class="text-center py-5 animate__animated animate__fadeIn">
                    <img src="../assets/pikachu-sad.png" alt="No results" width="120" class="mb-3 opacity-75">
                    <h4 class="text-muted mb-2">No Pokémon found</h4>
                    <p class="text-muted mb-3">Try adjusting your search or filter</p>
                    <button @click="clearFilters" class="btn btn-outline-primary">
                        <i class="bi bi-arrow-counterclockwise me-1"></i> Reset Filters
                    </button>
                </div>
            </div>

            <!-- Back to Top Button -->
            <button v-show="showBackToTop" @click="scrollToTop" class="btn btn-primary btn-back-to-top shadow">
                <i class="bi bi-arrow-up"></i>
            </button>
        </main>

        <Footer />
    </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue';
import { usePokemonStore } from '../stores/pokemon';
import Loader from '../components/Loader.vue';
import SearchBar from '../components/SearchBar.vue';
import Filter from '../components/Filter.vue';
import PokemonCard from '../components/PokemonCard.vue';
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import 'animate.css';
import { useScroll } from '@vueuse/core';

const store = usePokemonStore();
const query = ref('');
const selectedType = ref('');
const { y: scrollY } = useScroll(window);

// Scroll to top button visibility
const showBackToTop = computed(() => scrollY.value > 300);

onMounted(async () => {
    await store.loadList();
    // Start prefetch in background (no await)
    store.prefetchDetails(10);
});

// Computed properties
const isLoadingList = computed(() => store.isLoadingList);
const error = computed(() => store.error);

// Filtered Pokémon list
const filtered = computed(() => {
    const q = query.value.trim().toLowerCase();
    const typeFilter = selectedType.value;

    return store.list.filter((p) => {
        // Apply name filter
        const nameMatch = !q || p.name.toLowerCase().includes(q);

        // Apply type filter if selected
        let typeMatch = true;
        if (typeFilter) {
            const details = store.detailsMap[p.name];
            typeMatch = details?.types?.includes(typeFilter) || false;
        }

        return nameMatch && typeMatch;
    });
});

// Methods
function retry() {
    store.loadList();
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function clearFilters() {
    query.value = '';
    selectedType.value = '';
}

function handleSearch(searchTerm) {
    query.value = searchTerm;
}

function handleFilterChange(filterType) {
    selectedType.value = filterType;
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
</script>

<style scoped>
/* Custom styles for Home.vue */
.btn-back-to-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    opacity: 0.9;
    transition: all 0.3s ease;
}

.btn-back-to-top:hover {
    opacity: 1;
    transform: translateY(-3px);
}

.type-badge {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 0.35em 0.75em;
    border-radius: 1rem;
    color: white;
}

/* Type colors - matches the SCSS variables */
.type-badge.normal {
    background-color: #a8a878;
}

.type-badge.fire {
    background-color: #f08030;
}

.type-badge.water {
    background-color: #6890f0;
}

.type-badge.electric {
    background-color: #f8d030;
}

.type-badge.grass {
    background-color: #78c850;
}

.type-badge.ice {
    background-color: #98d8d8;
}

.type-badge.fighting {
    background-color: #c03028;
}

.type-badge.poison {
    background-color: #a040a0;
}

.type-badge.ground {
    background-color: #e0c068;
}

.type-badge.flying {
    background-color: #a890f0;
}

.type-badge.psychic {
    background-color: #f85888;
}

.type-badge.bug {
    background-color: #a8b820;
}

.type-badge.rock {
    background-color: #b8a038;
}

.type-badge.ghost {
    background-color: #705898;
}

.type-badge.dragon {
    background-color: #7038f8;
}

.type-badge.dark {
    background-color: #705848;
}

.type-badge.steel {
    background-color: #b8b8d0;
}

.type-badge.fairy {
    background-color: #ee99ac;
}

/* Animation delays for staggered card appearance */
.animate__fadeInUp {
    --animate-duration: 0.5s;
}

.pokedex-title {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.pokedex-title:hover {
  animation: jump 0.6s ease;
}

@keyframes jump {
  0%   { transform: translateY(0); }
  30%  { transform: translateY(-10px); }
  50%  { transform: translateY(0); }
  70%  { transform: translateY(-5px); }
  100% { transform: translateY(0); }
}

.pokedex-title:hover .pokeball-icon {
  transform: rotate(20deg);
}

</style>