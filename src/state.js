/* src/state.js */
// Importa Vue
import Vue from 'vue'
// crea un oggetto usando .observable
const state = Vue.observable({
    searchText: ''
})
// esporta lo state
export default state