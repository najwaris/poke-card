<template>
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
</script>