<template>
  <main class="wrapper p-3">
    <div class="container-fluid p-3">
      <section class="movies" v-if="filterMovie.length > 0">
        <div class="movie_nav d-flex justify-content-between align-item-center">
          <div class="section_header">
            <h2>Movies</h2>
          </div>

          <div class="btn_slider">
            <button @click="cutMovie">Previous</button>
            <button class="ms-2" @click="addMovie">Next</button>
          </div>
        </div>
        <!-- /.movie_nav -->

        <div class="row mt-1 g-3">
          <MovieCard
            class="col_10"
            :movie="movie"
            :index="index"
            v-for="(movie, index) in filterMovie"
            :key="index"
          >
          </MovieCard>
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
            <button @click="cutSerie">Previous</button>
            <button class="ms-2" @click="addSerie">Next</button>
          </div>
        </div>
        <!-- /.series_nav -->

        <div class="row g-3 mt-1">
          <SerieCard
            class="col_10"
            :index="index"
            :serie="serie"
            v-for="(serie, index) in filterSerie"
            :key="serie.id"
          >
          </SerieCard>
        </div>
      </section>

      <div
        class="position-absolute search_banner text-center"
        v-if="filterSerie.length === 0 && filterMovie.length === 0"
      >
      <LogoSite class="m-auto mb-0 w-75 logo_site"></LogoSite>
        <h2>Search a film or a serie Tv</h2>
        <h3>Over A milion of Movies, Anime, Serie Tv and Documentary</h3>

        
      </div>

      <!-- /Section Movies -->
    </div>
  </main>
</template>

<script>
import state from "@/state";
import MovieCard from "@/components/MovieCard.vue";
import SerieCard from "@/components/SerieCard.vue";
import LogoSite from "@/components/LogoSite.vue";
export default {
  name: "SiteMain",
  components: {
    MovieCard,
    SerieCard,
    LogoSite
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
  mounted() {},
};
</script>

<style lang='scss'>
main {
  position: relative;
  background-color: $nf-background-primary;
  color: $nf-text-secondary;
  min-height: calc(100vh - 100px);
  button {
    border: 1px solid white;
    width: 100px;
    font-size: 1.5rem;
  }
  .logo_site{ 
    height: 20%;
    max-height: 300px;
}
  .row {
    flex-wrap: nowrap;
    overflow: hidden;

    .col_10 {
      width: calc(100% / 8);
      min-width: 200px;
    }
  }

  .search_banner {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>