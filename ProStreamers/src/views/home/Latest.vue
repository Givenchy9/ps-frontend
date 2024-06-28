<template>
  <div class="Films flex">
    <div class="filter-section fixed h-full p-4 w-1/12 shadow-lg backdrop-blur-lg">
      <div class="relative w-full m-auto">
        <i
          class="fa-solid fa-magnifying-glass absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></i>
        <input type="text"
          class="block w-full rounded-full py-1.5 pl-10 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
          placeholder="Search" v-model="search" />
      </div>
      <div class="rounded-xl">
        <h2 class="text-white text-center mt-2 p-2 text-gray-700 dark:text-white">Filter genre</h2>
        <select v-model="selected" class="w-full p-2 rounded-full bg-gray-200">
          <option>All</option>
          <option>Animation</option>
          <option>Action</option>
          <option>Adventure</option>
          <option>Horror</option>
        </select>
      </div>
      <div class="mt-2">
        <input v-model="alfa" type="checkbox" id="choose-me" class="peer hidden" />
        <label for="choose-me"
          class="select-none cursor-pointer rounded-lg border-2 border-gray-200 px-2 font-bold text-gray-200 transition-colors duration-200 ease-in-out peer-checked:bg-gray-200 peer-checked:text-gray-900 peer-checked:border-gray-200">
          Alphabetical
        </label>
      </div>
    </div>
    <div class="film-content ml-1/4 w-3/4 p-4 fixed">
      <div v-if="loading" class="p-4 loading-screen">
        <i class="fa-solid fa-spinner fa-spin-pulse fa-xl text-white"></i>
      </div>
      <div class="film-cards h-full overflow-auto">
        <FilmCard v-for="d in data" :key="d.id" :film="d" />
      </div>
    </div>
  </div>
  <Footer />
</template>

<script lang="ts">
import { ref, onMounted, watch, defineComponent } from 'vue'
import axios from 'axios'
import FilmCard from '@/components/Card.vue'
import Footer from '@/components/Footer.vue'

interface Film {
  id: number
  title: string
  genre: string
}

export default defineComponent({
  components: {
    FilmCard,
    Footer
  },
  setup() {
    const data = ref<Film[]>([])
    const loading = ref(false)
    const selected = ref('All')
    const search = ref('')
    const alfa = ref(false)

    const fetchFilms = () => {
      filter()
    }

    const filter = () => {
      loading.value = true
      const url = 'http://chrisouboter.com/api/latest'

      axios
        .get(url)
        .then((response) => {
          let films = response.data.data
          if (selected.value !== 'All') {
            films = films.filter((film: Film) => {
              return film.genre.toLowerCase().includes(selected.value.toLowerCase())
            })
          }

          if (alfa.value) {
            films = films.sort((a: Film, b: Film) => {
              return a.title.localeCompare(b.title)
            })
          }

          data.value = films
        })
        .catch((error) => {
          console.error('Error fetching films', error)
        })
        .finally(() => {
          loading.value = false
        })
    }

    const searchData = (newSearch: string) => {
      if (newSearch.length === 0) {
        fetchFilms()
      } else {
        data.value = data.value.filter((film: Film) => {
          return film.title.toLowerCase().includes(newSearch.toLowerCase())
        })
      }
    }

    onMounted(fetchFilms)

    watch(selected, filter)
    watch(search, searchData)
    watch(alfa, filter)

    return {
      data,
      loading,
      selected,
      search,
      alfa,
      fetchFilms,
      filter,
      searchData
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