import * as fs from "fs"
import * as _ from 'lodash'
import { options } from "./launch-options"
import * as puppeteer from "puppeteer"
import * as path from "path"
import * as minimist from "minimist" 
import { removeDupMatches } from "./utils";

const args = minimist(process.argv.slice(2))

export interface Match {
  firstTeamName: string
  secondTeamName: string
  firstTeamOdds: number
  secondTeamOdds: number
  closeDate: string
}

interface MatchWithoutOdds {
  firstTeamName: string
  secondTeamName: string
  time: string // 10:00 etc.
}

const buildMatches = (vals: string[]): MatchWithoutOdds[] => {
  const matches = []
  const timeRegex = /\d{2}:\d{2}/
  const fromWhitespaceRegexp = /\s.*/

  for (const v of _.chunk(vals, 2)) {
    console.log('val', v)
    const match: MatchWithoutOdds = {
      firstTeamName: '',
      secondTeamName: '',
      time: ''
    }

    const result = v[0].match(timeRegex)
    if (result) {
      match.time = result[0].trim()
    }

    const first = v[0].match(fromWhitespaceRegexp)
    const second = v[1].match(fromWhitespaceRegexp)
    match.firstTeamName = first && first[0].trim()
    match.secondTeamName = second && second[0].trim()

    matches.push(match)
  }

  return matches
}

const theEvent = args.event.replace("_", " ")
console.log(args)
console.log('event', theEvent)
const theMarket = args.market
const outputFile = args.outputFile
const outputDirectory = args.outputDirectory  

function attachToWindow(page, propName, propVal) {
  return page.evaluate(`
      if (typeof ${propName} === 'undefined') {
        Object.defineProperty(window, '${propName}', {
          get() { return ${propVal} }
        })
      } else if (typeof ${propName} === 'string') {
        ${propName} = ${propVal}
      } else {
      }
    `)
}

function clearPreviouslyScrapedData() {
  try {
    fs.unlinkSync(
      path.join(__dirname, "..", "odds", outputDirectory, outputFile)
    )
  } catch(e) {
    // doesn't exist
  }

  fs.appendFileSync(
    path.join(__dirname, "..", "odds", outputDirectory, outputFile), 
    "team_1,team_2,team_1_odds,team_2_odds,close_date"
  )
}

/**
 * Get the closing time for the game
 */
function getBookCloseDate(el: Element): string {
  console.log(el)
  const closeDate: string = (el.previousElementSibling as HTMLDivElement).innerText.split('Book Closes')[1].trim()

  return closeDate
}

function getTeams(el: Element): string[] {
  const teams: string[] = []
  for (const elm of Array.from(el.querySelectorAll(".gll-Participant_Name"))) {
    teams.push(elm.innerHTML)
  }
 
  return teams
}
/**
 * @param el {HTMLElement} HTMLElement that looks like this:
 * 
 * <div class="cm-MarketSubGroup_Label ">Gambit Esports vs G-Rex - LOL - World Champs Play-In - Map 1</div>
 * <div>........</div> <- this is the el param
 * 
 * So we want to get the team names from the previous element
 * 
 * @returns teams {string[]} containing the two teams
 */
function getTeamsForOverUnder(el: HTMLElement): Array<string> {
  const tableHeader = el.previousElementSibling as HTMLTableHeaderCellElement
  const child = tableHeader.children[0] as HTMLElement 
  const teams = child.innerText.split('- LOL')[0].split('vs')
  return teams.map(x => x.toLowerCase().trim())
}

function getOdds(el: HTMLElement): string[] {
  const odds: string[] = []
  for (const elm of Array.from(el.querySelectorAll(".gll-Participant_Odds"))) {
    odds.push(elm.innerHTML)
  }
  return odds
}

const visitEsportsPage = (async (page: puppeteer.Page) => {
  await page.goto("https://www.bet365.com.au/")
  await page.mainFrame().waitForSelector(".wn-Classification ")

  await page.$$eval(".wn-Classification ", divs => 
    (Array.from(divs)
    .find((x: HTMLElement) => x.innerText.includes("Esports")) as HTMLElement)
    .click()
  )
})

const main = (async function main() {

  clearPreviouslyScrapedData()
  const browser: puppeteer.Browser = await puppeteer.launch(options)
  const page = await browser.newPage()
 
  await visitEsportsPage(page)
  await page.mainFrame().waitForSelector(".sm-SplashMarketGroupButton ")
  await attachToWindow(page, 'theMarket', JSON.stringify(theMarket))
  await attachToWindow(page, 'theEvent', JSON.stringify(theEvent))
  await attachToWindow(page, 'getBookCloseDate', getBookCloseDate)

  await page.$$eval(".sm-SplashMarketGroupButton", (divs) => {
    console.log(divs.length)
    const theLeague: HTMLElement = Array.from(divs)
      .filter((x: HTMLElement) => { 
        if (x.innerText.toLowerCase().includes(theEvent)) {
          return x
        }
      })[0] as HTMLElement

    const table: HTMLElement = theLeague.parentElement

    for (const marketRow of Array.from(table.querySelectorAll('.sm-SplashMarket_Header'))) {
      const el = marketRow as HTMLElement
      console.log(el.innerText)
      if (el.innerText.toLowerCase().includes('main markets')) {
        console.log('clicking', el, el.firstElementChild)
        // @ts-ignore
        el.firstElementChild.click()
      }
    }

    // setTimeout(() => {
      const market = (Array.from(table.querySelectorAll<HTMLDivElement>(".sm-CouponLink "))
        .find(x => {
          console.log(x.innerText)
          return x.innerText.toLowerCase().includes(theMarket)
        })
      )

      market.click()
    // }, 1500)
  })

  await page.mainFrame().waitForSelector(".gll-Market_General.gll-Market_HasLabels ")

  const matchupData = await page.$eval(".gll-Market_General.gll-Market_HasLabels ", div => {
    const vals = Array.from(
      div.querySelectorAll<HTMLDivElement>(".sl-CouponParticipantGameLineTwoWay")
    ).map(x => x.innerText)

    return vals
  })

  const matchups = buildMatches(matchupData)

  const odds = await page.$$eval(".gll-Market_General ", divs => {
    const els = Array.from(divs) as HTMLDivElement[]
    console.log(els)
    const oddsCol = els.find(x => x.querySelector<HTMLDivElement>('.gll-MarketColumnHeader ').innerText.toLowerCase().trim() === "first blood")

    if (oddsCol) {
      return Array.from(oddsCol.querySelectorAll<HTMLDivElement>('.gll-ParticipantCentered_NoHandicap')).map(x => x.innerText)
    }
  })

  const matchesWithOdds: Match[] = []
  for (const m of matchups) {
    matchesWithOdds.push({
      firstTeamName: m.firstTeamName,
      secondTeamName: m.secondTeamName,
      firstTeamOdds: parseFloat(odds[0]),
      secondTeamOdds: parseFloat(odds[1]),
      closeDate: ''
    })
  }
  console.log(matchesWithOdds)
  // .querySelectorAll(".sl-CouponParticipantGameLineTwoWay").forEach(x => console.log(x.innerText))

  // await page.waitForSelector(".cm-CouponMarketGroupButton_Title")
  // await attachToWindow(page, 'getTeams', getTeams)
  // await attachToWindow(page, 'getOdds', getOdds)
  // await attachToWindow(page, 'getTeamsForOverUnder', getTeamsForOverUnder) 

  // const matches: Match[] = await page.$eval(".gll-MarketGroup", (marketGroup) => {
  //   const results: Match[] = []

  //   const tableRows: Array<Element> = Array.from(marketGroup.querySelectorAll(".gll-Market_General"))

  //   // await page.$eval('asdf', (val) => {})
  //   const teamGetter = theMarket.includes("total") ? getTeamsForOverUnder : getTeams
  //   for (const tableRow of tableRows) {
  //     Promise.all([
  //       teamGetter(tableRow as HTMLElement), // getTeams(tableRow as HTMLElement),
  //       getOdds(tableRow as HTMLElement),
  //       getBookCloseDate(tableRow)
  //     ]).then(([ teams, odds, closeDate ]) => {
  //       const match: Match = {
  //         firstTeamName: teams[0].toLowerCase(),
  //         secondTeamName: teams[1].toLowerCase(),
  //         firstTeamOdds: parseFloat(odds[0].toLowerCase()),
  //         secondTeamOdds: parseFloat(odds[1].toLowerCase()),
  //         // @ts-ignore
  //         closeDate: closeDate
  //       } 

  //       results.push(match)      
  //     })
  //   }

  //   return results
  // })

  // for (const match of removeDupMatches(matches)) {
  //   fs.appendFileSync(
  //     path.join(__dirname, "..", "odds", outputDirectory, outputFile), 
  //     `\n${match.firstTeamName},${match.secondTeamName},${match.firstTeamOdds},${match.secondTeamOdds},${match.closeDate}`
  //   )
  // }
  
//  await browser.close()
})()
