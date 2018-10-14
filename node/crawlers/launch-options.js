const args = [
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--disable-infobars',
  '--window-position=0,0',
  '--ignore-certifcate-errors',
  '--ignore-certifcate-errors-spki-list',
  '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3312.0 Safari/532.36"',
  '--auto-open-devtools-for-tabs'
];

const options = {
  args,
  headless: true,
  ignoreHTTPSErrors: true,
  userDataDir: './tmp'
}

module.exports = { options }
