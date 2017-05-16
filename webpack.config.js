const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const argv = require('yargs')
    .alias('p', 'production')
    .argv;

const isDev = argv.production ? !argv.production : true;

const config = {
    entry: isDev
    ? [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://0.0.0.0:3000',
        'webpack/hot/only-dev-server',
        './src/js/Root'
    ]
    : ['./src/js/Root'],
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: 'bundle.js',
        publicPath: path.join(__dirname, './dist/')
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { sourceMap: isDev } },
                    { loader: 'sass-loader', options: { sourceMap: isDev } },
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(woff2?|png|jpg)$/,
                use: ['url-loader?limit=10000']
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': isDev ? JSON.stringify('development') : JSON.stringify('production'),
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './index.html'),
        }),
    ],
};

if (isDev) {
    config.devtool = 'cheap-module-eval-source-map';
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    );
} else {
    // config.plugins.push(
    //     new UglifyJSPlugin({
    //         compress: false,
    //         mangle: false,
    //     })
    // );
}

module.exports = config;
