import axios from 'axios'
import * as moment from 'moment'

import { TMarket, readData, INewGame, csvToGames } from './createGamesProcessing'
import { getSplit, isNewGame } from './createGameUtils'

import { ISplit } from '../../frontend/src/types/split'
import { Game } from '../../frontend/src/types/game'


interface IGamesResponse {
  games: Game[]
}

function getInitialData(apiRoute: string) { 
  return Promise.all([
    axios.get<IGamesResponse>(`${apiRoute}/games`, {
      params: {
        start: moment().add(-2, 'week').format(),
        end: moment().add('2', 'week').format()
      }
    }),
    axios.get(`${apiRoute}/teams`),
    axios.get(`${apiRoute}/leagues`)
  ])
}

async function main() {
  const markets: TMarket[] = ['fb', 'ft', 'fd', 'fbaron']
  const argv = require('minimist')(process.argv.slice(2));

  const leagueName = argv.league
  const splitName = argv.split
  const apiRoute = argv.api

  console.log(`Creating games for ${leagueName} - ${splitName}`)

  // get the required data
  const [gamesResponse, teamsResponse, leaguesResponse] = await getInitialData(apiRoute)

  // get the split using command line params (split name and league name)
  // need to know the split id in the database
  console.log('Getting split...')
  const split: ISplit = getSplit(leaguesResponse.data, splitName, leagueName)
  console.log(`Split is ${split.name}`)

  // read the schedule from the csv
  console.log('Processing schedule...')
  const gamesToPost: INewGame[] = csvToGames(split, teamsResponse.data)
  console.log(`Games Count: ${gamesToPost.length}`)


  // for each market, get the odds and assign them to the
  // relevant property on the new game
  // we know the games array and marekts array are the same length
  // since they were constructed using the same data
  for (const market of markets) {
    const odds = readData(market)

    for (const game of gamesToPost) {
      for (let i = 0; i < odds.length; i++) {
        switch (market) {
          case 'fb':
            game.blueSideTeamFbOdds = odds[i].team1odds
            game.redSideTeamFbOdds = odds[i].team2odds
            break
          case 'ft':
            game.blueSideTeamFtOdds = odds[i].team1odds
            game.redSideTeamFtOdds = odds[i].team2odds
            break
          case 'fd':
            game.blueSideTeamFdOdds = odds[i].team1odds
            game.redSideTeamFdOdds = odds[i].team2odds
            break
          case 'fbaron':
            game.blueSideTeamFbaronOdds = odds[i].team1odds
            game.redSideTeamFbaronOdds = odds[i].team2odds
            break
        }
      }
    }
  }

  console.log(`\nProcessed games:\n==================\n`)
  for (const game of gamesToPost) {
    const isNew = isNewGame(game, gamesResponse.data) ? '- (New) -' : '-'
    console.log(`${game.date} ${isNew} ${game.blueTeamName} (${game.blueSideTeamId}) vs ${game.redTeamName} (${game.redSideTeamId})`)
  }

  // see if it is a new game or not
  // if it is already in the database we will not created it,
  // but we should probably update the odds at some point.
  const ifNewGame = (game: INewGame) => isNewGame(game, gamesResponse.data)
  const newGames = gamesToPost.filter(ifNewGame)

  console.log(`\nPosting new games:\n==================\n`)
  
  let count = 0;
  for (const newGame of newGames) {
    console.log(`Posting ${newGame.blueTeamName} vs ${newGame.redTeamName}...`)
    await axios.post(`${apiRoute}/games`, { game: newGame })
    count += 1
  }

  console.log(`Done. Created ${count} games.`)
}

main()