<template>
  <header
    class="flex p-8 w-1/2 m-auto gap-4 text-center justify-center background-black backdrop-blur-sm rounded-sm fixed top-0 left-1/2 transform -translate-x-1/2"
  >
    <RouterLink
      class="isolate w-1/3 py-2 px-4 rounded-full bg-white/10 shadow-xl font-bold ring-2 ring-gray-200 hover:bg-black/20 duration-700"
      to="/films"
      active-class="bg-black/50 underline text-white"
      >Films</RouterLink
    >
    <RouterLink
      class="isolate w-1/3 py-2 px-4 rounded-full bg-white/10 shadow-xl font-bold ring-2 ring-gray-200 hover:bg-black/20 duration-700"
      to="/series"
      active-class="bg-black/50 underline text-white"
      >Series</RouterLink
    >
    <RouterLink
      class="isolate w-1/3 py-2 px-4 rounded-full bg-white/10 shadow-xl font-bold ring-2 ring-gray-200 hover:bg-black/20 duration-700"
      to="/latest"
      active-class="bg-black/50 underline text-white"
      >Latest</RouterLink
    >
    <div class="flex items-center text-nowrap m-2">
      <p class="mr-2">Welcome,</p>

      <h1 class="mr-2 font-bold">{{ username }}</h1>
    </div>
  </header>

  <main class="px-4 mt-32 mb-20">
    <router-view> </router-view>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeView',
  data() {
    return {
      username: ''
    }
  },
  mounted() {
    let user = localStorage.getItem('user')
    console.log(user) // Log to verify the retrieved data

    if (user) {
      user = JSON.parse(user) // Parse the stored JSON string into an object
      this.username = user.name // Set the username from the parsed object
    }
  }
})
</script>
<style></style>
