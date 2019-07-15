
module.exports = {
  publicPath: '/', //基本路径
  outputDir: 'dist',
  productionSourceMap: false,
  assetsDir: 'static',
  filenameHashing: true,
  pages: {
    index: {
      // page 的入口
      entry: "src/main.js",
      // 模板来源
      template: "public/index.html", // 这里用来区分加载那个 html
      // 在 dist/index.html 的输出
      filename: "index.html",
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ["chunk-vendors", "chunk-common", "index"]
    }
},

    devServer: {
        compress: true,
       disableHostCheck: true,   // That solved it
        open:true,
        proxy: {
            '/api':{
                target:'https://messageboards-5c29b.firebaseio.com/',
                changeOrigin:true,
                pathRewrite:{
                    '/api':'/api'
                }
            }
        }
    }
}