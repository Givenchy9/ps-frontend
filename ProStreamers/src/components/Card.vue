<template>
  <div class="film-card col-span-1 w-56 rounded-sm relative" @click="redirectToDetails">
    <img :src="getPoster()" class="rounded-xl poster-image w-56" />
    <!-- Details Container -->
    <div class="details-container absolute bottom-0 w-full bg-black bg-opacity-50 text-white p-2 rounded-b-xl">
      <h1 class="movie-title">{{ film.title }}</h1>

      <!-- Relative length/episodes -->
      <div class="flex space-x-2">
        <h2 v-if="film.content === 'Movie'" class="movie-genre text-sm">{{ film.length }} min /</h2>
        <h2 v-if="film.content === 'Serie'" class="movie-genre text-sm">
          {{ film.episodes }} Eps /
        </h2>
        <p class="text-sm">{{ timeAgo(film.created_at) }}</p>
        <h2 class="movie-genre text-sm rounded-md">{{ film.genre }}</h2>
      </div>

      <div v-if="showOverlay"
        class="play-overlay flex items-center justify-center absolute inset-0 bg-black bg-opacity-25">
        <button v-if="showOverlay" class="text-white text-4xl">
          <i class="fas fa-play-circle"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import router from '@/router/index.ts'
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
      showOverlay: true,
      poster: ''
    }
  },
  methods: {
    // GET POSTER FROM ACTUAL MOVIE SOURCE
    getPoster() {
      let url = 'http://www.omdbapi.com/?t=' + this.film.title + '&apikey=1bc03fd4'
      console.log(url)
      axios
        .get(url)
        .then((response) => {
          this.poster = response.data.Poster
        })
        .catch((error) => {
          console.error('Error fetching films', error)
        })

      return this.poster
    },
    timeAgo(input) {
      return moment(input).fromNow()
    },
    redirectToDetails() {
      router.push({ name: 'details', params: { filmId: this.film.id } })
    }
  }
}
</script>
<!--  1bc03fd4 KEY VOOR OMDBAPI -->
<style scoped>
.film-card {
  position: relative;
  cursor: pointer;
}

.details-container {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  transition: background-color 0.3s ease;
  margin-bottom: 3px;
}

.poster-image {
  display: block;
  width: 100%;
  border-radius: 0.5rem 0.5rem;
  transition: filter 0.3s ease;
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

.play-overlay {
  display: none;
}

.film-card:hover .poster-image {
  /* filter: blur(5px); */
  border: solid white 4px;
}

.film-card:hover .details-container {
  background-color: rgba(0, 0, 0, 0);
}

.film-card:hover .play-overlay {
  display: flex;
}
</style>
