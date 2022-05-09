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
        <li v-for="movie in movies" :key="movie.title">
          <ul>
            <lh><h3>{{movie.title}}</h3></lh>
            <li>{{movie.original_title}}</li>
            <li>{{movie.original_language}}</li>
            <li>{{movie.vote_average}}</li>
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
      api_url:
        "https://api.themoviedb.org/3/search/movie?api_key=d5fefff0eb8a3f597dfd660cee438f0e&language=en-US&page=1&include_adult=false",
      new_url:"",
      movies: [],
    };
  },
  methods: {
    callApi() {
      console.log(this.filmSearched);
      if (this.filmSearched !== "") {
      let callUrl = `${this.api_url}&query=${this.filmSearched}` 
      axios.get(callUrl).then(movie =>{
      this.movies = movie.data.results
      return this.movies
      });
        
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
