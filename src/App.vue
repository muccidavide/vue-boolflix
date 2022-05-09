<template>
  <div id="app">
    <div class="wrapper">
      <input
        type="search"
        v-model="filmSearched"
        name="film_search"
        id="film_search"
      />
      <button type="button" @click="callApi">Search</button>
      <ul>
        <li v-for="movie in movies" :key="movie.id">
          <ul>
            <li>
              <h3>{{ movie.title }}</h3>
            </li>
            <li>{{ movie.original_title }}</li>
            <li>{{ movie.original_language }}</li>
            <li>{{ movie.vote_average }}</li>
            <img :src="renderFlag(movie)" alt="" />
          </ul>
        </li>
      </ul>
      <ul>
        <li v-for="serie in series" :key="serie.id">
          <ul>
            <li>
              <h3>{{ serie.name }}</h3>
            </li>
            <li>{{ serie.original_name }}</li>
            <li>{{ serie.original_language }}</li>
            <li>{{ serie.vote_average }}</li>
            <img :src="renderFlag(serie)" alt="" />
          </ul>
        </li>
      </ul>
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
      searchMovieApi:
        "https://api.themoviedb.org/3/search/movie?api_key=d5fefff0eb8a3f597dfd660cee438f0e&language=en-US&page=1&include_adult=false",
      searchSeriesApi:
        "https://api.themoviedb.org/3/search/tv?api_key=d5fefff0eb8a3f597dfd660cee438f0e&language=en-US&page=1&include_adult=false",
      movies: [],
      series: [],
      countryFlag: "https://countryflagsapi.com/png/",
    };
  },
  methods: {
    callApi() {
      if (this.filmSearched !== "") {
        let moviesUrl = `${this.searchMovieApi}&query=${this.filmSearched}`;
        axios.get(moviesUrl).then((movie) => {
          this.movies = movie.data.results;
          return this.movies;
        });

        let seriesUrl = `${this.searchSeriesApi}&query=${this.filmSearched}`;
        axios.get(seriesUrl).then((movie) => {
          this.series = movie.data.results;
          return this.series;
        });
      }
    },
    renderFlag(movie) {
      if (movie.original_language !== "en") {
        let flag = this.countryFlag + movie.original_language;
        return flag;
      } else {
        let flag = this.countryFlag + "gb";
        return flag;
      }
    },
  },
  /*   mounted(){
    this.callApi()
  } */
};
</script>

<style lang="scss">
@import "@/assets/scss/style.scss";
</style>
