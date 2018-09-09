import axios from 'axios'
import { updatePlayerSelect } from '../../src/dom_utils.js'

document.addEventListener('DOMContentLoaded', () => {
  console.log('adding event listeners')
  const selects = qss('.first_select')

  for (let select of selects) {
    select.addEventListener('change', async (e) => {
      const teamId = e.target.value
      const res = await axios.get(`/api/v1/teams/${teamId}`)

      const dataSelect = e.target.getAttribute('data_select')
      const selectToUpdate = qs(`[data_to_update="${dataSelect}"]`)

      updatePlayerSelect(selectToUpdate, res.data.players)
    })
  }
})

