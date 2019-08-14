const fs = require('fs')

const extractData = d => {
  const fields = d.split(":")
  const market = fields[0].match(/(F(B|D|T|Baron))/)[0]
  const betData = fields[1].split("|")
  const staked = parseFloat(betData[0].replace("$", "").trim())
  const rewarded = parseFloat(betData[3].replace("$", "").trim())

  // ugh... above regexp counts FBaron as FB
  // TODO: Get better at regexp, this will do for now
  const actualMarket = !fields[0].includes("FB")
    ? market
    : fields[0].includes("Baron") 
      ? "FBaron" 
      : "FB"

  return {
    market: actualMarket,
    staked,
    rewarded,
  }
}

const summarizeBets = filename => {
  const data = fs.readFileSync(filename, "utf8")
    .split("\n")
    .filter(x => x.includes("Win") || x.includes("Lose"))
    .map(extractData)

  return data.reduce((acc, curr) => {
    const d = {
      staked: acc.staked += curr.staked,
      rewarded: acc.rewarded += curr.rewarded,
      totalBets: acc.totalBets += 1,
      bets: [...acc.bets, curr]
    }

    return {
      ...d,
      profitPerDollar: parseFloat(((d.rewarded / d.staked) - 1).toFixed(2)),
    }
  }, { staked: 0, rewarded: 0, profitPerDollar: 0, totalBets: 0, bets: [] })
}

if (!module.parent) {
  console.log(summarizeBets("./bets.txt"))
}

module.exports = {
  summarizeBets
}
