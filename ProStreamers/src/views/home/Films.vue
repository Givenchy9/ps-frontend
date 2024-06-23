<template>
  <div class="Films flex">
    <div class="filter-section fixed h-full p-4 w-1/12 bg-white shadow-lg">
      <div class="relative w-full m-auto">
        <i
          class="fa-solid fa-magnifying-glass absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
        ></i>
        <input
          type="text"
          class="block w-full rounded-full py-1.5 pl-10 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
          placeholder="Search"
          v-model="search"
        />
      </div>
      <h2>Filter genre</h2>
      <select v-model="selected" class="w-full mt-2 p-2">
        <option>Alles</option>
        <option>Animation</option>
        <option>Action</option>
        <option>Adventure</option>
        <option>Horror</option>
      </select>
      <div class="mt-4">
        <input type="checkbox" id="choose-me-1" class="peer hidden mt-10" />
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
  <Footer />
</template>

<script>
import axios from 'axios'
import FilmCard from '@/components/Card.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    FilmCard,
    Footer
  },
  data() {
    return {
      data: [],
      loading: false,
      selected: 'Alles',
      search: ''
    }
  },
  mounted() {
    this.fetchFilms()
  },
  watch: {
    selected() {
      this.filter()
    },
    search(newSearch) {
      this.searchData(newSearch)
    }
  },
  methods: {
    filter() {
      this.loading = true
      const url = 'http://chrisouboter.com/api/all/movie'

      axios
        .get(url)
        .then((response) => {
          if (this.selected != 'Alles') {
            this.data = response.data.data.filter((film) => {
              return film.genre.toLowerCase().includes(this.selected.toLowerCase())
            })
          } else {
            this.data = response.data.data
          }
        })
        .catch((error) => {
          console.error('Error fetching films', error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    fetchFilms() {
      this.filter()
    },
    searchData(newSearch) {
      console.log(newSearch)
      if (newSearch.length == 0) {
        this.fetchFilms()
      } else {
        this.data = this.data.filter((film) => {
          return film.title.toLowerCase().includes(newSearch.toLowerCase())
        })
      }
    }
  }
}
</script>

<style scoped>
.Films {
  height: 100vh;
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
