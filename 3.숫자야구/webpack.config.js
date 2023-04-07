const { VueLoaderPlugin } = require('vue-loader');
const path = require('path'); // 프로젝트 경로

module.exports = {
    mode: 'development',
    devtool:'eval',
    resolve: {
        extensions: ['.js', '.vue'],
    },
    entry: {
        app: path.join(__dirname, 'main.js'),        
    },
    module: {        
        rules: [{
            test: /\.vue$/,
            use: 'vue-loader',
        }],
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
    output: {
        filename: '[name].js',
        path: path.join(__dirname,'dist'),
    },
};