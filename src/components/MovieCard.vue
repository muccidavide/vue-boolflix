<template>
  <div class="nf_card">
    <div class="poster" @click="zoomInMovie(index)">
      <img class="poster_img" :src="getPoster(movie)" :alt="movie.title" />
    </div>
    <!-- /.poster -->

    <div
      class="card_banner"
      @dblclick="zoomOutMovie"
      :class="isZoomedMovie(index) ? 'active' : 'd-none'"
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
        <div v-if="genresMovies(index).length > 0" class="genres ms-3">
          <h5 class="fs-3">Genres:</h5>
          <ul>
            <li class="fs-5" v-for="genre in genresMovies(index)" :key="genre">
              {{ genre }}
            </li>
          </ul>
        </div>
      </div>

      <!-- <p>{{ movie.original_title }}</p> -->
      <div class="overview">
        <p>{{ movie.overview }}</p>
      </div>
      <div class="cross_btn">
        <button @click="zoomOutMovie">Close</button>
      </div>
    </div>
    <!-- /.card_banner -->

    <div
      class="details movie_card_details"
      @click="zoomInMovie(index)"
      :class="isZoomedMovie(index) ? '' : 'd-block'"
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

      <div v-if="genresMovies(index).length > 0" class="genres my-2">
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
          <li v-for="actor in creditsFilms(index)" :key="actor.name">
            {{ actor.name }}
          </li>
        </ul>
      </div>
    </div>
    <!-- /.movie_card_details -->
  </div>
  <!-- /.card_movie -->
</template>

<script>
import state from "@/state";
export default {
  name: "MovieCard",
  props: {
    index: Number,
    movie: Object,
  },
  data() {
    return {
      countryFlag: "https://countryflagsapi.com/png/",
      posterSize: "w154/",
      stars: [],
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
    zoomInMovie(index) {
      state.isZoomedSerie = false;
      state.isZoomedMovie = false;
      state.isZoomedMovie = index;
    },
    zoomOutMovie() {
      state.isZoomedMovie = false;
    },
    zoomInSerie(index) {
      state.isZoomedSerie = false;
      state.isZoomedMovie = false;
      state.isZoomedSerie = index;
    },
    zoomOutSerie() {
      state.isZoomedSerie = false;
    },
    isZoomedSerie(index) {
      return state.isZoomedSerie === index;
    },
    isZoomedMovie(index) {
      return state.isZoomedMovie === index;
    },
  },
};
</script>

<style lang='scss' scoped>
</style>