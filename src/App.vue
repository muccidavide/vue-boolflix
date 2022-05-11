<template>
  <div id="app">
    <header>
      <div class="container-fluid align-items-center">
        <div class="row h-100">
          <div class="col d-flex align-items-center">
            <LogoSite></LogoSite>
          </div>
          <div class="col d-flex align-items-center justify-content-end">
            <SearchBar></SearchBar>

            <!-- /.search_bar -->
          </div>
        </div>
      </div>
    </header>
    <!-- /Header -->

    <main class="wrapper p-3">
      <div class="container-fluid p-3">
        <section class="movies" v-if="filterMovie.length > 0">
          <div
            class="movie_nav d-flex justify-content-between align-item-center"
          >
            <div class="section_header">
              <h2>Movies</h2>
            </div>

            <div class="btn_slider">
              <button @click="cutMovie">Indietro</button>
              <button class="ms-2" @click="addMovie">Avanti</button>
            </div>
          </div>
          <!-- /.movie_nav -->

          <div class="row mt-1 g-3">
            <div
              class="col_10"
              v-for="(movie, index) in filterMovie"
              :key="index"
            >
              <div class="nf_card">
                <div class="poster" @click="zoomInMovie(index)">
                  <img
                    class="poster_img"
                    :src="getPoster(movie)"
                    :alt="movie.title"
                  />
                </div>
                <!-- /.poster -->

                <div
                  class="card_banner"
                  @click="zoomInMovie(index)"
                  @mouseleave="zoomOutMovie"
                  @dblclick="zoomOutMovie"
                  :class="isZoomedMovie === index ? 'active' : 'd-none'"
                >
                  <div class="title">
                    <h3>{{ movie.title }}</h3>
                  </div>
                  <div class="d-flex mb-2 align-items-start">
                    <div>
                      <img :src="getPoster(movie)" :alt="movie.title" />
                    </div>
                    <div class="ratings ms-2">
                      <font-awesome-icon
                        class="text-warning fs-5"
                        v-for="(n, index) in ratingToStars(movie)"
                        :key="'C' + n + index"
                        icon="fa-solid fa-star"
                      />
                      <img
                        class="flag my-2 d-block"
                        :src="renderFlag(movie)"
                        @error="setAlternativeImg"
                        alt=""
                      />
                      <ul>
                        <li
                          class="fs-5"
                          v-for="(actor, index) in creditsFilms(index)"
                          :key="index"
                        >
                          {{ actor.name }}
                        </li>
                      </ul>
                    </div>
                    <div class="genres ms-3">
                      <h5 class="fs-3">Genres:</h5>
                      <ul>
                        <li
                          class="fs-5"
                          v-for="genre in genresMovies(index)"
                          :key="genre"
                        >
                          {{ genre }}
                        </li>
                      </ul>
                    </div>
                  </div>

                  <!-- <p>{{ movie.original_title }}</p> -->
                  <div class="overview">
                    <p>{{ movie.overview }}</p>
                  </div>
                </div>
                <!-- /.card_banner -->

                <div
                  class="details movie_card_details"
                  @click="zoomInMovie(index)"
                  :class="isZoomedMovie === index ? '' : 'd-block'"
                >
                  <div class="title">
                    <h3>{{ movie.title }}</h3>
                  </div>
                  <div class="ratings">
                    <font-awesome-icon
                      class="text-warning fs-5"
                      v-for="(n, index) in ratingToStars(movie)"
                      :key="index"
                      icon="fa-solid fa-star"
                    />
                    <img
                      class="flag ms-2"
                      :src="renderFlag(movie)"
                      @error="setAlternativeImg"
                      alt=""
                    />
                  </div>

                  <div class="genres my-2">
                    <h5>Genres:</h5>
                    <ul>
                      <li v-for="genre in genresMovies(index)" :key="genre">
                        {{ genre }}
                      </li>
                    </ul>
                  </div>

                  <!-- <p>{{ movie.original_title }}</p> -->
                  <div class="overview">
                    <p>{{ movie.overview }}</p>
                    <ul>
                      <li
                        v-for="actor in creditsFilms(index)"
                        :key="actor.name"
                      >
                        {{ actor.name }}
                      </li>
                    </ul>
                  </div>
                </div>
                <!-- /.movie_card_details -->
              </div>
              <!-- /.card_movie -->
            </div>
          </div>
        </section>
        <!-- /Section Movies -->

        <section class="series mt-3" v-if="filterSerie.length > 0">
          <div
            class="series_nav d-flex justify-content-between align-item-center"
          >
            <div class="section_header">
              <h2>Serie Tv</h2>
            </div>
            <div class="btn_slider">
              <button @click="cutSerie">Indietro</button>
              <button class="ms-2" @click="addSerie">Avanti</button>
            </div>
          </div>
          <!-- /.series_nav -->

          <div class="row g-3">
            <div
              class="col_10"
              v-for="(serie, index) in filterSerie"
              :key="serie.id"
            >
              <div class="nf_card">
                <div class="poster" @click="zoomInSerie(index)">
                  <img
                    class="poster_img"
                    :src="getPoster(serie)"
                    :alt="serie.title"
                  />
                </div>
                <!-- /.poster -->

                <div
                  class="card_banner"
                  @click="zoomInSerie(index)"
                  @mouseleave="zoomOutSerie"
                  @dblclick="zoomOutSerie"
                  :class="isZoomedSerie === index ? 'active' : 'd-none'"
                >
                  <h3 class="fs-1">{{ serie.name }}</h3>
                  <!--  <p>{{ serie.original_name }}</p> -->
                  <div class="d-flex mb-2">
                    <div>
                      <img :src="getPoster(serie)" :alt="serie.title" />
                    </div>
                    <div class="ratings ms-2">
                      <font-awesome-icon
                        class="text-warning fs-5"
                        v-for="n in ratingToStars(serie)"
                        :key="n"
                        icon="fa-solid fa-star"
                      />
                      <img
                        class="flag d-block"
                        :src="renderFlag(serie)"
                        @error="setAlternativeImg"
                        alt=""
                      />
                      <ul>
                        <li
                          class="fs-5"
                          v-for="actor in creditsSeries(index)"
                          :key="actor.name"
                        >
                          {{ actor.name }}
                        </li>
                      </ul>
                    </div>
                    <div class="genres ms-3">
                      <h5 class="fs-3">Genres:</h5>
                      <ul>
                        <li
                          class="fs-5"
                          v-for="genre in genresSeries(index)"
                          :key="genre"
                        >
                          {{ genre }}
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div class="overview">
                    <p>{{ serie.overview }}</p>
                  </div>
                </div>
                <!-- /.card_banner -->
                <div
                  class="details"
                  @click="zoomInSerie(index)"
                  :class="isZoomedSerie === index ? '' : 'd-block'"
                >
                  <h3>{{ serie.name }}</h3>
                  <!--  <p>{{ serie.original_name }}</p> -->
                  <div class="rating">
                    <font-awesome-icon
                      class="text-warning fs-5"
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
                  <div class="overview">
                    <p>{{ serie.overview }}</p>
                  </div>

                  <ul>
                    <li v-for="actor in creditsSeries(index)" :key="actor.name">
                      {{ actor.name }}
                    </li>
                  </ul>
                </div>
                <!-- /.details -->
              </div>
              <!-- /.card_serie -->
            </div>
          </div>
        </section>

        <!-- /Section Movies -->
      </div>
    </main>
    <!-- /Main Component -->
  </div>
</template>

<script>
import state from "@/state";
import LogoSite from "@/components/LogoSite.vue";
import SearchBar from "@/components/SearchBar.vue";

export default {
  name: "App",
  components: {
    LogoSite,
    SearchBar,
  },
  data() {
    return {
      countryFlag: "https://countryflagsapi.com/png/",
      posterSize: "w154/",
      stars: [],
      isZoomedMovie: false,
      isZoomedSerie: false,
      leftMovies: [],
      leftSeries: [],
    };
  },
  methods: {
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
      this.isZoomedSerie = false;
      this.isZoomedMovie = index;
    },
    zoomOutMovie() {
      this.isZoomedMovie = false;
    },
    zoomInSerie(index) {
      this.isZoomedMovie = false;
      this.isZoomedSerie = index;
    },
    zoomOutSerie() {
      this.isZoomedSerie = false;
    },

    addMovie() {
      if (state.movies.length > 1) {
        this.leftMovies.push(state.movies[0]);
        state.movies.splice(0, 1);
      }
    },
    cutMovie() {
      if (this.leftMovies.length > 0) {
        state.movies.unshift(this.leftMovies[0]);
        this.leftMovies.splice(0, 1);
      }
    },
    addSerie() {
      if (state.series.length > 1) {
        this.leftSeries.push(state.series[0]);
        state.series.splice(0, 1);
      }
    },
    cutSerie() {
      if (this.leftSeries.length > 0) {
        state.series.unshift(this.leftSeries[0]);
        this.leftSeries.splice(0, 1);
      }
    },
    creditsFilms(index) {
      return state.creditsFilms[index];
    },
    creditsSeries(index) {
      return state.creditsSeries[index];
    },
    genresMovies(index) {
      return state.genresMovies[index];
    },
    genresSeries(index) {
      return state.genresSeries[index];
    },
  },
  computed: {
    filterMovie() {
      if (state.selectedGenre === "All") {
        return state.movies;
      } else {
        return state.movies.filter((movie) => {
          return movie.genre_ids.includes(state.selectedGenre);
        });
      }
    },

    filterSerie() {
      if (state.selectedGenre === "All") {
        return state.series;
      } else {
        return state.series.filter((serie) => {
          
          return serie.genre_ids.includes(state.selectedGenre);
        });
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
      position: absolute;
      left: -20px;
      top: 0;
      transform: translate(-100%, 4px);
      padding: 2px 0.2rem;
      .select_genre {
        width: 200px;
      }
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
      width: calc(100% / 8);
      min-width: 200px;

      .nf_card {
        height: 400px;

        .poster {
          text-align: center;
          height: 100%;
          img {
            height: 100%;
            width: 100%;
            object-fit: cover;
          }
        }
        .details,
        .card_banner {
          padding-bottom: 5px;
          overflow: auto;
          text-overflow: ellipsis;
          max-height: 400px;
          .flag {
            max-width: 30px;
          }
        }
        .details {
          font-size: 1.2rem;
        }
        .card_banner {
          width: 40%;
          font-size: 1.5rem;
        }
      }

      .nf_card:hover .poster {
        display: none;
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
      background: rgba(0, 0, 0, 0.885);
      min-height: 60vh;
      max-height: unset;
      font-size: 1.5rem;
    }
  }
}
</style>
