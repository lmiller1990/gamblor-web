import axios from 'axios'

export function getAndProcessMarketData({ label, teamId, firstMarket, borderColor }) {
  return new Promise(async (resolve, reject) => {
    const response = await axios.get(`/api/v1/teams/${teamId}/first_markets/${firstMarket}`)
    const data = toPercentage(getAverage(response.data))

    resolve({ label, data, fill: false, borderColor })
  })
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
