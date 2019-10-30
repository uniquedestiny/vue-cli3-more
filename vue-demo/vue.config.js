// -----------------------------pages config----------------------------------
const fs = require('fs')
let pages = {}
const _configPages = async function () {
  await fs.readdirSync('./src/pages/').forEach((val) => {
    pages[val] = {
      // page entry
      entry: `src/pages/${val}/index.js`,
      // 模板来源
      template: `src/pages/${val}/index.html`,
      // 在 dist/index.html 的输出
      filename: `${val}.html`
    }
  })
}
_configPages('./src/pages/') // readdirSync

// ---------------------------vue config------------------------------------
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const gzipSourceList = ['css', 'js']
module.exports = {
  publicPath: '/vue-demo/',
  outputDir: './dist/vue-demo/', // build path
  pages: pages, // more pages config
  productionSourceMap: false, // don·t use map
  devServer: {
    port: 1314, // port
    open: true, // default browser
    overlay: {
      warnings: true, // eslint show warnings
      errors: true // eslint show errors
    }
  },
  configureWebpack: config => { // open gzip
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      return {
        plugins: [
          new CompressionWebpackPlugin({
            filename: '[path].gz[query]', // 目标资源文件名称
            algorithm: 'gzip',
            test: new RegExp(
              '\\.(' + gzipSourceList.join('|') + ')$'
            ), // 匹配所有对应的文件
            threshold: 10240, // 多少kb 配置10kb
            minRatio: 0.8, // 压缩比例
            deleteOriginalAssets: false // 是否删除原始资源
          })
        ]
      }
    }
  }
}
