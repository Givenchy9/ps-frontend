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
  <div class="h-20">
    <RouterLink to="/film">
      <i class="fa-solid fa-circle-left fa-xl float-right"></i>
    </RouterLink>
    <div class="grid grid-cols-3 gap-8">
      <div v-if="loading" class="loading-screen">Loading...</div>
      <div v-else class="col-span-1">
        <img :src="poster" class="rounded-xl poster-image" />
      </div>
      <div class="grid grid-rows-2 col-span-2">
        <div>
          <h1>Details for Film ID: {{ filmId }}</h1>
          <template v-if="data">
            <p class="text-4xl font-bold">Title: {{ data.title }}</p>
            <p class="text-2xl">Description: {{ data.description }}</p>
            <p>Genre: {{ data.genre }}</p>




            <Footer />

          </template>

          <template v-else>
            <p>No data available</p>
          </template>
        </div>
        <div>
          <button class="bg-black text-white p-2 rounded-xl">Add to favorites</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.poster-image {
  height: 600px;
}
</style>
