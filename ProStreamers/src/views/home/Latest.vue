<template>
    <div class="Latest grid grid-cols-4 gap-8">
        <div class="bg-blue-500 col-span-1 h-96">
        </div>
        <div class="film-content col-span-3">
            <div v-if="loading" class="loading-screen">
                Loading films, please wait <i class="fa-solid fa-spinner fa-spin-pulse fa-xl"></i>
            </div>
            <div v-else class="film-cards grid-cols-3 overflow-auto h-screen">
                <div v-for="film in films" :key="film.id" class="film-card col-span-1">
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
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            films: [],
            loading: false // Add the loading state
        }
    },
    mounted() {
        this.fetchFilms()
    },
    methods: {
        fetchFilms() {
            this.loading = true // Set loading to true before the request
            const url = 'http://chrisouboter.com/api/movies/all'

            axios
                .get(url)
                .then((response) => {
                    this.films = response.data
                })
                .catch((error) => {
                    console.error('Error fetching films', error)
                })
                .finally(() => {
                    this.loading = false // Set loading to false after the request
                })
        }
    }
}
</script>

<style scoped>
.Films {
    position: relative;
    /* Ensure the loading screen is positioned relative to this container */
}

.film-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    height: 520px;
}

.film-card {
    background-color: #f0f0f0;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.loading-screen {
    position: absolute;
    /* Make the loading screen cover the entire Films container */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.8);
    /* Semi-transparent background */
    z-index: 10;
    /* Ensure it's above other content */
    font-size: 1.5em;
    color: #333;
}
</style>