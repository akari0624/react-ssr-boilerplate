exports.CSS_Loaders = [

    {
        use: [
            {
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'less-loader',
                options: {
                    javascriptEnabled: true
                }
            }
        ],
        test: /\.less$/

    }, {
        use: [
            'style-loader', 'css-loader'
        ],
        test: /\.css$/
    },



];


exports.BABEL_Loaders = [{
    use:'babel-loader',
    test:/\.(js|jsx)$/,
    exclude:/node_modules/
}]

exports.ASSET_Loaders = [

    {
        use:'file-loader',
        test:/\.(png|jpg|gif|mp4|ogg|svg|css|ttf|woff|woff2)$/
         
       },
       { use: 'url-loader?limit=100000', test: /\.(png|jpg|gif|mp4|ogg|svg|css|ttf|woff|woff2)$/ }


]