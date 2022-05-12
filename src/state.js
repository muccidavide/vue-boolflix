/* src/state.js */
// Importa Vue
import Vue from 'vue'
// crea un oggetto usando .observable
const state = Vue.observable({
    movies:[],
    series:[],
    selectedGenre:"All",
    creditsFilms: [],
    creditsSeries: [],
    genresMovies: [],
    genresSeries: [],
    isZoomedMovie:false,
    isZoomedSerie:false,
})
// esporta lo state
export default state