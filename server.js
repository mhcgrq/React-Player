const webpack = require('webpack');
const exec = require('child_process').exec;
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

const app = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    noInfo: true,
});

exec('webpack --watch');

app.listen(3000, '0.0.0.0', (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Listening at 0.0.0.0:3000/');
});
