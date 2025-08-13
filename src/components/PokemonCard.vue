<!-- <template>
    <RouterLink :to="{ name: 'details', params: { name } }" class="text-decoration-none text-reset">
        <div class="card h-100 card-hover">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start">
                    <h5 class="card-title text-capitalize mb-1">{{ name }}</h5>
                    <span v-if="favorite" class="badge text-bg-danger">★ Favorite</span>
                </div>
                <div class="text-center my-3">
                    <img v-if="img" :src="img" :alt="name" class="img-fluid"
                        style="max-height: 128px; object-fit: contain" />
                    <div v-else class="d-flex justify-content-center py-5">
                        <div class="spinner-border text-danger"></div>
                    </div>
                </div>
                <p class="card-text text-muted truncate-2" v-if="summary">{{ summary }}</p>
                <div class="d-flex flex-wrap gap-1">
                    <span v-for="t in types" :key="t" class="badge rounded-pill text-bg-light badge-type">{{ t }}</span>
                </div>
            </div>
        </div>
    </RouterLink>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { usePokemonStore } from '../stores/pokemon';

const props = defineProps({ name: { type: String, required: true }, url: { type: String, required: true } });
const store = usePokemonStore();

onMounted(() => { store.loadDetails(props.name, props.url).catch(() => { }); });

const merged = computed(() => store.getMergedByName(props.name));
const img = computed(() => merged.value?.sprites?.artwork || merged.value?.sprites?.front);
const summary = computed(() => merged.value?.summary);
const types = computed(() => merged.value?.types || []);
const favorite = computed(() => merged.value?.favorite);
</script> -->


<template>
    <div class="card h-100 card-hover position-relative">
        <!-- Favorite Button (absolute positioned) -->
        <button 
            @click.stop="toggleFavorite"
            class="btn btn-sm position-absolute top-0 end-0 m-2 p-2 z-1"
            :class="isFavorite ? 'btn-danger' : 'btn-outline-danger'"
            aria-label="Toggle favorite"
        >
            <i class="bi" :class="isFavorite ? 'bi-heart-fill' : 'bi-heart'"></i>
        </button>
        
        <!-- Card Content (wrapped in RouterLink) -->
        <RouterLink :to="{ name: 'details', params: { name } }" class="text-decoration-none text-reset h-100 d-block">
            <div class="card-body">
                <h5 class="card-title text-capitalize mb-1">{{ name }}</h5>
                <div class="text-center my-3">
                    <img v-if="img" :src="img" :alt="name" class="img-fluid"
                        style="max-height: 128px; object-fit: contain" />
                    <div v-else class="d-flex justify-content-center py-5">
                        <div class="spinner-border text-danger"></div>
                    </div>
                </div>
                <p class="card-text text-muted truncate-2" v-if="summary">{{ summary }}</p>
                <div class="d-flex flex-wrap gap-1">
                    <span v-for="t in types" :key="t" class="badge rounded-pill text-bg-light badge-type">{{ t }}</span>
                </div>
            </div>
        </RouterLink>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { usePokemonStore } from '../stores/pokemon';

const props = defineProps({ 
    name: { type: String, required: true }, 
    url: { type: String, required: true } 
});

const store = usePokemonStore();
const merged = computed(() => store.getMergedByName(props.name));
const img = computed(() => merged.value?.sprites?.artwork || merged.value?.sprites?.front);
const summary = computed(() => merged.value?.summary);
const types = computed(() => merged.value?.types || []);
const isFavorite = computed(() => merged.value?.favorite || false);

function toggleFavorite() {
    store.toggleFavorite(props.name);
}
</script>

<style scoped>
.z-1 {
    z-index: 1;
}

.badge-type {
    font-size: 0.75em;
    text-transform: capitalize;
}

.truncate-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}

.card-hover {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card-hover:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.btn-outline-danger {
    background-color: rgba(255, 255, 255, 0.8);
}
</style>