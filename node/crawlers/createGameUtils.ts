import { ISplit } from '../../frontend/src/types/split'
import { ILeague } from '../../frontend/src/types/league'
import { Game } from '../../frontend/src/types/game'
import { ITeam } from '../../frontend/src/types/team'
import { INewGame } from './createGamesProcessing'

function getTeamByName(name: string, teams: ITeam[]): ITeam | null {
  for (const team of teams) {
    if (team.name.toLowerCase() === name) {
      return team
    }
  }

  return null
}
/**
 * Given a list of leagues from the api,
 * get the split for the games, matched against a given
 * league and split name.
 * 
 * EG: using the two strings LCK, Summer Split,
 * return an ISplit: { leagueId: <LCK League Id>, id: <Summer Split Id> }
 */
function getSplit(leagues: ILeague[], splitName: string, leagueName: string): ISplit | null {
  for (const league of leagues) {
    if (league.name.toLowerCase() === leagueName.toLowerCase()) {
      for (const split of league.splits) {
        if (split.name.toLowerCase() === splitName.toLowerCase()) {
          return split
        }
      }
    }
  }

  return null
}

/**
 * given two team names, eg Team SoloMid and CLG,
 * iterate over a list of games and see if a game between those two teams
 * exists.
 */
function isNewGame(theGame: INewGame, games: Game[]): boolean {
  for (const game of games) {
    // @ts-ignore
    if ([game.redSideTeamId, game.blueSideTeamId].includes(theGame.redSideTeamId)) {
      // @ts-ignore
      if ([game.redSideTeamId, game.blueSideTeamId].includes(theGame.blueSideTeamId)) {
        return false
      }
    }
  }

  return true
}

/**
 * Given a game that already exists, find the id
 */
function getGameId(theGame: INewGame, games: Game[]): INewGame {
  for (const game of games) {
    // @ts-ignore
    if ([game.redSideTeamId, game.blueSideTeamId].includes(theGame.redSideTeamId)) {
      // @ts-ignore
      if ([game.redSideTeamId, game.blueSideTeamId].includes(theGame.blueSideTeamId)) {
        return { ...theGame, id: game.id }
      }
    }
  }

  return theGame
}

export {
  getSplit,
  isNewGame,
  getGameId,
  getTeamByName
}
