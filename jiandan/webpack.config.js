const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    //页面入口文件配置
    entry: path.resolve(__dirname, './app.js'),
    //入口文件输出配置
    output: {
        path: path.resolve(__dirname, 'dist'),
        // publicPath: 'dist/',
        filename: 'bundle.js'
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }, {
                test: /\.(png|jpg|jpeg|gif|svg)/i,
                include: path.join(__dirname, './src/assets'),

                // exclude: /node_modules/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 15 * 1024,
                        publicPath: 'dist/',
                        outputPath: 'dist/assets'
                    }
                }
            }, {
                test: /\.html$/,
                loader: 'html-withimg-loader'
            }, {
                test: /\.scss$/,
                exclude: /node_modules/,
                // include: path.resolve(__dirname, './src'),
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    publicPath: './dist',
                    use: [{
                            loader: 'css-loader',
                            options: {
                                url: false,
                                minimize: true,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'resolve-url-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            /*{
                       test: /\.css$/,
                       exclude: /node_modules/,
                       loaders: ['style-loader', 'css-loader'],
                   },*/
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader", options: { importLoaders: 1 } },
                    { loader: "postcss-loader" }
                ],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            // template: './src/index.html',
            template: 'html-withimg-loader!' + path.resolve(__dirname, 'src/index.html'),
            filename: 'index-bundle.html',
            minify: {
                minimize: true,
                removeConments: true,
                collapseWhitespace: true,
                minifyCSS: true,
                minifyJS: true
            }
        }),
        new UglifyjsWebpackPlugin({
            exclude: /node_modules/,
        }),
        new MiniCssExtractPlugin({
            filename: "style.css"
        }),
        new ExtractTextPlugin({
            filename: 'style.css'
        })
    ]
};