<script lang="ts">
export default {
  name: 'HomeView'
}
</script>

<template>
  <header
    class="flex p-8 bg-white/10 w-1/2 m-auto gap-4 text-center justify-center background-black backdrop-blur-sm rounded-full mb-2 my-2"
  >
    <RouterLink
      class="isolate w-1/3 py-2 px-4 rounded-full bg-white/10 shadow-xl font-bold ring-2 ring-gray-200 hover:bg-black/20 duration-700"
      to="/films"
      active-class="bg-gray-600 text-white"
    >
      Movies
    </RouterLink>
    <RouterLink
      class="isolate w-1/3 py-2 px-4 rounded-full bg-white/10 shadow-xl font-bold ring-2 ring-gray-200 hover:bg-black/20 duration-700"
      to="/series"
      active-class="bg-gray-600 text-white"
    >
      Series
    </RouterLink>
    <RouterLink
      class="isolate w-1/3 py-2 px-4 rounded-full bg-white/10 shadow-xl font-bold ring-2 ring-gray-200 hover:bg-black/20 duration-700"
      to="/latest"
      active-class="bg-gray-600 text-white"
    >
      Latest
    </RouterLink>
  </header>
  <main class="px-16">
    <router-view> </router-view>
  </main>
</template>
<style></style>
