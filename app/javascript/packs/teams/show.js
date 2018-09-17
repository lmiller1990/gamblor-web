import Chart from 'chart.js'
import axios from 'axios'
import { options } from '../../src/teams/chart_options.js'
import { rgbFromStringHash } from '../../src/utils.js'

class ChartCreator {
  constructor({ ctx, options, datasets }) {
    this.datasets = datasets
    this.options = options
    this.ctx = ctx
  }

  addDataset(dataset) {
    this.datasets.push(dataset)
    this.drawChart()
  }

  drawChart() {
    new Chart(this.ctx, {
      type: 'line',
      data: {
        datasets: this.datasets 
      },
      options: this.options
    })
  }
}

function getTeamId(url) {
  return parseInt(url.split('/').slice(-1)[0])
}

async function getAndProcessMarketData({ label, teamId, firstMarket, borderColor }) {
  const response = await axios.get(`/api/v1/teams/${teamId}/first_markets/${firstMarket}`)
  const data = toPercentage(getAverage(response.data))

  return { label, data, fill: false, borderColor }
}

function getAverage(data) {
  return data.map((x, idx) => ({
    gameNum: idx + 1,
    runningWins: data
    .slice(0, idx+1)
    .reduce((acc, currVal) => {
      return currVal.val ?  acc += 1 : acc
    }, 0)
  }))
}

function toPercentage(average) {
  return average.map(({ gameNum, runningWins }, idx) => { 
    return {
      x: gameNum - 1,
      y: (runningWins/gameNum) * 100
    } 
  })
}

function setOpponentSelectListener(opponents) {
  const select = document.getElementById('opponent')

  select.addEventListener('change', async (e) => {
    const teamId = e.target.value
    const label = id => opponents.find(x => x.id === parseInt(teamId)).name

    const dataset = await getAndProcessMarketData({ 
      label: label(teamId), 
      teamId, 
      firstMarket: 'first_blood',
      borderColor: await rgbFromStringHash(teamId)
    })

    window.firstMarketChart.addDataset(dataset)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  execute()
})


async function execute() {
  const currentTeamName = document.getElementById('team_name').getAttribute('data_team_name')
  const opponents = JSON.parse(document.getElementById('opponents').getAttribute('data_opponents'))

  setOpponentSelectListener(opponents)

  const ctx = document.getElementById('chart').getContext('2d')

  const teamId = getTeamId(location.pathname)
  const dataset = await getAndProcessMarketData({ 
    label: currentTeamName, 
    teamId, 
    firstMarket: 'first_blood',
    borderColor: await rgbFromStringHash(teamId)
  })

  window.firstMarketChart = new ChartCreator({ ctx, options, datasets: [dataset] })

  firstMarketChart.drawChart({ ctx })
}
