<template>
  <div class="mt-10">
    <div class="grid grid-col-2 w-full m-auto">
      <div class="relative w-96 m-auto">
        <input
          type="text"
          ref="searchInput"
          class="block w-full p-4 ps-10 text-md dark:text-white placeholder-gray-700 text-gray-700 border border-gray-300 rounded-lg bg-white/20 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search in our database..."
          v-model="search"
        />
        <i
          class="fa fa-search absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-700 dark:text-white"
        ></i>
      </div>
    </div>
    <div class="film h-full overflow-auto mx-10 mt-10">
      <div class="film-content p-4 fixed overflow-auto">
        <div v-if="loading" class="p-4 loading-screen">
          <i class="fa-solid fa-spinner fa-spin-pulse fa-xl text-white"></i>
        </div>
        <div class="film-cards h-full overflow-auto w-11/12">
          <FilmCard
            v-if="search && filteredFilms.length > 0"
            v-for="d in filteredFilms"
            :key="d.id"
            :film="d"
          />
          <FilmCard v-else v-for="d in data" :key="d.id" :film="d" />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import { ref, onMounted, watch, computed, defineComponent } from 'vue'
import axios from 'axios'
import Fuse from 'fuse.js'
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
    const searchInput = ref<HTMLInputElement | null>(null)

    const fetchFilms = () => {
      filter()
    }

    const filter = () => {
      loading.value = true
<<<<<<< Updated upstream
      const movieUrl = 'http://www.chrisouboter.com/api/all/movie'
      const seriesUrl = 'http://www.chrisouboter.com/api/all/serie'
=======
      const movieUrl = 'http://api.chrisouboter.com/api/all/movie'
      const seriesUrl = 'http://api.chrisouboter.com/api/all/serie'
>>>>>>> Stashed changes

      axios
        .all([axios.get(movieUrl), axios.get(seriesUrl)])
        .then(
          axios.spread((moviesResponse, seriesResponse) => {
            let films = [...moviesResponse.data.data, ...seriesResponse.data.data]
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
        )
        .catch((error) => {
          console.error('Error fetching films and series', error)
        })
        .finally(() => {
          loading.value = false
        })
    }

    const fuse = computed(() => {
      return new Fuse(data.value, {
        keys: ['title'],
        threshold: 5
      })
    })

    const filteredFilms = computed(() => {
      if (!search.value) {
        return data.value
      }
      return fuse.value.search(search.value).map((result) => result.item)
    })

    onMounted(() => {
      fetchFilms()
      if (searchInput.value) {
        searchInput.value.focus()
      }
    })

    watch(selected, fetchFilms)
    watch(alfa, fetchFilms)

    return {
      data,
      loading,
      selected,
      search,
      alfa,
      filteredFilms,
      fetchFilms,
      searchInput
    }
  }
})
</script>

<style scoped>
.film {
  height: 580px;
}

.filter-section {
  position: fixed;
  left: 0;
  height: 100%;
  width: 25%;
  background: transparent;
}

.film-content {
  width: 100%;
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
