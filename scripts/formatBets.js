var extract = tds => {
  const t = str => str.trim()
  return {
    team: t(tds[0].innerText),
    opponent: t(tds[1].innerText),
    ev: t(tds[3].innerText),
    market: t(tds[2].innerText).toUpperCase(),
    odds: t(tds[4].innerText),
    success: parseInt(t(tds[5].innerText).replace('%', '')),
    opponentSuccess: parseInt(t(tds[6].innerText).replace('%', ''))
  }
}

var abbr = team => team.split(' ').map(x => x[0]).join('')

var t = str => str.trim()

var bets = Array.from(
  document.querySelector('.modal_component').querySelectorAll('tr')
)
  .slice(1)
  .map(tr => extract(tr.querySelectorAll('td')))

var format = bet => {
  return `${abbr(bet.team)} ${abbr(bet.team).length == 2 ? ' ' : ''}to get ${bet.market} vs ${abbr(bet.opponent)}:       ${abbr(bet.opponent).length == 2 ? ' ' : ''} $00 | ${bet.odds} | .... | $000.00 | ${bet.success}% | ${bet.opponentSuccess}% | ${bet.ev}`
}

copy( bets.map(format) )
