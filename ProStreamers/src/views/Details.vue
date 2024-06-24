<script>
import axios from 'axios'
import { ref, onMounted, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import Footer from '@/components/Footer.vue'


export default defineComponent({
  setup() {
    const route = useRoute()
    const filmId = ref(route.params.filmId)
    const loading = ref(false)
    const data = ref(null)
    const poster = ref(null)

    const getPoster = (filmData) => {
      let url2 = 'http://www.omdbapi.com/?t=' + filmData.title + '&apikey=1bc03fd4';
      axios
        .get(url2)
        .then((response) => {
          poster.value = response.data.Poster
          loading.value = false
          console.log(response.data);
          console.log(response.data.Poster);
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
          data.value = response.data.data  // Assuming response.data contains the actual film data
          getPoster(response.data.data);  // Call getPoster to fetch the poster
        })
        .catch((error) => {
          console.error('Error fetching films', error)
        })
        .finally(() => {
          // Any final cleanup or handling can go here
        })
    })

    return {
      filmId,
      loading,
      data,
      poster
    }
  }
})
</script>

<template>
  <div class="flex">
    <div class="Films flex">
      <div v-if="loading" class="loading-screen">Loading...</div>
      <div v-else class="film-content">
        <img :src="poster" class="rounded-xl poster-image" />
        <h1>Details for Film ID: {{ filmId }}</h1>
        <template v-if="data">
          <p class="text-4xl">Title: {{ data.title }}</p>
          <p class="text-2xl">Description: {{ data.description }}</p>
          <p>Genre: {{ data.genre }}</p>


          <button class="bg-black text-white p-2 rounded-xl">Add to favorites</button>
          <Footer />

        </template>
        
        <template v-else>
          <p>No data available</p>
        </template>
      </div>
    </div>
  </div>
</template>




<style scoped>
/* Add scoped styles here if needed */
</style>
