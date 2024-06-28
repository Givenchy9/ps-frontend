<template>
  <header
    class="flex p-8 w-full m-auto justify-between gap-4 text-center justify-center background-black backdrop-blur-sm rounded-sm fixed top-0 left-1/2 transform -translate-x-1/2"
  >
    <div class="font-bold text-2xl text-white">ProStreamers</div>

    <div class="align-middle flex-row flex">
      <RouterLink
        class="isolate text-white w-1/3 py-2 px-4 gap-2 rounded-md mx-2 bg-white/10 shadow-xl ring-2 ring-gray-200 hover:bg-gray-200 hover:text-gray-600 duration-200"
        to="/films"
        active-class="underline font-bold ring-gray-400"
        >Films</RouterLink
      >
      <RouterLink
        class="isolate text-white w-1/3 py-2 px-4 gap-2 rounded-md mx-2 bg-white/10 shadow-xl ring-2 ring-gray-200 hover:bg-gray-200 hover:text-gray-600 duration-200"
        to="/series"
        active-class="underline font-bold ring-gray-400"
        >Series</RouterLink
      >
      <RouterLink
        class="isolate text-white w-1/3 py-2 px-4 gap-2 rounded-md mx-2 bg-white/10 shadow-xl ring-2 ring-gray-200 hover:bg-gray-200 hover:text-gray-600 duration-200"
        to="/latest"
        active-class="underline font-bold ring-gray-400"
        >Latest</RouterLink
      >
    </div>
    <div
      class="flex text-white flex-row gap-2 rounded-md ring-gray-200 hover:bg-black/20 duration-700"
    >
      <button
        @click="logOut"
        class="bg-white/5 rounded-md px-4 py-2 flex justify-center items-center"
      >
        <i class="fa-solid fa-user px-2 fa-md fa-white align-middle"></i>
        <p class="mx-2 font-bold align-middle">Log out</p>
      </button>
    </div>
  </header>

  <main class="px-4 mt-32 mb-20">
    <router-view> </router-view>
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'HomeView',
  setup() {
    const router = useRouter()
    let username = ''

    onMounted(() => {
      let user = localStorage.getItem('user')
      if (user) {
        user = JSON.parse(user)
        username = user?.name
      }
    })

    const logOut = () => {
      localStorage.clear()
      router.push('/login')
    }

    return {
      username,
      logOut
    }
  }
})
</script>
<style></style>
