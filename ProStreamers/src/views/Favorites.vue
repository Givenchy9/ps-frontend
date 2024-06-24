<template>
  <div class="search backdrop-blur-xl border-2 border-gray-300 rounded-full w-1/2 m-auto">
    <p class="text-center font-bold text-xl">Favorites</p>
  </div>
  <div class="favorites-container flex flex-col justify-between">
    <Footer />
  </div>
</template>

<script setup>
import Footer from '@/components/Footer.vue'
</script>

<style scoped>
.favorites-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* Full height of the viewport */
}

.favorites-content {
  flex-grow: 1;
  /* Allow the content to grow and take up available space */
}
</style>
