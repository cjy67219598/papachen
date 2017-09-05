let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let webpack = require("webpack");
let isProd = process.env.NODE_ENV === "production";
let source = isProd ? "dist" : "dev";
let config = {
    entry:{
        index:path.resolve(__dirname,"src/main.js")
    },
    output:{
        path:path.resolve(__dirname,source),
        filename:"[name].js"
    },
    resolve: {
        extensions: [".js", ".vue", ".json"],
        alias: {
            "vue$": "vue/dist/vue.esm.js"
        }
    },
    module:{
        rules: [{
            test:/\.vue$/,
            use:[{
                loader: "vue-loader"
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
                    sourceMap:!isProd, //是否显示路径
                    minimize:isProd  //是否压缩css
                }
            },{
                loader:"less-loader",
                options:{
                    sourceMap:!isProd //是否显示路径
                }
            }]
        },{
            test: /\.css$/,
            use: [{
                loader:"style-loader"
            },{
                loader:"css-loader",
                options:{
                    sourceMap:!isProd //是否显示路径
                }
            }]
        },{
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            use:[{
                loader: "file-loader",
                options:{
                    outputPath:"./files/",  //相对于js的路径
                    name:"[name].[hash].[ext]"
                }
            }]
        },{
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            use:[{
                loader: "file-loader",
                options:{
                    outputPath:"./files/",  //相对于js的路径
                    name:"[name].[hash].[ext]"
                }
            }]
        },{
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            use:[{
                loader: "file-loader",
                options:{
                    outputPath:"./files/",  //相对于js的路径
                    name:"[name].[hash].[ext]"
                }
            }]
        }]
    },
    devtool:"#eval-source-map",  //显示sourceMap
    plugins: [
        new HtmlWebpackPlugin({
            filename:path.resolve(__dirname,source + "/index.html"),
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
if(isProd){
    delete config.devtool;
    config.plugins.splice(1,1);
}
module.exports = config;