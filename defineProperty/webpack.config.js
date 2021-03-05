const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    plugins: [
        // html-webpack-plugin
        // 功能：默认会创建一个空的HTML，引入打包输出的所有资源（js/css）
        // 需要有结构的HTML文件，需要加配置选项
        new HtmlWebpackPlugin({
            // 复制'./src/index.html'文件，并自动引入打包输出的资源
            template: './src/index.html'
        })
    ],
    mode: 'development',
    devServer:  {
        port: 3001,
        contentBase: path.resolve(__dirname, 'build')
    }
}