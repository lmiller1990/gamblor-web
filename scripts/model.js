const fs = require('fs')

const extractData = (d, idx) => {
  const fields = d.split(":")
  const [t1, t2] = [fields[0].split(' ')[0], fields[0].split(' ')[fields[0].split(' ').length - 1]]

  const market = fields[0].match(/(F(B|D|T|Baron))/)[0]
  const betData = fields[1].split("|")
  const staked = parseFloat(betData[0].replace("$", "").trim())
  const odds = parseFloat(betData[1].trim())
  const rewarded = parseFloat(betData[3].replace("$", "").trim())

  // ugh... above regexp counts FBaron as FB
  // TODO: Get better at regexp, this will do for now
  const actualMarket = !fields[0].includes("FB")
    ? market.toLowerCase()
    : fields[0].includes("Baron") 
      ? "fbaron" 
      : "fb"

  return {
    id: idx,
    t1,
    isDup: false,
    t2,
    market: actualMarket,
    odds,
    staked,
    rewarded,
  }
}

const summarizeBets = filename => {
  const data = fs.readFileSync(filename, "utf8")
    .split("\n")
    .filter(x => x.includes("Win") || x.includes("Lose"))
    .map(extractData)

  const defaults = { staked: 0, 
    rewarded: 0, 
    betsWon: 0, 
    betsPlaced: 0, 
    profitPerDollar: 0 
  }

  return data.reduce((acc, curr) => {
    const d = {
      staked: acc.staked += curr.staked,
      rewarded: acc.rewarded += curr.rewarded,
      totalBets: acc.totalBets += 1,
      bets: [...acc.bets, curr]
    }

    acc.markets[curr.market].betsPlaced += 1
    acc.markets[curr.market].staked += curr.staked
    if (curr.rewarded > 0) {
      acc.markets[curr.market].betsWon += 1
      acc.markets[curr.market].rewarded += curr.rewarded
    }

    return {
      ...d,
      markets: {
        ...acc.markets,
        [curr.market]: {
          ...acc.markets[curr.market],
          profitPerDollar: parseFloat(((acc.markets[curr.market].rewarded / acc.markets[curr.market].staked) - 1).toFixed(2)),
        }
      },
      profitPerDollar: parseFloat(((d.rewarded / d.staked) - 1).toFixed(2)),
    }
  }, { 
    markets: { 
      fb: {...defaults},
      fd: {...defaults},
      ft: {...defaults},
      fbaron: {...defaults},
    }, 
    staked: 0, 
    rewarded: 0, 
    profitPerDollar: 0, 
    totalBets: 0, 
    bets: [] 
  })
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


/*
if (!module.parent) {
  const results = summarizeBets("./tmp/bets.txt")
  const flagged = flagDuplicates(results)
  let str = 'id,market,t1,t2,staked,rewarded,odds,isDup\n'
  for (const b of flagged) {
    str += [b.id, b.market, b.t1, b.t2, b.staked, b.rewarded, b.odds, b.isDup].join(',') + '\n'
  }

  fs.writeFileSync("./tmp/flagged_bets.txt", str)
}
*/

const { bets, ...rest } = summarizeBets('./bets.txt')

console.log(
  rest
)

module.exports = {
  summarizeBets,
  flagDuplicates
}
