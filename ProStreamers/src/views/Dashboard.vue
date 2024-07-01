<template>
  <div class="Films flex">
    
    <div class="film-content p-4 fixed">
      <form v-if="!loading" class="space-y-6 w-1/2" @submit.prevent="handleSubmit">

        <div>
          <label for="name" class="block text-sm font-medium leading-6 text-black dark:text-white"
            >Name</label
          >
          <div class="mt-2">
            <input
              v-model="name"
              id="name"
              name="name"
              type="text"
              class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-black dark:text-white"
            >Email address</label
          >
          <div class="mt-2">
            <input
              v-model="email"
              id="email"
              name="email"
              class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex shadow-xl w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-xl hover:text-white hover:bg-black/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <div v-if="!loading" class="">Save</div>
            <div v-if="loading" class="loading-screen">
              <i class="fa-solid fa-spinner fa-spin-pulse fa-xl text-black dark:text-white"></i>
            </div>
          </button>
        </div>
      </form>
    </div>
  </div>
  <Footer />
</template>

<script lang="ts">
import { ref, onMounted, watch, defineComponent } from 'vue'
import axios from 'axios'
import Footer from '@/components/Footer.vue'

export default defineComponent({
  components: {
    Footer
  },
  setup() {
    const data = ref()
    const loading = ref(false)
    const selected = ref('All')
    const search = ref('')
    const alfa = ref(false)

    const name = ref('')
    const email = ref('')

    const handleSubmit = () => {
      console.log("Console loggg");
    }

    return {
      data,
      loading,
      selected,
      search,
      alfa,
      email,
      name,
      handleSubmit,
    }
  }
})
</script>

<style scoped>
.filter-section {
  position: fixed;
  left: 0;
  height: 100%;
  width: 25%;
  background: transparent;
}

.film-content {
  margin-left: 25%;
  width: 75%;
  height: 700px;
  padding: 1rem;
}

.loading-screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  font-size: 1.5em;
  color: #333;
}

.film-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding-bottom: 16rem;
}
</style>
