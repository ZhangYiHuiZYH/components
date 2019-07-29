
const path = require("path");
const webpack = require("webpack");
// const uglify = require("uglifyjs-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
 
module.exports = {
    devtool: 'source-map',
    entry: "./src/index.js",//入口文件，就是上步骤的src目录下的index.js文件，
    output: {
        path: path.resolve(__dirname, './lib'),//输出路径，就是上步骤中新建的dist目录，
        publicPath: '/lib/',
        filename: 'msg.min.js',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {     //处理js中引入的css
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    use: ['vue-style-loader', 'css-loader']
                })
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            },
            {
                test: /\.less$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    { loader: "less-loader" }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpg|gif|ttf|svg|woff|eot)$/,
                loader: 'url-loader',
                query: {
                    limit: 30000,
                    name: '[name].[ext]?[hash]'
                }
            }
        ],
        // loaders: [
        // { test: /\.js$/, loader: 'babel', exclude: /node_modules/ }
        // ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new ExtractTextPlugin({
            filename: 'vue-car.min.css',
            allChunks: true
        })
    ],
     resolve: {
        alias: {
        'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    externals: ['vue'],
    performance: {
        hints: false
    },
};