function compile() {
  echo "Compiling..."
  yarn tsc node/crawlers/better.ts
}

function crawl() {
  echo "Getting data for $4"
  node node/crawlers/better.js --market "$1" --event "$2" --outputFile "$3" --outputDirectory "$4"
}

function main() {
  compile
  crawl "first blood"   "lol - $1" "bet365.csv" "fb"
  crawl "first dragon"  "lol - $1" "bet365.csv" "fd"
  crawl "first tower"   "lol - $1" "bet365.csv" "ft"
  crawl "first baron"   "lol - $1" "bet365.csv" "fbaron"
#  crawl "total kills"   "lol - lcs" "bet365.csv" "total_kills"
#  crawl "total dragons" "lol - lcs" "bet365.csv" "total_dragons"
#  crawl "total barons"  "lol - lcs" "bet365.csv" "total_barons"
#  crawl "total towers"  "lol - lcs" "bet365.csv" "total_towers"
#  crawl "to win"        "lol - lcs" "bet365.csv" "win"
}

main $1
