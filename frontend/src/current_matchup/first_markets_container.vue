<template>
  <div class="chart">
    <canvas :id="chartId" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Chart from 'chart.js'
import { options } from '../teams/chart_options'
import { rgbFromStringHash } from '../utils'

export default Vue.extend({
  name: 'FirstMarketContainer',

  props: {
    market: {
      type: String,
      required: true
    },

    games: {
      type: Array as () => Array<Object>,
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
      dataset: {}
    }
  },

  mounted() {
    this.updateChart()
  },

  watch: {
    games (val) {
      this.updateChart()
    },

    teamId (val: number) {
      this.updateChart()
    }
  },

  methods: {
    createCanvas(): HTMLCanvasElement {
      const canvas = document.createElement('canvas')
      canvas.setAttribute('id', this.chartId)
      return canvas
    },

    resetChart(): void {
      // destroy <canvas> and recreate
      if (this.$el.querySelector(`#${this.chartId}`)) {
        const chart = this.$el.querySelector(`#${this.chartId}`) as Element
        this.$el.removeChild(chart)
      }
      
      this.$el.appendChild(this.createCanvas())
    },

    async updateChart() {
      const runningAverage = this.getAverageForMarket(this.market)
      this.dataset = {
        label: this.teamName,
        data: this.generateDataset(runningAverage.map(x => x * 100)),
        borderColor: await rgbFromStringHash(this.teamName),
        fill: false,
      }
      // @ts-ignore
      this.drawChart()
    },

    drawChart(): void {
      // @ts-ignore
      this.resetChart()
      // @ts-ignore
      const ctx: HTMLCanvasElement = this.$el.querySelector('#' + this.chartId) as HTMLCanvasElement
      new Chart(ctx, {
        type: 'line',
        // @ts-ignore
        options: options({ title: `% First ${this.market}` }),
        data: {
          datasets: [this.dataset],
        }
      })
    },

    generateDataset(data: number[]): object[] {
      return data.map((y: number, idx: number) => ({ x: idx, y }))
    },

    getAverageForMarket(market: string): number[] {
      const fbs = this.games
        .filter(game => (game.winnerId && game.loserId))
        .map(x => x[`first${market}TeamId`] == this.teamId ? 1 : 0)

      let i = 0
      return fbs.map(x => {
        i = i + 1
        const snapshot = fbs.slice(0, i) as number[]
        const total: number = snapshot.reduce((a, c) => a + c)
        const div = total / i
        return parseFloat(div.toFixed(2))
      })
    }
  },

  computed: {
    chartId(): string {
      return `${this.side}_chart`
    }
  }
})
</script>

<style scoped>
.chart {
  width: 180px;
}
</style>
