import axios from 'axios'
import * as moment from 'moment'

import { TMarket, readData, INewGame, csvToGames } from './createGamesProcessing'
import { getSplit, isNewGame } from './createGameUtils'

import { ISplit } from '../../frontend/src/types/split'
import { Game } from '../../frontend/src/types/game'


const API_ROUTE = 'http://localhost:3000/api/v1'

interface IGamesResponse {
  games: Game[]
}

function getInitialData() { 
  return Promise.all([
    axios.get<IGamesResponse>(`${API_ROUTE}/games`, {
      params: {
        start: moment().add(-1, 'week').format(),
        end: moment().add('1', 'week').format()
      }
    }),
    axios.get(`${API_ROUTE}/teams`),
    axios.get(`${API_ROUTE}/leagues`)
  ])
}

async function main() {
  const markets: TMarket[] = ['fb', 'ft', 'fd', 'fbaron']
  const argv = require('minimist')(process.argv.slice(2));

  const leagueName = argv.league
  const splitName = argv.split

  // get the required data
  const [gamesResponse, teamsResponse, leaguesResponse] = await getInitialData()

  // get the split using command line params (split name and league name)
  // need to know the split id in the database
  const split: ISplit = getSplit(leaguesResponse.data, splitName, leagueName)

  // read the schedule from the csv
  const gamesToPost: INewGame[] = csvToGames(split, teamsResponse.data)

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

  // see if it is a new game or not
  // if it is already in the database we will not created it,
  // but we should probably update the odds at some point.
  const ifNewGame = (game: INewGame) => isNewGame(game, gamesResponse.data)
  const newGames = gamesToPost.filter(ifNewGame)

  for (const newGame of newGames) {
    await axios.post(`${API_ROUTE}/games`, { game: newGame })
  }

  console.log('Done!')
}

main()