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
              <img class="poster" :src="getPoster(movie)" @error="setAlternativePoster" :alt="movie.title">
            <li>{{ movie.original_title }}</li>
            <li>{{ movie.original_language }}</li>
            <!-- icone -->
            <li><font-awesome-icon v-for="n in ratingToStars(movie)" :key="n" icon="fa-solid fa-star"/></li>
            <img class="flag" :src="renderFlag(movie)" @error="setAlternativeImg" alt="" />
          </ul>
        </li>
      </ul>
      <ul>
        <li v-for="serie in series" :key="serie.id">
          <ul>
            <li>
              <h3>{{ serie.name }}</h3>
              <img class="poster" :src="getPoster(serie)" @error="setAlternativePoster" :alt="serie.title">
            </li>
            <li>{{ serie.original_name }}</li>
            <li>{{ serie.original_language }}</li>
            <!-- icone -->
            <li><font-awesome-icon  v-for="n in ratingToStars(serie)" :key="n" icon="fa-solid fa-star"/></li>
            <img class="flag" :src="renderFlag(serie)" @error="setAlternativeImg" :alt="serie.title" />
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
      posterSize: "w154/",
      stars:[],
    };
  },
  methods: {
    callApi() {
      if (this.filmSearched !== "") {
        /* Get Searched Movies */
        let moviesUrl = `${this.searchMovieApi}&query=${this.filmSearched}`;
        axios.get(moviesUrl).then((movie) => {
          this.movies = movie.data.results;
          return this.movies;
        });
        /* Get Searched Movies */
        let seriesUrl = `${this.searchSeriesApi}&query=${this.filmSearched}`;
        axios.get(seriesUrl).then((movie) => {
          this.series = movie.data.results;
          return this.series;
        });
      }
    },
    renderFlag(movie_serie) {
      if (movie_serie.original_language !== "en") {
        let flag = this.countryFlag + movie_serie.original_language;
        return flag;
      } else {
        let flag = this.countryFlag + "gb";
        return flag;
      }
    },
    setAlternativeImg(event){
      return event.target.src = "https://upload.wikimedia.org/wikipedia/commons/d/d4/World_Flag_%282004%29.svg"
    },
     setAlternativePoster(event){
      return event.target.src = "https://publications.iarc.fr/uploads/media/default/0001/02/thumb_1196_default_publication.jpeg"
    },
    getPoster(movie_serie){
      let movieDBUrl = "https://image.tmdb.org/t/p/"
      let poster = movieDBUrl + this.posterSize + movie_serie.poster_path
      return poster
    },
    ratingToStars(movie_serie){
      let movieStars =  Math.ceil(movie_serie.vote_average/2)
      console.log(movieStars);
      this.stars.length = movieStars

      return this.stars
    }
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/style.scss";

ul{
  li{ 
    .poster{
      max-width: 154px;
    }
    ul{ 
      .flag{
        max-width: 160px;
      }
    }
  }
}
</style>
