<template>
  <div class="Films">
    <div class="film-cards">
      <div v-for="film in films" :key="film.id" class="film-card">
        <h2>{{ film.title }}</h2>
        Genre:
        <p>{{ film.movie_type }}</p>
        Jaar:
        <p>{{ film.year }}</p>
        Minuten:
        <p>{{ film.minutes }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      films: []
    }
  },
  mounted() {
    this.fetchFilms()
  },
  methods: {
    fetchFilms() {
      const url = 'http://chrisouboter.com/api/movies/all'

      axios
        .get(url)
        .then((response) => {
          this.films = response.data
        })
        .catch((error) => {
          console.error('Error fetching films', error)
        })
    }
  }
}
</script>

<style scoped>
.film-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.film-card {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
