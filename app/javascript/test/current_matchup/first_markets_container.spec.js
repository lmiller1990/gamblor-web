import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import FirstMarketsContainer from '../../src/current_matchup/first_markets_container.vue'

const context = describe
const teamId = 1
const SIDE = 'red'
const games = [
  { firstBloodTeamId: 0, winnerId: 1, loserId: 2 },
  { firstBloodTeamId: 1, winnerId: 1, loserId: 2 },
  { firstBloodTeamId: 0, winnerId: 1, loserId: 2 },
  { firstBloodTeamId: 1 }
]

const factory = () => shallowMount(FirstMarketsContainer, {
  propsData: { market: 'fb', games, teamId, teamName: 'TSM', side: SIDE }
})

const wrapper = factory()

describe('FirstMarketsContainer', () => {
  describe('getAverageForMarket', () => {
    context('market is a first market', () => {
      it('returns the running first average, excluding unplayed games', () => {
        expect(wrapper.vm.getAverageForMarket('Blood')).toEqual([0, .5, .33])
      })
    })

    context('market is win', () => {
      it('returns the average wins, excluding unplayed games', () => {
        expect(wrapper.vm.getAverageForMarket('Win')).toEqual([1, 1, 1])
      })
    })
  })

  describe('generateDataset', () => {
    it('adds a linear x axis to a 1d dataset', () => {
      const data = [1, 1, 0]
      const actual = wrapper.vm.generateDataset(data)

      expect(actual).toEqual([
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 0 }
      ])
    })
  })

  describe('chartId', () => {
    it('returns an id', () => {
      expect(wrapper.vm.chartId).toBe(`${SIDE}_chart`)
    })
  })
})
