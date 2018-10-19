import { Match } from "./better"

export function removeDupMatches(matches: Match[]): Match[] {
  const foundMatchesIndexes: number[] = []
  const foundMatches: string[] = []
  
  let i = 0
  for (const match of matches) {
    // @ts-ignore
    const matchValues = Object.keys(match).map(x => match[x]).join(",")

    const included = foundMatches.indexOf(matchValues)

    if (included < 0) {
      foundMatches.push(matchValues)
      foundMatchesIndexes.push(i)
    }

    i += 1
  }
  
  return matches.filter((_, idx) => foundMatchesIndexes.indexOf(idx) >= 0)
}