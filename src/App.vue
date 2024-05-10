<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-weather-primary">
    <sitio_navegacion />
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import sitio_navegacion from './components/sitio_navegacion.vue';

</script>

<style lang="scss" scoped>

</style>