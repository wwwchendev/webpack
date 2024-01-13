// 載入模組
const path = require('path')
//console.log(__dirname); //>> C:\Users\..\Desktop\Test

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
  }
}

module.exports = () => {
  console.log(`當前Webpack建構模式：${Mode}`)

  return {
    // 配置順序: mode,entry,output,resolve,module,plugin,devServer,devtool
    mode: Mode || 'development',
    entry: Config.entries,
    output: Config.outputs,
  }
}
