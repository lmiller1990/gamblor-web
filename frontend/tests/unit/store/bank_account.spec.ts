import { state, mutations } from '@/store/bank_account'

const createState = () => Object.assign({}, state)
const BALANCE = 10022

describe('bankAccount', () => {
  test('SET_BALANCE updates the state', () => {
    const state = createState()

    mutations.SET_BALANCE(state, BALANCE)

    expect(state.balanceCents).toBe(BALANCE)
  })
})
