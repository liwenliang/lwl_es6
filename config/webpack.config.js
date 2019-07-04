module.exports = {
  entry: './src/main.js',
  output: {
    filename: './dist/bundle.js'
  },
  devServer: {
    proxy: {
      '/h265': {
        target: 'http://qiniu-store.houjiyi.com/', // 目标接口域名
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/h265': '/h265' // 重写接口
        }
      }
    },

    // Various Dev Server settings
    host: '10.30.0.228', // can be overwritten by process.env.HOST
    port: 9802,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.js?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  }
}
