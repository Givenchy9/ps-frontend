<script setup lang="ts">
let token = localStorage.getItem('token');
</script>

<template>
  <RouterView />
  <footer>
    <nav :class="token ? null : 'hidden'"  class="h-12 grid grid-cols-4 fixed left-0 bottom-0 w-full backdrop-blur-xl text-white text-center">
      <RouterLink to="/" active-class="text-gray-900 border-b-2 border-black"
        class="group text-gray-400 font-bold py-2 px-4 hover:text-black duration-200">
        <i class="fa-solid fa-play fa-xl"></i>
      </RouterLink>
      <RouterLink to="/favorites" active-class="text-gray-900 border-b-2 border-black"
        class="text-gray-400 font-bold py-2 px-4 hover:text-black duration-200">
        <i class="fa-solid fa-star fa-xl"></i>
      </RouterLink>
      <RouterLink to="/search" active-class="text-gray-900 border-b-2 border-black"
        class="text-gray-400 font-bold py-2 px-4 hover:text-black duration-200">
        <i class="fa-solid fa-magnifying-glass fa-xl"></i>
      </RouterLink>
      <RouterLink to="/settings" active-class="text-gray-900 border-b-2 border-black"
        class="text-gray-400 font-bold py-2 px-4 hover:text-black duration-200">
        <i class="fa-solid fa-gear fa-xl"></i>
      </RouterLink>
    </nav>
  </footer>
</template>

<style>
/* .fontA1:hover {
  display: none;
}

.fontA1:hover+.fontA2 {
  display: block;
} */
</style>
