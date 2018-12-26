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
  crawl "first blood"   "kespa" "bet365.csv" "fb"
  crawl "first dragon"  "kespa" "bet365.csv" "fd"
  crawl "first tower"   "kespa" "bet365.csv" "ft"
  crawl "first baron"   "kespa" "bet365.csv" "fbaron"
#  crawl "total kills"   "kespa" "bet365.csv" "total_kills"
#  crawl "total dragons" "kespa" "bet365.csv" "total_dragons"
#  crawl "total barons"  "kespa" "bet365.csv" "total_barons"
#  crawl "total towers"  "kespa" "bet365.csv" "total_towers"
  crawl "to win"        "kespa" "bet365.csv" "win"
}

main
