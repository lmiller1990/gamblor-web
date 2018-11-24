/**
 * Full Kelly Criterion
 * Percent. to bet = Overlay / (odds - 1)
 * Good reference here: https://www.bettingexpert.com/academy/betting-fundamentals/managing-your-bankroll
 */
export function fullKelly(bankroll: number, ev: number, odds: number): number {
  const overlay = calcOverlay(ev)
  return Math.ceil(bankroll * (overlay / (odds - 1)))
}

export function fractionalKelly(bankroll: number, ev: number, odds: number, fraction: number): number {
  console.log(arguments)
  return fullKelly(bankroll, ev, odds) * fraction
}

/**
 * overlay is the same as EV
 * but normally presented as a percentage
 */
export function calcOverlay(ev: number): number {
  return parseFloat((ev - 1).toFixed(2))
}
