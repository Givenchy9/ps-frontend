<script lang="ts">
import { CoMovie } from 'oh-vue-icons/icons'
export default {
  name: 'HomeView'
}
</script>

<template>
  <header
    class="flex p-8 w-1/2 m-auto gap-4 text-center justify-center background-black backdrop-blur-sm rounded-sm mb-2 my-2 fixed top-0 left-1/2 transform -translate-x-1/2"
  >
    <RouterLink
      class="isolate w-1/3 py-2 px-4 rounded-full bg-white/10 shadow-xl font-bold ring-2 ring-gray-200 hover:bg-black/20 duration-700"
      to="/films"
      active-class="bg-black/20 underline"
    >
      Films
    </RouterLink>
    <RouterLink
      class="isolate w-1/3 py-2 px-4 rounded-full bg-white/10 shadow-xl font-bold ring-2 ring-gray-200 hover:bg-black/20 duration-700"
      to="/series"
      active-class="bg-black/20 underline"
    >
      Series
    </RouterLink>
    <RouterLink
      class="isolate w-1/3 py-2 px-4 rounded-full bg-white/10 shadow-xl font-bold ring-2 ring-gray-200 hover:bg-black/20 duration-700"
      to="/latest"
      active-class="bg-black/20 underline"
    >
      Latest
    </RouterLink>
  </header>

  <main class="px-4 mt-32 mb-20">
    <router-view> </router-view>
  </main>
</template>
<style></style>
