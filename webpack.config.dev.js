const path = require('path');
const webpack = require('webpack');



module.exports = {
    entry: ['@babel/polyfill','webpack-hot-middleware/client', './src/index.js'],
    output: {
        path: path.resolve(__dirname, 'src'),
        filename: 'bundle.js',
        publicPath:'/'
    },
    mode:'development',
    module: {
        rules: [
            {
                use:'babel-loader',
                test:/\.(js|jsx)$/,
                exclude:/node_modules/
            }
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ]
};


// ,
//     resolve: {
//         extensions: ['.js', '.jsx']
//     }