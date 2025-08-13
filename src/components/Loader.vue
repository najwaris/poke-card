<template>
    <div class="d-flex align-items-center justify-content-center py-5" :class="{ 'min-vh-50': tall }">
        <div class="spinner-border text-danger me-3" role="status" aria-hidden="true"></div>
        <strong>{{ label }}</strong>
    </div>
</template>
<script setup>
const props = defineProps({ label: { type: String, default: 'Loading…' }, tall: { type: Boolean, default: false } });
</script>