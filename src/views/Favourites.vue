<template>
    <div>
        <Navbar />

        <main class="container py-5">
            <!-- Hero Section -->
            <div class="text-center mb-5 animate__animated animate__fadeIn">
                <h1 class="display-4 fw-bold mb-3 text-primary text-shadow">
                    Favorite <span class="text-warning">Pokémon</span>
                </h1>
                <p class="lead text-muted mb-4">
                    Your personal collection of cherished Pokémon
                    <i class="bi bi-stars ms-2 text-warning"></i>
                </p>
            </div>

            <!-- Loading State -->
            <Loader v-if="store.isLoadingList" label="Loading your favorites..." :tall="true" />

            <!-- Favorites Grid -->
            <div v-else>
                <!-- Favorites Count Badge -->
                <div v-if="favorites.length > 0"
                    class="d-flex justify-content-center mb-4 animate__animated animate__fadeIn">
                    <div class="badge bg-light text-dark p-3 shadow-sm">
                        <span class="me-2">
                            <span class="text-muted">Total Favorites:</span>
                            <span class="ms-2 fw-semibold">{{ favorites.length }}</span>
                        </span>
                        <button @click="confirmClearAll" class="btn btn-sm btn-link text-danger ms-3">
                            <i class="bi bi-trash me-1"></i> Clear All
                        </button>
                    </div>
                </div>

                <!-- Pokémon Grid -->
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    <div v-for="name in favorites" :key="name" class="col animate__animated animate__fadeInUp"
                        :style="{ 'animation-delay': `${(favorites.indexOf(name) % 10) * 0.05}s` }">
                        <PokemonCard :name="name" />
                    </div>
                </div>

                <!-- Empty State -->
                <div v-if="favorites.length === 0" class="text-center py-5 animate__animated animate__fadeIn">
                    <img src="../assets/pikachu-sad.png" alt="No favorites" width="120" class="mb-3 opacity-75">
                    <h4 class="text-muted mb-2">Your favorites list is empty</h4>
                    <p class="text-muted mb-3">Start by adding some Pokémon to your favorites!</p>
                    <RouterLink to="/" class="btn btn-outline-primary">
                        <i class="bi bi-arrow-left me-1"></i> Browse Pokémon
                    </RouterLink>
                </div>
            </div>

            <!-- Back to Top Button -->
            <button v-show="showBackToTop" @click="scrollToTop" class="btn btn-primary btn-back-to-top shadow">
                <i class="bi bi-arrow-up"></i>
            </button>

            <!-- Confirmation Modal -->
            <div class="modal fade" id="clearAllModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">
                                <i class="bi bi-exclamation-triangle-fill text-danger me-2"></i>
                                Confirm Clear All
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Are you sure you want to remove all Pokémon from your favorites?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                                Cancel
                            </button>
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
                                @click="clearAllFavorites">
                                <i class="bi bi-trash me-1"></i> Clear All
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <Footer />
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { usePokemonStore } from '../stores/pokemon';
import PokemonCard from '../components/PokemonCard.vue';
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import Loader from '../components/Loader.vue';
import 'animate.css';
import { useScroll } from '@vueuse/core';
import { Modal } from 'bootstrap';

const store = usePokemonStore();
const { y: scrollY } = useScroll(window);

// Scroll to top button visibility
const showBackToTop = computed(() => scrollY.value > 300);

// Get favorite Pokémon names
const favorites = computed(() => {
    return Object.entries(store.edited)
        .filter(([_, data]) => data.favorite)
        .map(([name]) => name);
});

// Methods
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

let clearAllModal = null;

onMounted(() => {
    // Initialize modal
    clearAllModal = new Modal(document.getElementById('clearAllModal'));

    // Prefetch details for favorites
    favorites.value.forEach(name => {
        const pokemon = store.list.find(p => p.name === name);
        if (pokemon) {
            store.loadDetails(pokemon.name, pokemon.url).catch(() => { });
        }
    });
});

function confirmClearAll() {
    clearAllModal.show();
}

function clearAllFavorites() {
    favorites.value.forEach(name => {
        store.setFavorite(name, false);
    });
}
</script>

<style scoped>
/* Reuse styles from Home.vue */
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

/* Custom heart icon animation */
.bi-heart-fill {
    animation: pulse 1.5s infinite;
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.2);
    }

    100% {
        transform: scale(1);
    }
}

/* Animation delays for staggered card appearance */
.animate__fadeInUp {
    --animate-duration: 0.5s;
}

/* Custom styles for favorites counter */
.bg-light {
    background-color: #f8f9fa !important;
}
</style>