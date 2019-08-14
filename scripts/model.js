const fs = require('fs')

const extractData = (d, idx) => {
  const fields = d.split(":")
  const [t1, t2] = [fields[0].split(' ')[0], fields[0].split(' ')[fields[0].split(' ').length - 1]]

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
    id: idx,
    t1,
    isDup: false,
    t2,
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

const flagDuplicates = results => {
  const betsToUpdate = results.bets

  results.bets.forEach(theBet => {
    const theTeams = [theBet.t1, theBet.t2].sort()

    results.bets.forEach(bet => {
      const teams = [bet.t1, bet.t2].sort()
      if (
        (theTeams[0] === teams[0]) && (theTeams[1] === teams[1]) && (bet.market === theBet.market) && (theBet.id !== bet.id)
      ) {
        // console.log(theBet)
        // console.log(theTeams[0], teams[0], theTeams[1], theTeams[1])
        // same teambetsToUpdates and bet!
        // do something?
        // console.log(theBet.id)
        betsToUpdate[theBet.id].isDup = true
      }
    })
  })
  return betsToUpdate
}


if (!module.parent) {
  const results = summarizeBets("./tmp/bets.txt")
  const flagged = flagDuplicates(results)
  let str = 'id,market,t1,t2,staked,rewarded,isDup\n'
  for (const b of flagged) {
    str += [b.id, b.market, b.t1, b.t2, b.staked, b.rewarded, b.isDup].join(',') + '\n'
  }

  fs.writeFileSync("./tmp/flagged_bets.txt", str)
}

module.exports = {
  summarizeBets,
  flagDuplicates
}
