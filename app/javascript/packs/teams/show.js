import Chart from 'chart.js'
import axios from 'axios'

function getTeamId(url) {
  return parseInt(url.split('/').slice(-1)[0])
}

function getFirstMarketData({ teamId, firstMarket }) {
  return axios.get(`/api/v1/teams/${teamId}/first_markets/${firstMarket}`)
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

document.addEventListener('DOMContentLoaded', async () => {
  const ctx = document.getElementById('chart').getContext('2d')
  const teamId = getTeamId(location.pathname)

  const response = await getFirstMarketData({ teamId, firstMarket: 'first_blood' })

  const data = toPercentage(getAverage(response.data))
  console.log(data)

  new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [
        { 
          label: 'c9',
          data,
          fill: false,
        } 
      ]
    },
    options: {
      scales: {
        xAxes: [{
          type: 'linear',
          display: true,
          ticks: {
            min: 0,
            steps: 1,
            max: 10,
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            suggestedMax: 100
          }
        }]
      }
    }
  })
})
