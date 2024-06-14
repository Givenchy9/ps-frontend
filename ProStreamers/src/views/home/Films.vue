<template>
    <div class="Films">
        <router-link style="float:right" to="/"><i class="fa-solid fa-circle-xmark"></i></router-link>
        <h1>Films</h1>

        <ul>
            <li v-for="film in films" :key="film.id">
                {{ film.title }}
            </li>
        </ul>
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
            const url = "http://chrisouboter.com/api/movies/all";

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

<style></style>