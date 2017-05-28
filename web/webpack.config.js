const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const pack = require('./package.json')

const isProduction = false
const sourcePath = 'src/'
const outputFolder = 'dist'

function isVendor(module) {
    const context = module.context

    // You can perform other similar checks here too.
    // Now we check just node_modules.
    return context && context.indexOf('node_modules') >= 0
}


const plugins = [
    isProduction ? null : new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: isVendor,
        filename: '[name].[hash].js',
    }),
    new HtmlWebpackPlugin({
        // title: pack.name,
        // description: pack.description,
        // keywords: pack.keywords.join(','),
        // author: pack.author,
        // url: pack.homepage,
        // image: './src/theme/tf-icon-blue.png',
        // googleVerify: 'TiJwi3K_TfQkoxipbXzkuY12b9HMr_W096CK1ZZq4X4',
        template: `${__dirname}/src/index.ejs`,
        mountId: 'app',
        alwaysWriteToDisk: true // needed for dev
    }),
]

const entry = {
    app: `${__dirname}/${outputFolder}`,
    vendor: [isProduction ? null : 'webpack/hot/only-dev-server'].filter(e => e),
}

const test = /\.ts[x]?$/
const config = {
    entry,
    output: {
        path: `/${outputFolder}`,
        chunkFilename: '[name].js',
        filename: "bundle.js"
    },
    plugins,
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: test,
                loader: "awesome-typescript-loader"
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/, loader: "source-map-loader" },
            {
                test: test,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: { /* Loader options go here */ }
            }
        ]
    }
}

config.devServer = {
    historyApiFallback: true,
    contentBase: '/',
    compress: true,
    inline: true,
    port: 9000,
    host: '0.0.0.0',
    hot: true,
    stats: {
        assets: false,
        colors: true,
        chunks: false,
        version: false,
    }
}

module.exports = config