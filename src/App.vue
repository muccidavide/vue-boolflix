<template>
  <div id="app">
    <div class="wrapper">
      <input
        type="search"
        v-model="filmSearched"
        name="film_search"
        id="film_search"
      />
      <button type="button" class="btn btn-primary">Search</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  components: {},
  data() {
    return {
      filmSearched: "",
      api_url:
        "https://api.themoviedb.org/3/search/movie?api_key=d5fefff0eb8a3f597dfd660cee438f0e&language=en-US&page=1&include_adult=false",
      new_url:"",
      movies:[],
    };
  },
  methods: {
    callApi() {
      if (this.movies !== undefined && this.movies !== null && this.movies !== "") {
              axios.get(`${this.api_url}&query=${this.filmSearched}`).then(movie =>{
        console.log(movie);
        return this.movies = movie.data.results

      });
      }

    },

  },
    mounted() {
    this.callApi();
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/style.scss";
</style>
