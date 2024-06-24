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
    const rating = ref(null)

    const getPoster = (filmData) => {
      let url2 = 'http://www.omdbapi.com/?t=' + filmData.title + '&apikey=1bc03fd4';
      axios
        .get(url2)
        .then((response) => {
          poster.value = response.data.Poster;
          rating.value = response.data.Metascore;
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
      poster,
      rating
    }
  }
})
</script>

<template>
  <div class="container">
    <div v-if="loading" class="loading-screen">
      <i class="fa-solid fa-spinner fa-spin-pulse fa-xl"></i>
    </div>
    <div v-else class="film-details">
      <img :src="poster" class="poster-image w-92" />
      <div class="details">
        <template v-if="data">
          <p class="title text-4xl">{{ data.title }}</p>
          <p class="description text-2xl">Description: {{ data.description }}</p>
          <div class="flex gap-2">
            <p class="genre">{{ data.genre }}</p>
          <p class="rating">Metascore: {{ rating }}/100</p>

          </div>
          <button class="add-favorites">Add to favorites</button>
          <Footer />
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>


.loading-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.film-details {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px; /* Adjust as needed */
}

.poster-image {
  height: auto;
  border-radius: 8px;
}

.details {
  display: flex;
  top: 0;
  flex-direction: column;
}

.title, .description, .genre, .rating {
  margin: 10px 0;
}

.add-favorites {
  background-color: black;
  color: white;
  padding: 10px;
  border-radius: 8px;
  width: 250px;
}

</style>