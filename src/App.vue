<template>
  <div id="app">
    <header>
      <div class="container-fluid">
        <div class="row">
          <div class="col">
            <div class="logo">
              <img src="./assets/img/netflix_logo_1.webp" alt="netflix logo" />
            </div>
          </div>
          <div class="col d-flex align-items-center justify-content-end">
            <div class="search_bar me-3">
              <input
                type="search"
                v-model="filmSearched"
                name="film_search"
                id="film_search"
              />
              <button type="button" @click="callApi">Search</button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Component -->
    <main class="wrapper p-3">
      <div class="container-fluid p-3">
        <section class="movies">
          <h2>{{ movies.sectionTitle }}</h2>
          <div class="row mt-1 g-3">
            <div class="col_10" v-for="movie in movies" :key="movie.id">
              <div class="card_movie">
                <div class="poster">
                  <img
                    class="poster_img"
                    :src="getPoster(movie)"
                    :alt="movie.title"
                  />
                </div>

                <div class="movie_details">
                  <h4>{{ movie.title }}</h4>

                  <p>{{ movie.original_title }}</p>
                  <p>{{ movie.original_language }}</p>
                  <font-awesome-icon
                    v-for="n in ratingToStars(movie)"
                    :key="n"
                    icon="fa-solid fa-star"
                  />
                  <img
                    class="flag"
                    :src="renderFlag(movie)"
                    @error="setAlternativeImg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="series mt-3">
          <h2>{{ series.sectionTitle }}</h2>
          <div class="row g-3">
            <div
              class="col_10 series_poster"
              v-for="serie in series"
              :key="serie.id"
            >
              <div class="card_series">
                <div class="poster">
                  <img
                    class="poster_img"
                    :src="getPoster(serie)"
                    :alt="serie.title"
                  />
                </div>
                <div class="series_details">
                  <h4>{{ serie.name }}</h4>
                  <p>{{ serie.original_name }}</p>
                  <p>{{ serie.original_language }}</p>
                  <font-awesome-icon
                    v-for="n in ratingToStars(serie)"
                    :key="n"
                    icon="fa-solid fa-star"
                  />
                  <img
                    class="flag"
                    :src="renderFlag(serie)"
                    @error="setAlternativeImg"
                    :alt="serie.title"
                  />
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

      movies: [],
      series: [],
      countryFlag: "https://countryflagsapi.com/png/",
      posterSize: "w154/",
      stars: [],
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
          return this.movies;
        });
        /* Get Searched Movies */
        let seriesUrl = `${this.searchSeriesApi}&query=${this.filmSearched}`;
        axios.get(seriesUrl).then((movie) => {
          this.series = movie.data.results;
          this.series.sectionTitle = "TV Series";
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
    displayInfo(index) {
      this.movies[index].active = false;
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/style.scss";

header {
  background-color: $nf-background-primary;
  .logo {
    width: 130px;
  }
}
main {
  background-color: $nf-background-primary;
  color: $nf-text-secondary;
  .col_10 {
    width: calc(100% / 10);
    .card_movie {
      height: 100%;
      .poster {
        text-align: center;
        height: 100%;
        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }
      }
      .movie_details {
        display: none;
      }
    }
    .card_movie:hover .movie_details {
      display: block;
    }

    .card_movie:hover .poster {
      display: none;
    }

    .card_series {
      height: 100%;
      .poster {
        text-align: center;
        height: 100%;
        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }
      }
      .series_details {
        display: none;
      }
    }

    .card_series:hover .series_details {
      display: block;
    }
        .card_series:hover .poster {
      display: none;
    }

    .flag {
      max-width: 50px;
    }
  }
}
</style>
