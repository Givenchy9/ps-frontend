<template>
  <div class="grid grid-cols-4">
    <div class="col-span-1 h-96 p-2">
      <div class="rounded-xl h-full mt-48">
        <div class="grid grid-col-2 gap-2">
          <RouterLink
            to="/user"
            active-class="bg-black/40"
            class="py-2 px-4 rounded-full bg-gray-200 font-bold text-center hover:bg-black/40 duration-700"
          >
            Account Settings</RouterLink
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
