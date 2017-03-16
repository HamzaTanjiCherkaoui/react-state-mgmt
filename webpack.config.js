const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const port = 9000;

module.exports = (env) => {
    return {
        entry: {
            main: [
                'react-hot-loader/patch',
                `webpack-dev-server/client?http://localhost:${port}`,
                'webpack/hot/only-dev-server',
                './src/index.jsx'
            ],
            vendor: './src/vendor.js'
        },

        output: {
            path: path.resolve(__dirname, 'build'),
            publicPath: '/',
            filename: '[name].[hash].js'
        },

        resolve: {
            enforceExtension: false,
            extensions: ['.js', '.jsx', '.js']
        },

        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['env', {modules: false}],
                                'stage-1',
                                'react'
                            ],
                            plugins: [
                                'transform-decorators-legacy',
                                'transform-runtime',
                                'react-hot-loader/babel'
                            ]
                        }
                    }],
                    include: path.resolve(__dirname, 'src')
                },

                {
                    test: /\.css$/,
                    use: ExtractTextWebpackPlugin.extract({
                        loader: [
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true,
                                    importsLoader: 1
                                }
                            }
                        ]
                    })
                }
            ]
        },

        plugins: [
            new ExtractTextWebpackPlugin({filename: 'main.css', disable: false, allChunks: true}),
            new HtmlWebpackPlugin({
                template: './src/index.html',
                title: 'Instiview'
            }),

            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
        ],

        devtool: 'inline-source-map',
        devServer: {
            port,
            stats: 'minimal',
            hot: true,
            historyApiFallback: true
        }
    };
};