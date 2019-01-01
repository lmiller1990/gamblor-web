import { Game } from '../../src/types/game'
import { state, mutations, getters } from '../../src/store/games.ts'

const context = describe

const GAME_ID = 1
const BLUE_TEAM_ID = 1
const RED_TEAM_ID = 2
const ODDS = 2
const teamIds = { blueSideTeamId: BLUE_TEAM_ID, redSideTeamId: RED_TEAM_ID }
const winLoseIds = { winnerId: BLUE_TEAM_ID, loserId: RED_TEAM_ID }

const games = [
  { id: 0, ...winLoseIds, ...teamIds, firstBloodTeamId: BLUE_TEAM_ID },
  { id: GAME_ID, ...winLoseIds, ...teamIds, firstBloodTeamId: BLUE_TEAM_ID, 
    blueSideTeamFbOdds: ODDS },
  { id: 2, ...winLoseIds, ...teamIds, firstBloodTeamId: BLUE_TEAM_ID },
  { id: 3, ...winLoseIds, ...teamIds, firstBloodTeamId: BLUE_TEAM_ID },
  { id: 4, ...winLoseIds, ...teamIds, firstBloodTeamId: RED_TEAM_ID },
  // since the last game lacks win/lose ids, it is the only 'incomplete' game
  // we do not want to use unplayed games when calculating EV.
  // therefore, this last game is not included in ev calculation.
  { id: 5, ...teamIds, firstBloodTeamId: BLUE_TEAM_ID  }
]

const createState = () => Object.assign({}, state)
const rootGetters = {
  'teams/nameById': (id) => id === BLUE_TEAM_ID ? 'blue' : 'red',
  'historicalGames/byTeamId': (id) => games
}

describe('getters', () => {
  describe('titleById', () => {
    it('concatentates two teams to form a game title', () => {
      const state = createState()
      state.ids = [BLUE_TEAM_ID]
      state.all = { 
        '1': { 
          blueSideTeamId: BLUE_TEAM_ID, redSideTeamId: RED_TEAM_ID
        }
      }

      expect(
        getters.titleById(state, getters, {}, rootGetters)(1)
      ).toBe('blue vs red')
    })
  })

  describe('oddsForMarket', () => {
    it('returns in game by team and market', () => {
      const state = createState()
      state.all = { [GAME_ID]: games[1] }
      state.ids = [GAME_ID]

      const actual = getters.oddsForMarket(state)({
        gameId: GAME_ID, market: 'fb', teamId: BLUE_TEAM_ID
      })

      expect(actual).toBe(ODDS)

    })
  })

  describe('evByTeamId', () => {
    const subject = ({ nLastGames }) =>
      getters.evByTeamId({}, getters, {}, rootGetters)({
        teamId: BLUE_TEAM_ID,
        opponentId: RED_TEAM_ID,
        market: 'fb',
        odds: ODDS,
        nLastGames
      })

    context('requesting ev for nLastGames', () => {
      it('returns ev based on percent * odds formula', () => {
        const actual = subject({ nLastGames: 4 })
        // (.75 chance to get + .75 opp. chance to not get / 2) * 2 odds
        expect(actual).toBe(1.5)
      })
    })

    context('requesting ev all past games', () => {
      it('returns ev based on percent * odds formula', () => {
        const actual = subject({ nLastGames: -1 })
        // (.75 chance to get + .75 opp. chance to not get / 2) * 2 odds
        // ((4/5) + (4/5) / 2) * 2
        // .8 + .8 = 1.6
        expect(actual).toBe(1.6)
      })
    })
  })
})
