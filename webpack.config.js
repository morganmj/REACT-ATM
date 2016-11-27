const HtmlWebpackPlugin = require('html-webpack-plugin');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({ template: `${__dirname}/src/index.html`, filename: 'index.html', inject: 'body' });

module.exports = {
    entry: ['./src/index.js'],
    output: {
        path: `${__dirname}/dist`,
        filename: 'index_bundle.js'
    },
    devtool: 'source-map',
    module: {
        preLoaders: [{
            test: /\.jsx$|\.js$/,
            loader: 'eslint-loader',
            include: `${__dirname}/src`,
            exclude: /bundle\.js$/
        }],
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.less$/,
            loader: 'style!css!less'
        }, {
            test: /\.css$/, // Only .css files
            loader: 'style!css?modules&localIdentName=[name]__[local]___[hash:base64:5]' // Run both loaders
        }]
    },
    devServer: {
        inline: true,
        port: 8008,
    },
    plugins: [HTMLWebpackPluginConfig]
};