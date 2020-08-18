module.exports = {
  publicPath: '',
  outputDir: './dist',
  lintOnSave: true,
  chainWebpack: config => {
    config
      .entry('app')
      .add('babel-polyfill')
      .add('./src/main.js')
    config.optimization.minimize(true)
    config.optimization.splitChunks({
      chunks: 'all'
    })
  },
  configureWebpack: () => {},
  productionSourceMap: true
}
