module.exports = {
    baseUrl: './',
    productionSourceMap: false,
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