<template>
  <div class="film-card col-span-1 w-56 rounded-sm relative">
    <img :src="poster" class="rounded-xl poster-image w-56" />

    <!-- Details Container -->
    <div
      class="details-container absolute bottom-0 w-full bg-black bg-opacity-50 text-white p-2 rounded-b-xl"
    >
      <h1 class="movie-title">{{ film.title }}</h1>

      <!-- Relative length/episodes -->
      <div class="flex space-x-2">
        <h2 v-if="film.content == 'Movie'" class="movie-genre text-sm">{{ film.length }} min /</h2>
        <h2 v-if="film.content == 'Serie'" class="movie-genre text-sm">
          {{ film.episodes }} episodes /
        </h2>
        <p class="text-sm">{{ timeAgo(film.created_at) }}</p>

        <h2 class="movie-genre text-sm rounded-md">
          {{ film.genre }}
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Card',
  props: {
    film: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      images: [
        'https://i.imgur.com/VtyOj1x.jpg',
        'https://i.imgur.com/010nWRH.jpg',
        'https://i.imgur.com/NQLz1bz.jpg',
        'https://i.imgur.com/OtHXYcV.jpg'
      ]
    }
  },
  computed: {
    poster() {
      const randomIndex = Math.floor(Math.random() * this.images.length)
      return this.images[randomIndex]
    }
  },
  methods: {
    timeAgo(input) {
      return moment(input).fromNow()
    }
  }
}
</script>

<style>
.film-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  height: 680px;
}
.film-card {
  position: relative;
}

.details-container {
  background-color: rgba(0, 0, 0, 0.5); /* Transparent black background */
  padding: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}

.poster-image {
  display: block;
  width: 100%;
  border-radius: 0.5rem 0.5rem 0 0; /* Rounded top corners */
}

.movie-title {
  font-size: 1.25rem;
  font-weight: bold;
}

.movie-genre {
  font-size: 0.5rem;
}

.text-sm {
  font-size: 0.875rem;
}
</style>
