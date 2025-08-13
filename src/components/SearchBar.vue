<template>
    <div class="row g-2 align-items-center">
        <div class="col-12 col-md-8">
            <input v-model="model" type="search" class="form-control form-control-lg"
                placeholder="Search Pokémon by name…" aria-label="Search by name" />
        </div>
        <div class="col-6 col-md-2">
            <button class="btn btn-outline-secondary w-100" @click="clear" :disabled="!model">Clear</button>
        </div>
        <div class="col-6 col-md-2">
            <a class="btn btn-danger w-100" href="https://pokeapi.co/" target="_blank" rel="noreferrer">Docs</a>
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue';

const props = defineProps({ modelValue: { type: String, default: '' } });
const emit = defineEmits(['update:modelValue']);

const model = computed({
    get: () => props.modelValue,
    set: (v) => emit('update:modelValue', v),
});

function clear() { emit('update:modelValue', ''); }
</script>