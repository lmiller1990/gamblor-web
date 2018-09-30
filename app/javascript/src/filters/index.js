export const titlecase = (val) => 
  val
    .split(' ')
    .map(x => x.slice(0, 1).toUpperCase() + x.slice(1, x.length))
    .join(' ')

