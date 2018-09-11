import Chart from 'chart.js'
import axios from 'axios'
import { options } from '../../src/teams/chart_options.js'

class ChartCreator {
  constructor({ options }) {
    this.datasets = []
    this.options = options
  }

  static getTeamId(url) {
    return parseInt(url.split('/').slice(-1)[0])
  }


  async getFirstMarketData({ teamId, firstMarket }) {
    const response = await axios.get(`/api/v1/teams/${teamId}/first_markets/${firstMarket}`)
    const data = this.toPercentage(this.getAverage(response.data))

    console.log({ label: 'c9', data, fill: false })
    this.datasets.push({ label: 'c9', data, fill: false })
  }

  getAverage(data) {
    return data.map((x, idx) => ({
      gameNum: idx + 1,
      runningWins: data
      .slice(0, idx+1)
      .reduce((acc, currVal) => {
        return currVal.val ?  acc += 1 : acc
      }, 0)
    }))
  }

  toPercentage(average) {
    return average.map(({ gameNum, runningWins }, idx) => { 
      return {
        x: gameNum - 1,
        y: (runningWins/gameNum) * 100
      } 
    })
  }

  createChart({ ctx }) {
    console.log('create', this.datasets)
    new Chart(ctx, {
      type: 'line',
      data: {
        datasets: this.datasets 
      },
      options: this.options
    })
  }

  static setOpponentSelectListener() {
    const select = document.getElementById('opponent')
    select.addEventListener('change', async (e) => {
      const teamId = e.target.value
      const response = await getFirstMarketData({ teamId, firstMarket: 'first_blood' })
      const data = toPercentage(getAverage(response.data))
      window.chart.data.datasets.push({
        label: 'team',
        data,
        fill: false
      })
      window.chart.update()
    })
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  ChartCreator.setOpponentSelectListener()

  const ctx = document.getElementById('chart').getContext('2d')
  const teamId = ChartCreator.getTeamId(location.pathname)

  const firstMarketChart = new ChartCreator({ options })
  await firstMarketChart.getFirstMarketData({ teamId, firstMarket: 'first_blood' })

  firstMarketChart.createChart({ ctx })
})
