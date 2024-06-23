<template>
  <div class="Films flex">
    <div v-if="loading" class="loading-screen">Loading...</div>
    <div v-else class="film-content">
      <h1>Details for Film ID: {{ filmId }}</h1>
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
      loading: false
    }
  },
  methods: {
    fetch() {}
  },
  computed: {
    filmId() {
      return this.$route.params.filmId
    }
  }
}
</script>

<style scoped></style>
