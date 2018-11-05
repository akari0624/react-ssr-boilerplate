const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BABEL_Loaders = require('./webpack.config.base').BABEL_Loaders;
const  CSS_Loaders = require('./webpack.config.base').CSS_Loaders;
const  ASSET_Loaders = require('./webpack.config.base').ASSET_Loaders;

const LoaderModuleRulesArr = BABEL_Loaders.concat(CSS_Loaders, ASSET_Loaders);


module.exports = {
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        path: path.resolve(__dirname, 'builded'),
        filename: '[name].js',
        chunkFilename:'[name].js'
    },
    mode: 'production',
    module: {
        rules: LoaderModuleRulesArr
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },

    optimization: {
        splitChunks: {
            chunks:'all'
        },
        minimizer: [
            new UglifyJSPlugin({
                uglifyOptions: {
                    compress: {
                        drop_console: true,
                    }
                }
            })
        ]
    }
};


      //   splitChunks 精準一點的設定法     http://www.cnblogs.com/ufex/p/8758792.html
// chunks: 'initial', // 只对入口文件处理
// cacheGroups: {
//     'vendor': { // split `node_modules`目录下被打包的代码到 `builded/vendor.js && .css` 没找到可打包文件的话，则没有。css需要依赖 `ExtractTextPlugin`
//         test: /node_modules\//,
//         name: 'vendor',
//         priority: 10,
//         enforce: true
//     },
//     'commons': { // split test值裡的目录下被打包的代码到`builded/commons.js && .css`
//         test: /actions\/|components\/|APICall\/|reducers\/|type\//,
//         name: 'commons',
//         priority: 10,
//         enforce: true
//     }
// }

     //   splitChunks 最簡單的設定法
// optimization: {
//   splitChunks: {
//       chunks:'all'
//   }

// }