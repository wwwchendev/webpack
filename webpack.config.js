// 載入模組
const path = require('path')
//console.log(__dirname); //>> C:\Users\..\Desktop\Test
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

// 設定
const Mode = process.env.NODE_ENV === 'production' ? 'production' : 'development' //透過 cross-env搭配scripts  process.env.NODE_ENV環境變數的過程

const Config = {
  //- Webpack進入輸出點,JS配置
  entries: {
    index: ['./src/js/index.js'],
  },
  outputs: {
    path: path.resolve(__dirname, 'dist'), // 輸出打包檔案路徑
    filename: 'js/[name].js', // 輸出JS的檔案名稱
    clean: true, // 啟用自動清理輸出目錄
    assetModuleFilename: 'assets/[name][ext]',
  },
  //- Webpack別名配置
  alias: {
    '@assets': path.resolve(__dirname, './src/assets/'),
    '@img': path.resolve(__dirname, './src/assets/images'),
    '@stylesheet': path.resolve(__dirname, './src/stylesheet'),
  },
  //- HTML
  pages: {
    index: {
      template: './src/html/index.ejs', // 來源HTML文件
      chunks: ['index'], // 注入的JavaScript chunks，這裡使用了 'index'，對應到 entries 中的 'index'
      filename: 'html/index.html', // 輸出的HTML檔案名稱
    },
  },
  //- CSS
  cssFileName: { filename: 'stylesheet/[name].css' },
}

module.exports = () => {
  console.log(`當前Webpack建構模式：${Mode}`)
  return {
    // 配置順序: mode,entry,output,resolve,module,plugin,devServer,devtool
    mode: Mode || 'development',
    entry: Config.entries,
    output: Config.outputs,
    resolve: { alias: Config.alias },
    module: {
      rules: [
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(?:js|mjs|cjs)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: "defaults" }]
              ]
            }
          }
        },
        {
          test: /\.scss$/,
          use: [
            Mode == 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
            //如果你在設定中使用了MiniCssExtractPlugin.loader，就表示你想要將CSS提取到獨立的檔案中，而不需要將樣式內聯到JavaScript檔案中，因此不再需要style-loader。
            'css-loader',
            'sass-loader',
            'postcss-loader',
          ]
        },
        {
          test: /\.ejs$/i,
          use: ['html-loader', 'template-ejs-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin(Config.pages.index),
      Mode === 'production' && new MiniCssExtractPlugin(Config.cssFileName),
      new ESLintPlugin()
    ].filter(Boolean), // 過濾掉空的插件,
    devServer: {
      static: [
        {
          directory: path.join(__dirname, 'dist/'),
          watch: true,
        },
      ],
      open: true, //自動在預設瀏覽器中開啟應用程式
      hot: true, //啟用熱模塊
      port: 8080,
      devMiddleware: {
        index: 'html/index.html', // 指定要打開的預設文件
      },
    },
    devtool: Mode === 'production' ? 'inline-source-map' : 'source-map', //啟用映射路徑 (Source Map)
  }
}