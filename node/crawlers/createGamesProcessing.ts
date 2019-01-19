import * as fs from 'fs'

import { ITeam } from '../../frontend/src/types/team'
import { getTeamByName } from './createGameUtils'
import { ISplit } from '../../frontend/src/types/split'

type TMarket = 'fb' | 'ft' | 'fd' | 'fbaron'

interface INewGame {
  gameNumber: number

  splitId: number
  leagueId: number
  redSideTeamId: number
  blueSideTeamId: number

  blueSideTeamFbOdds?: number
  blueSideTeamFtOdds?: number
  blueSideTeamFdOdds?: number
  blueSideTeamFbaronOdds?: number

  redSideTeamFbOdds?: number
  redSideTeamFtOdds?: number
  redSideTeamFdOdds?: number
  redSideTeamFbaronOdds?: number
}

interface IGameData {
  team1: string
  team2: string
  team1odds: number
  team2odds: number
}

function readData(market: TMarket): IGameData[] {
  const crawledData: string[] = fs.readFileSync(`./node/odds/${market}/bet365.csv`, 'utf8').split('\n')
  const games: IGameData[] = []
  for (let i = 0; i < crawledData.length; i++) {
    if (i === 0) {
      // skip - team_1,team_2,team_1_odds,team_2_odds
    } else {
      const data = crawledData[i].split(',')
      const gameData: IGameData = {
        team1: data[0],
        team2: data[1],
        team1odds: parseFloat(data[2]),
        team2odds: parseFloat(data[3])
      }

      games.push(gameData)
    }
  }

  return games
}

function getGames(): INewGame[] {
  const crawledData: string[] = fs.readFileSync('./node/odds/fb/bet365.csv', 'utf8').split('\n')
  const games: INewGame[] = []
  for (let i = 0; i < crawledData.length; i++) {
    if (i === 0) {
      // skip - team_1,team_2,team_1_odds,team_2_odds
    } else {
      const data = crawledData[i].split(',')
      const game: INewGame = {
        gameNumber: 1,
        redSideTeamId: 0,
        blueSideTeamId: 0,
        leagueId: 0,
        splitId: 0
      }

      games.push(game)
    }
  }

  return games
}

function csvToGames(split: ISplit, teams: ITeam[]): INewGame[] {
  const gamesFromCsv = readData('fb')

  const gamesToPost: INewGame[] = []

  for (const g in gamesFromCsv) {
    const game = gamesFromCsv[g]
    const blueTeam = getTeamByName(game.team1, teams)
    const redTeam = getTeamByName(game.team2, teams)

    const newGame: INewGame = {
      gameNumber: 1,
      splitId: split.id,
      leagueId: split.leagueId,
      redSideTeamId: redTeam.id,
      blueSideTeamId: blueTeam.id
    }

    gamesToPost.push(newGame)
  }

  return gamesToPost
}


export {
  readData,
  getGames,
  csvToGames,
  INewGame,
  TMarket
}
