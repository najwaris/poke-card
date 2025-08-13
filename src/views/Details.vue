<template>
    <main class="container py-4" v-if="merged">
        <!-- Breadcrumb Navigation -->
        <nav aria-label="breadcrumb" class="mb-4">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <RouterLink to="/" class="text-decoration-none">
                        <i class="bi bi-chevron-left me-1"></i> Pokédex
                    </RouterLink>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                    {{ capitalizeFirstLetter(merged.name) }}
                </li>
            </ol>
        </nav>

        <div class="row g-4 animate__animated animate__fadeIn">
            <!-- Pokémon Image Card -->
            <div class="col-12 col-lg-5">
                <div class="card border-0 shadow-sm pokemon-card">
                    <div class="card-body text-center p-4">
                        <img :src="merged.sprites.artwork || merged.sprites.front" :alt="merged.name"
                            class="img-fluid pokemon-image" :class="`type-${merged.types[0]}`" />
                        <!-- Favorite Button -->
                        <button @click="toggleFavorite" class="btn btn-favorite position-absolute top-0 end-0 m-3"
                            :class="merged.favorite ? 'btn-danger' : 'btn-outline-danger'" aria-label="Toggle favorite">
                            <i class="bi" :class="merged.favorite ? 'bi-heart-fill' : 'bi-heart'"></i>
                        </button>
                    </div>
                </div>

                <!-- Additional Sprites -->
                <div class="row g-2 mt-3">
                    <div class="col-6">
                        <div class="card sprite-card">
                            <img :src="merged.sprites.front" :alt="`${merged.name} front`" class="img-fluid">
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="card sprite-card">
                            <img :src="merged.sprites.back" :alt="`${merged.name} back`" class="img-fluid">
                        </div>
                    </div>
                </div>
            </div>

            <!-- Pokémon Details -->
            <div class="col-12 col-lg-7">
                <div class="pokemon-details">
                    <!-- Name and Types -->
                    <div class="d-flex align-items-start justify-content-between mb-3">
                        <div>
                            <h1 class="text-capitalize mb-0 pokemon-name">
                                {{ merged.name }}
                                <span class="text-muted ms-2">#{{ String(merged.id).padStart(3, '0') }}</span>
                            </h1>
                            <div class="d-flex flex-wrap gap-2 mt-2">
                                <span v-for="t in merged.types" :key="t" class="badge rounded-pill type-badge"
                                    :class="`type-${t}`">
                                    {{ t }}
                                </span>
                            </div>
                        </div>
                        <button class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#editModal">
                            <i class="bi bi-pencil"></i> Edit
                        </button>
                    </div>

                    <!-- Summary -->
                    <div class="pokemon-summary mb-4">
                        <p class="mb-0">{{ merged.summary }}</p>
                    </div>

                    <!-- Stats Cards -->
                    <div class="row g-3 mb-4">
                        <div class="col-6 col-md-4">
                            <div class="card stat-card h-100">
                                <div class="card-body text-center">
                                    <div class="stat-value">{{ merged.height / 10 }} m</div>
                                    <div class="stat-label">Height</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-6 col-md-4">
                            <div class="card stat-card h-100">
                                <div class="card-body text-center">
                                    <div class="stat-value">{{ merged.weight / 10 }} kg</div>
                                    <div class="stat-label">Weight</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-4">
                            <div class="card stat-card h-100">
                                <div class="card-body text-center">
                                    <div class="stat-value">{{ merged.abilities.length }}</div>
                                    <div class="stat-label">Abilities</div>
                                    <div class="small text-muted mt-1">{{ merged.abilities.join(', ') }}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Base Stats -->
                    <div class="mb-4">
                        <h5 class="section-title mb-3">
                            <i class="bi bi-graph-up me-2"></i> Base Stats
                        </h5>
                        <div class="stats-container">
                            <div v-for="s in merged.stats" :key="s.name" class="stat-item">
                                <div class="stat-info">
                                    <span class="stat-name">{{ formatStatName(s.name) }}</span>
                                    <span class="stat-value">{{ s.base }}</span>
                                </div>
                                <div class="progress">
                                    <div class="progress-bar" :class="`type-${merged.types[0]}`"
                                        :style="{ width: Math.min(100, Math.round((s.base / 180) * 100)) + '%' }"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Moves -->
                    <div class="mb-4">
                        <h5 class="section-title mb-3">
                            <i class="bi bi-stars me-2"></i> Moves
                        </h5>
                        <div class="d-flex flex-wrap gap-2">
                            <span v-for="m in merged.moves" :key="m" class="badge rounded-pill move-badge">
                                {{ m }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Edit Summary Modal -->
        <div ref="editModal" class="modal fade" id="editModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit {{ merged.name }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form @submit.prevent="saveChanges">
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="summary" class="form-label">Summary</label>
                                <textarea id="summary" v-model="summary" rows="3" class="form-control"
                                    placeholder="Write a short summary…"></textarea>
                            </div>
                            <div class="form-check form-switch">
                                <input id="fav" v-model="favorite" class="form-check-input" type="checkbox" />
                                <label for="fav" class="form-check-label">Favorite</label>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                                Cancel
                            </button>
                            <button type="submit" class="btn btn-primary">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Toast Notifications -->
        <div class="toast-container position-fixed bottom-0 end-0 p-3">
            <div ref="favoriteToast" class="toast align-items-center text-white border-0" :class="favoriteToastClass"
                role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        <i class="bi me-2" :class="favoriteToastIcon"></i>
                        {{ favoriteToastMessage }}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
                        aria-label="Close"></button>
                </div>
            </div>

            <div ref="editToast" class="toast align-items-center text-white bg-success border-0" role="alert"
                aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        <i class="bi bi-check-circle-fill me-2"></i> Changes saved!
                    </div>
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
import { onMounted, ref, computed, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { usePokemonStore } from '../stores/pokemon';
import Loader from '../components/Loader.vue';
import { Modal, Toast } from 'bootstrap';
import 'animate.css';

const route = useRoute();
const store = usePokemonStore();
const name = computed(() => route.params.name);

const merged = computed(() => store.getMergedByName(name.value));
const summary = ref('');
const favorite = ref(false);
const favoriteToastMessage = ref('');
const favoriteToastClass = ref('bg-success');
const favoriteToastIcon = ref('bi-heart-fill');

// Toast element references
const favoriteToast = ref(null);
const editToast = ref(null);
let favoriteToastInstance = null;
let editToastInstance = null;

// Initialize toasts after component is mounted
onMounted(async () => {
    if (!store.list.length) await store.loadList();
    const item = store.list.find((x) => x.name === name.value);
    if (item) {
        await store.loadDetails(item.name, item.url);
    } else {
        await store.loadDetails(name.value, `https://pokeapi.co/api/v2/pokemon/${name.value}`);
    }

    summary.value = merged.value?.summary || '';
    favorite.value = !!merged.value?.favorite;

    // Initialize toasts after the DOM is fully rendered
    await nextTick();
    initializeToasts();

    if (editModal.value) {
        modalInstance = new Modal(editModal.value);
        editModal.value.addEventListener('hide.bs.modal', () => {
            // Reset form values when modal is closed without saving
            summary.value = merged.value?.summary || '';
            favorite.value = !!merged.value?.favorite;
        });
    }
});

function initializeToasts() {
    if (favoriteToast.value) {
        favoriteToastInstance = new Toast(favoriteToast.value, {
            autohide: true,
            delay: 3000
        });
    }
    if (editToast.value) {
        editToastInstance = new Toast(editToast.value, {
            autohide: true,
            delay: 3000
        });
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatStatName(stat) {
    const names = {
        'hp': 'HP',
        'attack': 'Attack',
        'defense': 'Defense',
        'special-attack': 'Sp. Atk',
        'special-defense': 'Sp. Def',
        'speed': 'Speed'
    };
    return names[stat] || stat;
}

function toggleFavorite() {
    favorite.value = !favorite.value;
    saveFavorite();
}

function saveFavorite() {
    store.setEdit(name.value, {
        summary: summary.value,
        favorite: favorite.value
    });

    // Set toast message based on favorite status
    if (favorite.value) {
        favoriteToastMessage.value = 'Added to favorites!';
        favoriteToastClass.value = 'bg-danger';
        favoriteToastIcon.value = 'bi-heart-fill';
    } else {
        favoriteToastMessage.value = 'Removed from favorites';
        favoriteToastClass.value = 'bg-secondary';
        favoriteToastIcon.value = 'bi-heart';
    }

    // Show toast after ensuring it's initialized
    nextTick(() => {
        if (favoriteToastInstance) {
            favoriteToastInstance.show();
        }
    });
}

function saveChanges() {
    store.setEdit(name.value, {
        summary: summary.value,
        favorite: favorite.value
    });

    // Show edit toast after ensuring it's initialized
    nextTick(() => {
        if (editToastInstance) {
            editToastInstance.show();
        }
    });
}
</script>

<style scoped>
/* Main Layout */
.pokemon-card {
    border-radius: 1rem;
    overflow: hidden;
    transition: transform 0.3s ease;
}

.pokemon-card:hover {
    transform: translateY(-5px);
}

.pokemon-image {
    max-height: 300px;
    object-fit: contain;
    transition: transform 0.3s ease;
}

.pokemon-image:hover {
    transform: scale(1.05);
}

/* Type Badges */
.type-badge {
    padding: 0.5em 1em;
    font-size: 0.9rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: white;
}

/* Type Colors */
.type-normal {
    background-color: #A8A878;
}

.type-fire {
    background-color: #F08030;
}

.type-water {
    background-color: #6890F0;
}

.type-electric {
    background-color: #F8D030;
}

.type-grass {
    background-color: #78C850;
}

.type-ice {
    background-color: #98D8D8;
}

.type-fighting {
    background-color: #C03028;
}

.type-poison {
    background-color: #A040A0;
}

.type-ground {
    background-color: #E0C068;
}

.type-flying {
    background-color: #A890F0;
}

.type-psychic {
    background-color: #F85888;
}

.type-bug {
    background-color: #A8B820;
}

.type-rock {
    background-color: #B8A038;
}

.type-ghost {
    background-color: #705898;
}

.type-dragon {
    background-color: #7038F8;
}

.type-dark {
    background-color: #705848;
}

.type-steel {
    background-color: #B8B8D0;
}

.type-fairy {
    background-color: #EE99AC;
}

/* Stats */
.stat-card {
    border-radius: 0.75rem;
    border: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.stat-value {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--bs-primary);
}

.stat-label {
    font-size: 0.85rem;
    color: var(--bs-secondary);
}

.stats-container {
    background-color: var(--bs-light-bg-subtle);
    border-radius: 0.75rem;
    padding: 1.25rem;
}

.stat-item {
    margin-bottom: 1rem;
}

.stat-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.25rem;
}

.stat-name {
    font-weight: 500;
    text-transform: capitalize;
}

.progress {
    height: 8px;
    border-radius: 4px;
    background-color: var(--bs-light-bg-subtle);
}

.progress-bar {
    border-radius: 4px;
}

/* Moves */
.move-badge {
    background-color: var(--bs-light-bg-subtle);
    color: var(--bs-body-color);
    padding: 0.5em 1em;
    font-size: 0.85rem;
}

/* Favorite Button */
.btn-favorite {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
}

/* Section Titles */
.section-title {
    color: var(--bs-primary);
    font-weight: 600;
    border-bottom: 2px solid var(--bs-primary);
    padding-bottom: 0.25rem;
    display: inline-block;
}

/* Sprite Cards */
.sprite-card {
    border-radius: 0.75rem;
    padding: 0.75rem;
    text-align: center;
    background-color: var(--bs-light-bg-subtle);
}

/* Responsive Adjustments */
@media (max-width: 992px) {
    .pokemon-image {
        max-height: 250px;
    }
}

@media (max-width: 768px) {
    .pokemon-name {
        font-size: 1.75rem;
    }
}

.btn-outline-primary {
    border-radius: 50px;
    padding: 0.5rem 1rem;
    transition: all 0.3s ease;
}

.btn-outline-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>