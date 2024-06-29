<template>
  <div class="film-card col-span-1 w-56 rounded-sm relative" @click="redirectToDetails">
    <img :src="getPoster()" class="rounded-xl blur-bottom poster-image w-56" />

    <div
      class="play-overlay absolute inset-0 flex items-center justify-center text-white text-2xl font-bold"
    >
      <i class="fa-solid fa-play flex items-center pointer-events-none fa-xl"></i>
    </div>
    <div
      class="details-container duration-700 absolute bottom-0 w-full bg-w backdrop-blur-1 bg-opacity-50 text-white p-2 rounded-b-xl"
    >
      <h1 class="movie-title">{{ film.title }}</h1>
      <i class="fa-solid fa-play fa-md play-icon hidden"></i>
      <div class="flex space-x-2">
        <h2 v-if="film.content === 'Movie'" class="movie-genre text-sm">{{ film.length }} min /</h2>
        <h2 v-if="film.content === 'Serie'" class="movie-genre text-sm">
          {{ film.episodes }} Eps /
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
.blur-bottom {
  background: inherit;
  filter: blur(0px);
}

.film-card {
  position: relative;
  cursor: pointer;
  max-height: 21rem;
}

.details-container {
  background-color: rgba(0, 0, 0, 0.9);
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
  font-size: 0.75rem;
}

.play-overlay {
  display: none;
  background-color: rgba(0, 0, 0, 0.5);
  /* Optional: Add a semi-transparent background */
}

.film-card:hover .poster-image {
  filter: blur(0.25px);
  border: solid white 4px;
}

.film-card:hover .play-overlay {
  display: flex;
}

.film-card:hover .details-container {
  opacity: 0;
}

.film-card:hover .play-icon {
  opacity: 100;
}
</style>
