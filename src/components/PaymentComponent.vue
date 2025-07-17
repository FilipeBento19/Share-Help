<script setup>
import { defineProps } from 'vue';

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  cause: {
    type: Object,
    required: true,
    default: () => ({})
  }
});

</script>

<template>
  <div>
    <img src="/icons/qrcode.png" alt="bah">
    <h2>PIX</h2>
    <p>Doação instantânea via PIX. Rápido, seguro e sem taxas.</p>
    <button class="">Doar via PIX</button>
  </div>
</template>

<style scoped>

</style>