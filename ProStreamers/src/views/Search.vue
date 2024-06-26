<template>
    <div class="mt-10">
      <div class="grid grid-col-2 w-full m-auto">
        <input type="text"
               ref="searchInput"
               class="block w-96 m-auto rounded-full py-1.5 pl-10 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
               placeholder="Search for movies and series"
               v-model="search" />
      </div>
      <div class="film h-96 overflow-auto mx-10 mt-10">
        <div v-if="loading" class="p-4 loading-screen">
          <i class="fa-solid fa-spinner fa-spin-pulse fa-xl text-white"></i>
        </div>
        <div v-else class="film-cards h-full overflow-auto">
          <FilmCard v-if="search && filteredFilms.length > 0" v-for="d in filteredFilms" :key="d.id" :film="d" />
          <p v-if="search && filteredFilms.length === 0" class="text-center text-gray-600 mt-4">No results found.</p>
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
      id: number;
      title: string;
      genre: string;
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
              const movieUrl = 'http://chrisouboter.com/api/all/movie'
              const seriesUrl = 'http://chrisouboter.com/api/all/serie'
  
              axios
                  .all([axios.get(movieUrl), axios.get(seriesUrl)])
                  .then(axios.spread((moviesResponse, seriesResponse) => {
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
                  }))
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
              if (!search.value) return []
              return fuse.value.search(search.value).map(result => result.item)
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
}
</style>
