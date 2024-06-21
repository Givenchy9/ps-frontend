<template>
  <div class="Films grid grid-cols-4 gap-4">
    <div class="col-span-1 h-96">
      <div class="relative w-1/2 m-auto">
        <i
          class="fa-solid fa-magnifying-glass absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
        ></i>
        <input
          type="text"
          name="price"
          id="price"
          class="block w-full rounded-full py-1.5 pl-10 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
          placeholder="Search"
        />
      </div>
      <div>Selected: {{ selected }}</div>

      <select v-model="selected" class="w-full">
        <option>Alles</option>
      </select>
      <input type="number" class="m-auto w-full mt-2" min="10" max="600" />
      <div class="mt-2">
        <input type="checkbox" id="choose-me" class="peer hidden mt-10" />
        <label
          for="choose-me"
          class="select-none cursor-pointer rounded-lg border-2 border-gray-200 px-6 font-bold text-gray-200 transition-colors duration-200 ease-in-out peer-checked:bg-gray-200 peer-checked:text-gray-900 peer-checked:border-gray-200"
        >
          Nieuwste</label
        >
      </div>
    </div>
    <div class="film-content col-span-3">
      <div v-if="loading" class="p-4 loading-screen">
        <i class="fa-solid fa-spinner fa-spin-pulse fa-xl"></i>
      </div>
      <div v-else class="film-cards grid-cols-3 overflow-auto h-screen">
        <div v-for="d in data" :key="d.id" class="film-card col-span-1 w-56 rounded-sm">
          <img src="https://i.imgur.com/VtyOj1x.jpg" class="rounded-xl poster-image w-56" />
          <h1 class="movie-title">{{ d.title }}</h1>

          <!-- Relative length/episodes -->
          <div class="flex space-x-2">
            <h2 v-if="d.content == 'Movie'" class="movie-genre text-sm">{{ d.length }} min /</h2>
            <h2 v-if="d.content == 'Serie'" class="movie-genre text-sm">
              {{ d.episodes }} episodes /
            </h2>
            <p class="text-sm">{{ timeAgo(d.created_at) }}</p>

            <h2 class="movie-genre text-sm border-black border rounded-md">
              {{ d.genre }}
            </h2>
          </div>
        </div>
      </div>
      <div class="absolute mt-1">
        <input type="checkbox" id="choose-me" class="peer hidden w-full" />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import Dropdown from '@/components/dropdown.vue'

export default {
  components: {
    Dropdown
  },
  data() {
    return {
      data: [],
      loading: false // Add the loading state
    }
  },
  mounted() {
    this.fetchFilms()
  },
  methods: {
    timeAgo(input) {
      return moment(input).fromNow()
    },
    fetchFilms() {
      this.loading = true // Set loading to true before the request
      const url = 'http://chrisouboter.com/api/all/movie'

      axios
        .get(url)
        .then((response) => {
          this.data = response.data.data
        })
        .catch((error) => {
          console.error('Error fetching films', error)
        })
        .finally(() => {
          this.loading = false // Set loading to false after the request
        })
    }
  }
}
</script>

<style scoped>
.Films {
  position: relative;
  /* Ensure the loading screen is positioned relative to this container */
}

.film-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  height: 680px;
}

/* .film-card {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
} */

.loading-screen {
  position: absolute;
  /* Make the loading screen cover the entire Films container */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
  /* Semi-transparent background */
  z-index: 10;
  /* Ensure it's above other content */
  font-size: 1.5em;
  color: #333;
}
</style>
