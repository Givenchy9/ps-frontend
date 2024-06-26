<script>
import axios from 'axios'
import { ref, onMounted, defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Footer from '@/components/Footer.vue'

export default defineComponent({
  components: {
    Footer
  },
  setup() {
    const route = useRoute()

    const router = useRouter()
    const filmId = ref(route.params.filmId)
    const loading = ref(false)
    const data = ref(null)
    const poster = ref(null)
    const rating = ref(null)
    const favorited = ref(null)

    function toggleFavorite(filmData) {
      console.log('toggle favorite' + filmId.value)
      // Implement the actual logic to toggle the favorite status here
      let token = localStorage.getItem('token')

      let url = 'http://chrisouboter.com/api/user/toggle'

      axios
        .post(
          url,
          {
            content_id: filmId.value
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then((response) => {
          console.log(response.data)
          checkFavorite()
        })
        .catch()
    }

    const checkFavorite = (filmData) => {
      loading.value = true

      let token = localStorage.getItem('token')
      let url = 'http://chrisouboter.com/api/user/check'
      axios
        .post(
          url,
          {
            content_id: filmId.value
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then((response) => {
          favorited.value = response.data.data
          console.log(favorited.value)
          loading.value = false
        })
        .catch()
    }

    const getPoster = (filmData) => {
      let url2 = 'http://www.omdbapi.com/?t=' + filmData.title + '&apikey=1bc03fd4'
      axios
        .get(url2)
        .then((response) => {
          poster.value = response.data.Poster
          rating.value = response.data.Metascore

          console.log(response.data)
          console.log(response.data.Poster)
        })
        .catch((error) => {
          console.error('Error fetching poster', error)
        })
    }

    onMounted(() => {
      loading.value = true
      const url = 'http://chrisouboter.com/api/content/' + filmId.value
      axios
        .get(url)
        .then((response) => {
          data.value = response.data.data
          getPoster(response.data.data)
          checkFavorite(response.data.data)
          loading.value = false
        })
        .catch((error) => {
          console.error('Error fetching films', error)
          router.push('/films')
        })
    })

    return {
      filmId,
      loading,
      data,
      poster,
      rating,
      favorited,
      toggleFavorite
    }
  }
})
</script>

<template>
  <div class="container flex m-auto w-full rounded-md">
    <div class="film-details m-auto flex">
      <img v-if="!loading" :src="poster" class="poster-image w-82 mx-auto" />
      <div v-if="loading" class="loading-screen">
        <i class="fa-solid fa-spinner fa-spin-pulse fa-xl text-white"></i>
      </div>
      <div v-if="!loading" class="details align-middle rounded-md m-2">
        <template v-if="data">
          <div class="flex flex-col justify-between h-full">
            <div>
              <p class="title text-5xl font-bold max-w-fit text-white">{{ data.title }}</p>
              <p class="description text-md w-1/2 text-xl mx-auto text-white">
                {{ data.description }}
              </p>
              <h2 v-if="data.content == 'Movie'" class="movie-genre text-sm text-white">
                {{ data.length }} min
              </h2>
              <h2 v-if="data.content == 'Serie'" class="movie-genre text-sm text-white">
                {{ data.episodes }} episodes
              </h2>
              <div class="flex gap-2 mt-4">
                <div class="genre font-bold bg-gray-600 rounded-md px-2 text-white shadow-md">
                  {{ data.genre }}
                </div>
                <div class="rating bg-white px-2 rounded-md shadow-md">
                  Metascore: {{ rating }}/100
                </div>
              </div>
            </div>

            <div>
              <div class="mt-4">
                <button class="play button mx-2 text-white"><i class="fa-solid fa-play fa-md"></i> Play </button>
                <button
                  v-if="favorited"
                  class="bg-white button mx-2 text-black"
                  @click="toggleFavorite(data.id)"
                >
                <i class="fa-solid fa-trash fa-md"></i>
                  Remove from favorites
                </button>
                <button
                  v-else
                  class="add-favorites bg-white button mx-2"
                  @click="toggleFavorite(data.id)"
                >
                  <i class="fa-solid fa-star fa-md"></i>Add to favorites
                </button>
              </div>
            </div>
          </div>

          <Footer />
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title,
.description,
.genre,
.rating {
  margin: 10px 0;
}

.add-favorites {
  color: black;
}

.play {
  background-color: rgb(46, 46, 46);
}

.button {
  padding: 10px;
  margin: 2px;
  border-radius: 8px;
  width: 250px;
}
</style>