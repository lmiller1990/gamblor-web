import Vue from 'vue/dist/vue.esm.js'
import axios from 'axios'

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',

    data() {
      return {
        scraping: false,
        markets: ['fb', 'fd', 'ft', 'fbaron']
      }
    },

    methods: {
      async getOdds(bookie) {
        const response = await axios.get(`/api/v1/scrapers?bookie=${bookie}&markets=${this.markets}`)
      },

      async scrapeOdds(bookie) {
        this.scraping = true
        await axios.post('/api/v1/scrapers', { bookie })
        this.scraping = false
      }
    }
  })
})
