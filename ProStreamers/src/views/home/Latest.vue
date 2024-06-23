<template>
  <div class="Films flex">
    <div class="filter-section fixed h-full p-4 w-1/4 bg-white shadow-lg">
      <div class="relative w-3/4 m-auto">
        <i
          class="fa-solid fa-magnifying-glass absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
        ></i>
        <input
          type="text"
          class="block w-full rounded-full py-1.5 pl-10 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
          placeholder="Search"
        />
      </div>
      <div class="mt-4">Selected: {{ selected }}</div>
      <select v-model="selected" class="w-full mt-2">
        <option>Alles</option>
      </select>
      <input type="number" class="w-full mt-2" min="10" max="600" />
      <div class="mt-4">
        <input type="checkbox" id="choose-me-1" class="peer hidden mt-10" />
        <label
          for="choose-me-1"
          class="select-none cursor-pointer rounded-lg border-2 border-gray-200 px-6 font-bold text-gray-200 transition-colors duration-200 ease-in-out peer-checked:bg-gray-200 peer-checked:text-gray-900 peer-checked:border-gray-200"
        >
          Nieuwste
        </label>
      </div>
    </div>
    <div class="film-content ml-1/4 w-3/4 overflow-y-auto h-screen p-4">
      <div v-if="loading" class="p-4 loading-screen">
        <i class="fa-solid fa-spinner fa-spin-pulse fa-xl"></i>
      </div>
      <div class="film-cards">
        <FilmCard v-for="d in data" :key="d.id" :film="d" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import FilmCard from '@/components/Card.vue'

export default {
  components: {
    FilmCard
  },
  data() {
    return {
      data: [],
      loading: false,
      selected: 'Alles'
    }
  },
  mounted() {
    this.fetchFilms()
  },
  methods: {
    fetchFilms() {
      this.loading = true
      const url = 'http://chrisouboter.com/api/latest'

      axios
        .get(url)
        .then((response) => {
          this.data = response.data.data
        })
        .catch((error) => {
          console.error('Error fetching films', error)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style scoped>
.Films {
  height: 100vh;
  overflow: hidden;
}

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
  height: 100%;
  overflow-y: auto;
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
}
</style>
