const cssnano = require('cssnano'); //壓縮和最小化 CSS 代碼，刪除不必要的空格、壓縮選擇器和屬性
const autoprefixer = require('autoprefixer'); //用於自動添加瀏覽器前綴，以確保 CSS 屬性在不同瀏覽器中的兼容性

module.exports = {
    plugins: [
        cssnano({
            preset: 'default',
        }),
        autoprefixer(),
    ],
};
