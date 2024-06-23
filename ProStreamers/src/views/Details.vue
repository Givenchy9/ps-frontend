<template>
  <div class="Films flex">
    <div v-if="loading" class="loading-screen">Loading...</div>
    <div v-else class="film-content">
      <!-- Display film details here -->
      <h1>Details for Film ID: {{ filmId }}</h1>
      <!-- Display film details based on filmId -->
      <FilmCard v-for="film in filteredFilms" :key="film.id" :film="film" />
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
      films: [],
      loading: false,
      selected: 'Alles'
    }
  },
  computed: {
    filmId() {
      return this.$route.params.filmId // Accessing filmId from route params
    },
    filteredFilms() {
      // Example of filtering films based on a selected category (this.selected)
      if (this.selected === 'Alles') {
        return this.films
      } else {
        return this.films.filter((film) => film.category === this.selected)
      }
    }
  }
}
</script>

<style scoped>
.Films {
  height: 100vh;
}

.film-content {
  width: 100%;
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
