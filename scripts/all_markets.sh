function compile() {
  echo "Compiling..."
  tsc node/crawlers/better.ts
}

function crawl() {
  echo "Getting data for $4"
  node node/crawlers/better.js --market "$1" --event "$2" --outputFile "$3" --outputDirectory "$4"
}

function main() {
  compile
  crawl "first blood"   "champs" "bet365.csv" "fb"
  crawl "first dragon"  "champs" "bet365.csv" "fd"
  crawl "first tower"   "champs" "bet365.csv" "ft"
  crawl "first baron"   "champs" "bet365.csv" "fbaron"
#  crawl "total kills"   "champs" "bet365.csv" "total_kills"
#  crawl "total dragons" "champs" "bet365.csv" "total_dragons"
#  crawl "total barons"  "champs" "bet365.csv" "total_barons"
#  crawl "total towers"  "champs" "bet365.csv" "total_towers"
  crawl "to win"        "champs" "bet365.csv" "win"
}

main
