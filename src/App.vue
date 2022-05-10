<template>
  <div id="app">
    <header>
      <div class="container-fluid align-items-center">
        <div class="row h-100">
          <div class="col d-flex align-items-center">
            <div class="logo">
              <img src="./assets/img/netflix_logo_1.webp" alt="netflix logo" />
            </div>
          </div>
          <div class="col d-flex align-items-center justify-content-end">
            <div class="search_bar me-3 d-flex align-items-center">
              <input
                type="search"
                v-model="filmSearched"
                name="film_search"
                id="film_search"
              />
              <button class="btn_search" type="button" @click="callApi">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Component -->
    <main class="wrapper p-3">
      <div class="container-fluid p-3">
        <section class="movies">
          <div class="movie_nav">
            <h2>{{ movies.sectionTitle }}</h2>
            <button @click="cutMovie">Indietro</button>
            <button @click="addMovie">Avanti</button>
          </div>

          <div class="row mt-1 g-3">
            <div
              class="col_10"
              v-for="(movie, index) in movies"
              :key="movie.id + index"
            >
              <div class="card_movie">
                <div class="poster" @click="zoomInMovie(index)">
                  <img
                    class="poster_img"
                    :src="getPoster(movie)"
                    :alt="movie.title"
                  />
                </div>

                <div
                  class="movie_details movie_banner_details"
                  @click="zoomInMovie(index)"
                  @mouseleave="zoomOutMovie"
                  @dblclick="zoomOutMovie"
                  :class="isZoomedMovie === index ? 'active' : 'd-none'"
                >
                  <div class="movie_title">
                    <h5>{{ movie.title }}</h5>
                  </div>
                  <div class="d-flex">
                    <div>
                      <img :src="getPoster(movie)" :alt="movie.title" />
                    </div>
                    <div class="movie_ratings ms-2">
                      <font-awesome-icon
                        class="text-warning"
                        v-for="n in ratingToStars(movie)"
                        :key="n"
                        icon="fa-solid fa-star"
                      />
                      <img
                        class="flag ms-2"
                        :src="renderFlag(movie)"
                        @error="setAlternativeImg"
                        alt=""
                      />
                      <ul>
                        <li
                          v-for="actor in creditsFilms[index]"
                          :key="actor.name"
                        >
                          {{ actor.name }}
                        </li>
                      </ul>
                    </div>
                  </div>

                  <!-- <p>{{ movie.original_title }}</p> -->
                  <div class="movie_overview">
                    <p>{{ movie.overview }}</p>
                  </div>
                </div>

                <div
                  class="movie_details movie_card_details"
                  @click="zoomInMovie(index)"
                  :class="isZoomedMovie === index ? '' : 'd-block'"
                >
                  <div class="movie_title">
                    <h5>{{ movie.title }}</h5>
                  </div>
                  <div class="movie_ratings">
                    <font-awesome-icon
                      class="text-warning"
                      v-for="n in ratingToStars(movie)"
                      :key="n"
                      icon="fa-solid fa-star"
                    />
                    <img
                      class="flag ms-2"
                      :src="renderFlag(movie)"
                      @error="setAlternativeImg"
                      alt=""
                    />
                  </div>

                  <!-- <p>{{ movie.original_title }}</p> -->
                  <div class="movie_overview">
                    <p>{{ movie.overview }}</p>
                    <ul>
                      <li
                        v-for="actor in creditsFilms[index]"
                        :key="actor.name"
                      >
                        {{ actor.name }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="series mt-3">
          <div class="series_nav">
            <h2>{{ series.sectionTitle }}</h2>
            <button @click="cutSerie">Indietro</button>
            <button @click="addSerie">Avanti</button>
          </div>

          <div class="row g-3">
            <div
              class="col_10 series_poster"
              v-for="(serie, index) in series"
              :key="serie.id"
            >
              <div class="card_series">
                <div class="poster" @click="zoomInSerie(index)">
                  <img
                    class="poster_img"
                    :src="getPoster(serie)"
                    :alt="serie.title"
                  />
                </div>

                <div
                  class="serie_banner"
                  @click="zoomInSerie(index)"
                  @mouseleave="zoomOutSerie"
                  @dblclick="zoomOutSerie"
                  :class="isZoomedSerie === index ? 'active' : 'd-none'"
                >
                  <h4>{{ serie.name }}</h4>
                  <!--  <p>{{ serie.original_name }}</p> -->
                  <div class="d-flex">
                    <div>
                      <img :src="getPoster(serie)" :alt="serie.title" />
                    </div>
                    <div class="serie_ratings ms-2">
                      <font-awesome-icon
                        class="text-warning"
                        v-for="n in ratingToStars(serie)"
                        :key="n"
                        icon="fa-solid fa-star"
                      />
                      <img
                        class="flag ms-2"
                        :src="renderFlag(serie)"
                        @error="setAlternativeImg"
                        alt=""
                      />
                      <ul>
                        <li
                          v-for="actor in creditsFilms[index]"
                          :key="actor.name"
                        >
                          {{ actor.name }}
                        </li>
                      </ul>
                    </div>
                  </div>
               
                  <div class="series_overview">
                    <p>{{ serie.overview }}</p>
                  </div>
                </div>

                <div
                  class="serie_details"
                  @click="zoomInSerie(index)"
                  :class="isZoomedSerie === index ? '' : 'd-block'"
                >
                  <h4>{{ serie.name }}</h4>
                  <!--  <p>{{ serie.original_name }}</p> -->
                  <div class="series_rating">
                    <font-awesome-icon
                      class="text-warning"
                      v-for="n in ratingToStars(serie)"
                      :key="n"
                      icon="fa-solid fa-star"
                    />
                    <img
                      class="flag ms-2"
                      :src="renderFlag(serie)"
                      @error="setAlternativeImg"
                      :alt="serie.title"
                    />
                  </div>
                  <div class="series_overview">
                    <p>{{ serie.overview }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
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
      creditsMovieApi:
        "https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=d5fefff0eb8a3f597dfd660cee438f0e&language=en-US",
      creditsSerieApi:
        "https://api.themoviedb.org/3/tv/{tv_id}/season/{season_number}/credits?api_key=d5fefff0eb8a3f597dfd660cee438f0e&language=en-US",

      movies: [],
      series: [],
      countryFlag: "https://countryflagsapi.com/png/",
      posterSize: "w154/",
      stars: [],
      isZoomedMovie: false,
      isZoomedSerie: false,
      creditsFilms: [],
      creditsSeries: [],
      leftMovies: [],
      leftSeries: [],
    };
  },
  methods: {
    callApi() {
      if (this.filmSearched !== "") {
        /* Get Searched Movies */
        let moviesUrl = `${this.searchMovieApi}&query=${this.filmSearched}`;
        axios.get(moviesUrl).then((movie) => {
          this.movies = movie.data.results;
          this.movies.sectionTitle = "Films";

          return this.movies.forEach((movie) => {
            let moviesCreditsUrl = `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=d5fefff0eb8a3f597dfd660cee438f0e&language=en-US`;
            axios.get(moviesCreditsUrl).then((credits) => {
              this.creditsFilms.push(credits.data.cast.slice(0, 3));
            });
          });
        });

        /* Get Searched Movies */
        let seriesUrl = `${this.searchSeriesApi}&query=${this.filmSearched}`;
        axios.get(seriesUrl).then((movie) => {
          this.series = movie.data.results;
          this.series.sectionTitle = "TV Series";

          return this.series.forEach((serie) => {
            let seriesCreditsUrl = `https://api.themoviedb.org/3/tv/${serie.id}/season/1/credits?api_key=d5fefff0eb8a3f597dfd660cee438f0e&language=en-US`;
            axios.get(seriesCreditsUrl).then((credits) => {
              this.creditsSeries.push(credits.data);
            });
            return this.series;
          });
        });
      }
    },
    renderFlag(movie_serie) {
      if (movie_serie.original_language === "en") {
        let flag = this.countryFlag + "gb";
        return flag;
      } else if (movie_serie.original_language === "ja") {
        let flag = this.countryFlag + "jp";
        return flag;
      } else if (movie_serie.original_language === "zh") {
        let flag = this.countryFlag + "cn";
        return flag;
      } else if (movie_serie.original_language === "ko") {
        let flag = this.countryFlag + "kr";
        return flag;
      } else {
        let flag = this.countryFlag + movie_serie.original_language;
        return flag;
      }
    },
    setAlternativeImg(event) {
      return (event.target.src =
        "https://upload.wikimedia.org/wikipedia/commons/d/d4/World_Flag_%282004%29.svg");
    },
    getPoster(movie_serie) {
      let movieDBUrl = "https://image.tmdb.org/t/p/";
      if (movie_serie.poster_path !== null) {
        let poster = movieDBUrl + this.posterSize + movie_serie.poster_path;
        return poster;
      } else {
        /* Set Alternative Poster */
        return "https://publications.iarc.fr/uploads/media/default/0001/02/thumb_1196_default_publication.jpeg";
      }
    },
    ratingToStars(movie_serie) {
      let movieStars = Math.ceil(movie_serie.vote_average / 2);
      this.stars.length = movieStars;
      return this.stars;
    },
    zoomInMovie(index) {
      this.isZoomedMovie = index;
    },
    zoomOutMovie() {
      this.isZoomedMovie = false;
    },
    zoomInSerie(index) {
      this.isZoomedSerie = index;
    },
    zoomOutSerie() {
      this.isZoomedSerie = false;
    },

    addMovie() {
      if (this.movies.length > 1) {
        this.leftMovies.push(this.movies[0]);
        this.movies.splice(0, 1);
      }
    },
    cutMovie() {
      if (this.leftMovies.length > 0) {
        this.movies.unshift(this.leftMovies[0]);
        this.leftMovies.splice(0, 1);
      }
    },
    addSerie() {
      if (this.series.length > 1) {
        this.leftSeries.push(this.series[0]);
        this.series.splice(0, 1);
      }
    },
    cutSerie() {
      if (this.leftSeries.length > 0) {
        this.series.unshift(this.leftSeries[0]);
        this.leftSeries.splice(0, 1);
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/style.scss";

header {
  background-color: $nf-background-primary;
  height: 100px;

  .container-fluid {
    height: 100%;
    .logo {
      width: 150px;
    }
    #film_search {
      height: 2.3rem;
      border-radius: 2px;
      border: none;
      padding: 2px 0.2rem;
      min-width: 15rem;
    }
    .btn_search {
      height: 2.3rem;
      border: none;
      padding: 2px 9px;
      border-radius: 3px;

      margin-left: 2px;
    }
  }
}
main {
  position: relative;
  background-color: $nf-background-primary;
  color: $nf-text-secondary;
  min-height: calc(100vh - 100px);
  .row {
    flex-wrap: nowrap;
    overflow: hidden;

    .col_10 {
      width: calc(100% / 10);
      min-width: 200px;
      .card_movie {
        height: 330px;

        .poster {
          text-align: center;
          height: 100%;
          img {
            height: 100%;
            width: 100%;
            object-fit: cover;
          }
        }
        .movie_details,
        .movie_banner {
          padding-bottom: 5px;
          max-height: 330px;
          overflow: auto;
          text-overflow: ellipsis;
        }
      }

      .card_movie:hover .poster {
        display: none;
      }

      .card_series {
        height: 330px;
        .poster {
          height: 100%;
          text-align: center;
          img {
            height: 100%;
            width: 100%;
            object-fit: cover;
          }
        }
        .serie_details,
        .serie_banner {
          max-height: 330px;
          text-overflow: ellipsis;
          overflow-y: auto;
          padding-bottom: 5px;
        }
      }

      .card_series:hover .poster {
        display: none;
      }

      .flag {
        max-width: 30px;
      }
    }
    .active {
      z-index: 5;
      display: block;
      overflow: visible;
      position: absolute;
      border-radius: 10px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 1.5rem;
      width: 30%;
      background: black;
      min-height: 330px;
      max-height: unset;
      font-size: 1.5rem;
    }
  }
}
</style>
