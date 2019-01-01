import { shallowMount } from '@vue/test-utils'
import MatchHistoryTable from '@/current_matchup/match_history_table.vue'

const TEAM_ID = 1
const OPPONENT_ID = 2

const factory = () => 
  // @ts-ignore
  shallowMount(MatchHistoryTable, {
    props: {
      canEdit: true,
      games: [],
      teamId: TEAM_ID
    }
  })

describe('MatchHistoryTable', () => {
  it('renders', () => {
    const wrapper = factory()
  })

  test('createBet emits a createBet event', () => {
    const wrapper = factory()

    wrapper.vm.createBet()

    expect(wrapper.emitted().createBet).not.toBeFalsy()
  })

  test('didWin returns true if team won', () => {
    const subject = factory().vm.$options.methods.didWin

    expect(subject.call({ teamId: TEAM_ID }, TEAM_ID)).toBe(true)
  })

  test('didWin returns false if team did not win', () => {
    const subject = factory().vm.$options.methods.didWin

    expect(subject.call({ teamId: OPPONENT_ID }, TEAM_ID)).toBe(false)
  })
})
