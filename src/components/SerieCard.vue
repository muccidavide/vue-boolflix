<template>
  <div class="nf_card">
    <div class="poster" @click="zoomInSerie(index)">
      <img class="poster_img" :src="getPoster(serie)" :alt="serie.title" />
    </div>
    <!-- /.poster -->

    <div
      class="card_banner"
      @click="zoomInSerie(index)"
      @mouseleave="zoomOutSerie"
      @dblclick="zoomOutSerie"
      :class="isZoomedSerie(index) ? 'active' : 'd-none'"
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
        <div v-if="genresSeries(index).length > 0" class="genres ms-3">
          <h5 class="fs-3">Genres:</h5>
          <ul>
            <li class="fs-5" v-for="genre in genresSeries(index)" :key="genre">
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
      :class="isZoomedSerie(index) ? '' : 'd-block'"
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
      <div v-if="genresSeries(index).length > 0" class="genres my-2">
        <h5>Genres:</h5>
        <ul>
          <li class="fs-5" v-for="genre in genresSeries(index)" :key="genre">
            {{ genre }}
          </li>
        </ul>
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
</template>

<script>
import state from "@/state";
export default {
  name: "SerieCard",
  props: {
    index: Number,
    serie: Object,
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
  },
};
</script>

<style lang='scss' scoped>
</style>