/* src/state.js */
// Importa Vue
import Vue from 'vue'
// crea un oggetto usando .observable
const state = Vue.observable({
    movies:[],
    series:[],
    selectedGenre:[],
    creditsFilms: [],
    creditsSeries: [],
    genresMovies: [],
    genresSeries: [],
})
// esporta lo state
export default state