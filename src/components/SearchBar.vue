<template>
  <div class="search_bar me-3 d-flex align-items-center position-relative">
        <div class="select_bar">
      <div class="d-flex align-items-center">
        <div class="label me-3">
          <label for="genre" >Genre:</label>
        </div>
        <div class="selection">
          <select 
            class="form-select_ select_genre"
            name="genre"
            id="genreSelection"
            v-model="selectedGenre"
            @click="selectGenre"
          >
            <option>All</option>
            <option
              v-for="(genre, index) in genresList"
              :key="index"
              v-bind:value="genre.id"
            >
              {{ genre.name }}
            </option>
          </select>
        </div>
      </div>
    </div>


    <input
      v-on:keyup.enter="callApi"
      type="search"   
      v-model="filmSearched"
      name="film_search"
      id="film_search"
    />
    <button class="btn_search" type="button" @click="callApi">Search</button>

  </div>
</template>

<script>
import axios from "axios";
import state from "@/state";

export default {
  name: "SearchBar",
  data() {
    return {
      selectedGenre:"All",
      filmSearched: "",
      genresList: [],
      movies: [],
      series: [],
      creditsFilms: [],
      creditsSeries: [],
      genresMovies: [],
      genresSeries: [],

      searchMovieApi:
        "https://api.themoviedb.org/3/search/movie?api_key=d5fefff0eb8a3f597dfd660cee438f0e&language=en-US&page=1&include_adult=false",
      searchSeriesApi:
        "https://api.themoviedb.org/3/search/tv?api_key=d5fefff0eb8a3f597dfd660cee438f0e&language=en-US&page=1&include_adult=false",
    };
  },
  methods: {
    callApi() {
      if (this.filmSearched !== "") {
        /* Get Genre List */

        /* Get Searched Movies */
        let moviesUrl = `${this.searchMovieApi}&query=${this.filmSearched}`;
        axios.get(moviesUrl).then((movie) => {
          this.movies = movie.data.results;

          /* Get Movies Credits and Genre Films*/
          return this.movies.forEach((movie) => {
            let moviesCreditsUrl = `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=d5fefff0eb8a3f597dfd660cee438f0e&language=en-US`;
            axios.get(moviesCreditsUrl).then((credits) => {
              this.creditsFilms.push(credits.data.cast.slice(0, 3));
            });

            let genreMovie = [];
            this.genresList.forEach((genre) => {
              for (let i = 0; i < 3; i++) {
                if (movie.genre_ids[i] === genre.id) {
                  genreMovie.push(genre.name);
                }
              }
            });
            this.genresMovies.push(genreMovie);
          });
        });

        /* Get Searched  Series */
        let seriesUrl = `${this.searchSeriesApi}&query=${this.filmSearched}`;
        axios.get(seriesUrl).then((movie) => {
          this.series = movie.data.results;

          /* Get Series Credits for season 1 */
          return this.series.forEach((serie) => {
            let seriesCreditsUrl = `https://api.themoviedb.org/3/tv/${serie.id}/season/1/credits?api_key=d5fefff0eb8a3f597dfd660cee438f0e&language=en-US`;
            axios.get(seriesCreditsUrl).then((credits) => {
              this.creditsSeries.push(credits.data.cast.slice(0, 3));
            });
            /* Get only selected genres */

            let genreSerie = [];
            this.genresList.forEach((genre) => {
              for (let i = 0; i < 3; i++) {
                if (serie.genre_ids[i] === genre.id) {
                  genreSerie.push(genre.name);
                }
              }
            });

            this.genresSeries.push(genreSerie);

            /* export data into state.js */
            state.movies = this.movies;
            state.series = this.series;
            state.creditsFilms = this.creditsFilms;
            state.creditsSeries = this.creditsSeries;                       
            state.genresMovies = this.genresMovies;
            state.genresSeries = this.genresSeries;
          });
        });
      }
    },
    getGenreList() {
      let genreUrl =
        "https://api.themoviedb.org/3/genre/movie/list?api_key=d5fefff0eb8a3f597dfd660cee438f0e&language=en-US";
      axios.get(genreUrl).then((genre) => {
        this.genresList = genre.data.genres;
        return this.genresList;
      });
    },
    selectGenre(){
      state.selectedGenre = this.selectedGenre;
    },
  },
  mounted() {
    this.getGenreList();
  },
};
</script>

<style lang='scss' scoped>

    #film_search {
      height: 2.3rem;
      border-radius: 2px;
      border: none;
      padding: 2px 0.2rem;
      min-width: 15rem;
    }
    .btn_search {
      border: none;
      margin-left: 10px;
    }
    .select_bar {
      padding: 2px 0.2rem;
      z-index: 10;
      .select_genre {
        width: 200px;
      }
    }
</style>