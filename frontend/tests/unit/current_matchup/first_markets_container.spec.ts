import { shallowMount } from '@vue/test-utils'
import FirstMarketsContainer from '@/current_matchup/first_markets_container.vue'

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
    it('returns the running first average, excluding unplayed games', () => {
      // @ts-ignore
      expect(wrapper.vm.getAverageForMarket('Blood')).toEqual([0, .5, .33])
    })
  })

  describe('generateDataset', () => {
    it('adds a linear x axis to a 1d dataset', () => {
      const data = [1, 1, 0]
      // @ts-ignore
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
      // @ts-ignore
      expect(wrapper.vm.chartId).toBe(`${SIDE}_chart`)
    })
  })
})
