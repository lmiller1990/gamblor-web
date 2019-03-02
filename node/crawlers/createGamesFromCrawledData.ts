import axios from 'axios'
import * as moment from 'moment'

import { TMarket, readData, INewGame, csvToGames, IGameData } from './createGamesProcessing'
import { getSplit, isNewGame, getGameId } from './createGameUtils'
import { ISplit } from '../../frontend/src/types/split'
import { Game } from '../../frontend/src/types/game'

interface IGamesResponse {
  games: Game[]
}

function findOddsForGame(game: INewGame, allOdds: IGameData[]): IGameData | null {
  return allOdds.find(odd => {
    if (odd.team1 === game.blueTeamName.toLowerCase()) {
      if (odd.team2 === game.redTeamName.toLocaleLowerCase()) {
        return true
      }
    }

    return false
  })
}

function getInitialData(apiRoute: string) {
  return Promise.all([
    axios.get<IGamesResponse>(`${apiRoute}/games`, {
      params: {
        start: moment().add(-7, 'days').format(),
        end: moment().add('10', 'days').format()
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

    for (let i = 0; i < gamesToPost.length; i++) {

      if (market === 'fb') {
        const oddsForGame = findOddsForGame(gamesToPost[i], odds)
        if (oddsForGame) {
          gamesToPost[i].blueSideTeamFbOdds = oddsForGame.team1odds
          gamesToPost[i].redSideTeamFbOdds = oddsForGame.team2odds
        }
      }

      if (market === 'ft') {
        const oddsForGame = findOddsForGame(gamesToPost[i], odds)
        if (oddsForGame) {
          gamesToPost[i].blueSideTeamFtOdds = oddsForGame.team1odds
          gamesToPost[i].redSideTeamFtOdds = oddsForGame.team2odds
        }
      }

      if (market === 'fd') {
        const oddsForGame = findOddsForGame(gamesToPost[i], odds)
        if (oddsForGame) {
          gamesToPost[i].blueSideTeamFdOdds = oddsForGame.team1odds
          gamesToPost[i].redSideTeamFdOdds = oddsForGame.team2odds
        }
      }

      if (market === 'fbaron') {
        const oddsForGame = findOddsForGame(gamesToPost[i], odds)
        if (oddsForGame) {
          gamesToPost[i].blueSideTeamFbaronOdds = oddsForGame.team1odds
          gamesToPost[i].redSideTeamFbaronOdds = oddsForGame.team2odds
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

  const ifOldGame = (game: INewGame) => !isNewGame(game, gamesResponse.data)
  const previousGames = gamesToPost.filter(ifOldGame)

  console.log(`\nPosting new games:\n==================\n`)

  let createdGames = 0;
  for (const newGame of newGames) {
    console.log(`Creating ${newGame.blueTeamName} vs ${newGame.redTeamName}...`)

    await axios.post(`${apiRoute}/games`, { game: newGame })

    createdGames += 1
  }

  console.log(`\nCreated ${createdGames} games.\n`)

  console.log(`\Updating existing games:\n==================\n`)

  let updatedGames = 0;
  for (const game of previousGames) {
    console.log(`Updating ${game.blueTeamName} vs ${game.redTeamName}...`)

    const theGameWithId = getGameId(game, gamesResponse.data)
    await axios.put(`${apiRoute}/games/${theGameWithId.id}`, { game: theGameWithId })

    updatedGames += 1
  }

  console.log(`\nUpdated ${updatedGames} games.`)
}

main()
