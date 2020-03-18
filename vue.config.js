// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack')
module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        Vue: ['vue/dist/vue.esm.js', 'default'],
        jQuery: 'jquery',
        $: 'jquery',
        'window.jQuery': 'jquery'
      })
    ]
  },
  lintOnSave: process.env.NODE_ENV !== 'production',
  devServer: {
    disableHostCheck: true,
    port: 8080,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-id, Content-Length, X-Requested-With, Cookie'
    },
    proxy: {
      '/api': {
        target: {
          // host: '192.168.100.25',
          host: 'localhost',
          protocol: 'http:',
          port: 8080
        },
        onProxyReq: proxyReq => {
          // proxyReq.setHeader('origin', 'http://192.168.100.25:8080')
          proxyReq.setHeader('origin', 'http://localhost:8080')
          proxyReq.setHeader('sec-fetch-mode', 'no-cors')
          proxyReq.setHeader('Sec-Fetch-Site', 'none')
        },
        changeOrigin: true
      }
    }
  }
}
