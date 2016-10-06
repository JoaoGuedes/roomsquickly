var path = require('path');

module.exports = {
    context: __dirname + '/app',
    entry: ['whatwg-fetch', 'app.jsx'],
    output: {
        path: __dirname + '/dist/app',
        filename: 'bundle.js'
    },
    resolve: {
        modulesDirectories: ['node_modules', 'app']
    },
    devtool: 'source-map',
    module: {
        loaders : [
            {
                test : /\.jsx$/,
                loader : 'babel',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['react', 'es2015']
                }
            },
            {
                test : /\.js$/,
                loader : 'babel',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['es2015']
                }
            },
            {
                test : /\.html$/,
                loader: 'file?name=[path][name].[ext]',
                exclude: /node_modules/
            },
            {
                test : /.json$/,
                loader: 'json',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'resolve-url', 'sass?sourceMap']
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            }
        ]
    },
    sassLoader: {
        includePaths: [path.resolve(__dirname, './node_modules')]
    },
    devServer: {
        proxy: {
            '/api/*': {
                target: 'http://localhost:3000/',
                secure: false
            }
        }
    }
};
