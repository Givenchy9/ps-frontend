<template>
    <div class="Films">
        <router-link style="float: right;" to="/"><i class="fa-solid fa-circle-xmark"></i></router-link>
        <h1>Films</h1>

        <div class="film-cards">
            <div v-for="film in films" :key="film.id" class="film-card">
                <h2>{{ film.title }}</h2>
                <p>{{ film.movie_type }}</p>
                <p>{{ film.year }}</p>
                Minutes: <p>{{ film.minutes }}</p>


            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            films: []
        };
    },
    mounted() {
        this.fetchFilms();
    },
    methods: {
        fetchFilms() {
            const url = "http://127.0.0.1:8000/api/movies/all";

            axios.get(url)
                .then(response => {
                    this.films = response.data;
                })
                .catch(error => {
                    console.error('Error fetching films', error);
                });
        }
    }
};
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
