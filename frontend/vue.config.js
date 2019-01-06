module.exports = {
  devServer: {
    proxy: 'http://localhost:3000'
  },
  baseUrl: process.env.NODE_ENV === 'production'
  ? '/dist'
  : '/',
  outputDir: '../public/dist'
}
