<template>
    <div class="row g-2 align-items-center">
        <div class="col-12">
            <select v-model="selectedType" class="form-select form-select-lg" aria-label="Filter by type">
                <option value="">All Types</option>
                <option v-for="type in availableTypes" :key="type" :value="type">
                    {{ capitalizeFirstLetter(type) }}
                </option>
            </select>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { usePokemonStore } from '../stores/pokemon';

const props = defineProps({ modelValue: { type: String, default: '' } });
const emit = defineEmits(['update:modelValue']);

const store = usePokemonStore();
const selectedType = ref('');

watch(selectedType, (newValue) => {
    emit('update:modelValue', newValue);
});

// Extract all unique types from Pokémon in the store
const availableTypes = computed(() => {
    const types = new Set();
    for (const pokemon of store.list) {
        const details = store.detailsMap[pokemon.name];
        if (details?.types) {
            details.types.forEach(type => types.add(type));
        }
    }
    return Array.from(types).sort();
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
</script>