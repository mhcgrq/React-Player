const path = require('path');

module.exports = {
    entry: ['./src/js/app.jsx'],
    output: {
        path: path.resolve(__dirname, './dist'),
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
                loaders: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap'],
                exclude: /node_modules/
            },
            {
                test: /\.(woff2?|png|jpg)$/,
                use: ['url-loader?limit=10000']
            },
        ]
    },
    devtool: 'eval-source-map',
};
