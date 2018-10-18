<template>
  <div class="chart">
    <canvas :id="chartId" />
  </div>
</template>

<script lang="ts">
import Chart from 'chart.js'
import { options } from '../teams/chart_options.js'
import { rgbFromStringHash } from '../utils.js'

export default {
  name: 'FirstMarketContainer',

  props: {
    market: {
      type: String,
      required: true
    },

    games: {
      type: Array,
      required: true
    },

    teamName: {
      type: String,
      required: true
    },

    teamId: {
      type: Number,
      required: true
    },

    side: {
      type: String,
      required: true
    },
  },

  data() {
    return {
      dataset: []
    }
  },

  mounted() {
    this.updateChart()
  },

  watch: {
    teamId (val) {
      this.updateChart()
    }
  },

  methods: {
    createCanvas() {
      const canvas = document.createElement('canvas')
      canvas.setAttribute('id', this.chartId)
      return canvas
    },

    resetChart() {
      // destroy <canvas> and recreate
      if (this.$el.querySelector(`#${this.chartId}`)) {
        this.$el.removeChild(this.$el.querySelector(`#${this.chartId}`))
      }
      
      this.$el.appendChild(this.createCanvas())
    },

    async updateChart() {
      const dataset = this.getAverageForMarket(this.market)
      this.dataset = {
        label: this.teamName,
        data: this.generateDataset(dataset.map(x => x * 100)),
        borderColor: await rgbFromStringHash(this.teamName),
        fill: false,
      }
      this.drawChart()
    },

    drawChart() {
      this.resetChart()
      const ctx = this.$el.querySelector('#' + this.chartId)
      new Chart(ctx, {
        type: 'line',
        options: options({ title: `% First ${this.market}` }),
        data: {
          datasets: [this.dataset],
        }
      })
    },


    generateDataset(data) {
      return data.map((y, idx) => ({ x: idx, y }))
    },

    getAverageForMarket(market) {
      const fbs = this.games
        .filter(game => (game.winnerId && game.loserId))
        .map(x => x[`first${market}TeamId`] == this.teamId ? 1 : 0)

      let i = 0
      return fbs.map(x => {
        i = i + 1
        const snapshot = fbs.slice(0, i)
        const total = snapshot.reduce((a, c) => (a + c))
        const div = total / i
        return parseFloat(div.toFixed(2))
      })
    }
  },

  computed: {
    chartId() {
      return `${this.side}_chart`
    }
  }
}
</script>

<style scoped>
.chart {
  width: 200px;
}
</style>
