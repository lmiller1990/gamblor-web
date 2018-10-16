import Vue from 'vue/dist/vue.esm.js'
import { processData, postOdds } from '../../src/admin/odds_scraper.js'

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',

    data() {
      return {
        posting: false,
        market: 'fb',
        teamsAndOdds: '',
        odds: []
      }
    },

    methods: {
      postOdds() {
        postOdds(this.odds)
      },

      processData() { 
        this.odds = processData(this.market, this.teamsAndOdds) 
      }
    }
  })
})
