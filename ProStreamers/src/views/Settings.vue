<template>
  <div class="grid grid-cols-4">
    <div class="col-span-1 h-96 p-2">
      <div class="rounded-xl h-full">
        <div class="grid grid-col-2 gap-2">
          <h1 class="text-gray-700 text-2xl py-2 dark:text-white">Settings</h1>
          <RouterLink
            to="/user"
            active-class="bg-black/40"
            class="py-2 px-4 rounded-full bg-gray-200 font-bold text-center hover:bg-white/40 duration-200 hover:text-white"
          >
            Account</RouterLink
          >
          <RouterLink
            to="/endpoint"
            active-class="bg-black/40"
            class="py-2 px-4 rounded-full bg-gray-200 font-bold text-center hover:bg-white/40 duration-200 hover:text-white"
          >
            Info</RouterLink
          >

          <RouterLink
            to="/dashboard"
            active-class="bg-black/40"
            class="py-2 px-4 rounded-full bg-gray-200 font-bold text-center hover:bg-white/40 duration-200 hover:text-white"
          >
            Dashboard</RouterLink
          >
        </div>
      </div>
    </div>
    <div class="col-span-3 p-2">
      <router-view></router-view>
    </div>
  </div>
  <div>
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
}

.favorites-content {
  flex-grow: 1;
}
</style>
