import axios from 'axios'
import { updatePlayerSelect } from '../../src/dom_utils.js'

document.addEventListener('DOMContentLoaded', () => {
  console.log('adding event listeners')
  const leagueSelect = qs('[data_select="league_select"]')
  const splitSelect = qs('[data_select="split_select"]')
  
  leagueSelect.addEventListener('change', async (e) => {
    const leagueId = e.target.value
    const res = await axios.get(`/api/v1/leagues/${leagueId}/splits`)

    console.log(res)
    updatePlayerSelect(splitSelect, res.data)
  })
})

