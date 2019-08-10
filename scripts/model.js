// RGE  to get FB vs S04:      $30 | 2.10 | Win  | $63.00 | 60% | 33%

const fs = require('fs')

const extractData = d => {
  const fields = d.split(":")
  const market = fields[0].match(/(F(B|D|T|Baron))/)[0]
  const betData = fields[1].split("|")
  const staked = parseFloat(betData[0].replace("$", "").trim())
  const rewarded = parseFloat(betData[3].replace("$", "").trim())

  return {
    market,
    staked,
    rewarded,
  }
}

const data = fs.readFileSync("./bets.txt", "utf8")
  .split("\n")
  .filter(x => x.includes("Win") || x.includes("Lose"))
  .map(extractData)

const result = data.reduce((acc, curr) => {
  const d = {
    staked: acc.staked += curr.staked,
    rewarded: acc.rewarded += curr.rewarded,
  }

  return {
    ...d,
    profitPerDollar: parseFloat(((d.rewarded / d.staked) - 1).toFixed(2))
  }
}, { staked: 0, rewarded: 0, profitPerDollar: 0 })

console.log(result)
