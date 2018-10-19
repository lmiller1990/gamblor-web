export const titlecase = (val) => 
  val
    .split(' ')
    .map(x => x.slice(0, 1).toUpperCase() + x.slice(1, x.length))
    .join(' ')


export const shortDate = (date) => 
  new Date(date)
    .toDateString()
    .split(' ')
    .slice(0, 3)
    .join(' ')

export const dollars = (cents: number) => {
  return (cents/100).toLocaleString('en-US', { style: 'currency',  currency: 'AUD' })
}
