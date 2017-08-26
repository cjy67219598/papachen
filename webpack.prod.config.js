let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let webpack = require("webpack");
module.exports = {
    entry:{
        index:path.resolve(__dirname,"src/main.js")
    },
    output:{
        path:path.resolve(__dirname,"dist/javascript"),
        filename:"[name].js"
    },
    resolve: {
        extensions: [".js", ".vue", ".json"],
        alias: {
            "vue$": "vue/dist/vue.esm.js"
        }
    },
    module:{
        loaders: [{
            test:/\.vue$/,
            use:[{
                loader:"vue-loader"
            }]
        },{
            test: /\.js$/,
            exclude:/node_modules/,    //排除目录
            use:[{
                loader: "babel-loader",
                options:{
                    presets:["es2015"]
                }
            }]
        },{
            test: /iview.src.*?js$/,
            use:[{
                loader: "babel-loader",
                options:{
                    presets:["es2015"]
                }
            }]
        },{
            test: /\.less$/,
            use: [{
                loader:"style-loader"
            },{
                loader:"css-loader",
                options:{
                    minimize:true,
                }
            },{
                loader:"postcss-loader"
            },{
                loader:"less-loader",
                options:{
                    strictMath: true,
                    noIeCompat: true
                }
            }]
        },{
            test: /\.css$/,
            use: [{
                loader:"style-loader"
            },{
                loader:"css-loader",
                options:{
                    minimize:true,
                }
            }]
        },{
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            use:[{
                loader: "file-loader",
                options:{
                    outputPath:"../files/",  //相对于js的路径
                    name:"[name].[hash].[ext]"
                }
            }]
        },{
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            use:[{
                loader: "file-loader",
                options:{
                    outputPath:"../files/",  //相对于js的路径
                    name:"[name].[hash].[ext]"
                }
            }]
        },{
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            use:[{
                loader: "file-loader",
                options:{
                    outputPath:"../files/",  //相对于js的路径
                    name:"[name].[hash].[ext]"
                }
            }]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename:path.resolve(__dirname,"dist/index.html"),
            template:path.resolve(__dirname,"src/index.html"),
            inject: true
        }),
        new webpack.optimize.UglifyJsPlugin({ //js压缩
            compress:{
                warnings: true,
                drop_debugger: true,
                drop_console: true
            }
        })
    ]
}