const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const port = 8080;

module.exports = (env) => {
    return {
        entry: {
            main: env.development ? [
                'react-hot-loader/patch',
                `webpack-dev-server/client?http://localhost:${port}`,
                'webpack/hot/only-dev-server',
                './src/index.jsx'
            ] : './src/index.jsx',
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
                    use: 'babel-loader',
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
                },

                {
                    test: /\.(png|jpg|gif)$/,
                    use: 'file-loader'
                }
            ]
        },

        plugins: [
            new ExtractTextWebpackPlugin({filename: 'main.css'}),
            new HtmlWebpackPlugin({
                template: './src/index.html',
                title: 'React State Management'
            }),

            env.development ? new webpack.HotModuleReplacementPlugin() : null,
            new webpack.NamedModulesPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
        ].filter(p => p !== null),

        devtool: 'cheap-module-source-map',
        stats: {
            maxModules: 0
        },
        devServer: {
            port,
            stats: 'minimal',
            hot: true,
            historyApiFallback: true
        }
    };
};
