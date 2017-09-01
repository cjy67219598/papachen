let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry:{
        index:path.resolve(__dirname,"src/main.js")
    },
    output:{
        path:path.resolve(__dirname,"dev"),
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
                    sourceMap:true //是否显示路径
                }
            },{
                loader:"less-loader",
                options:{
                    sourceMap:true //是否显示路径
                }
            }]
        },{
            test: /\.css$/,
            use: [{
                loader:"style-loader"
            },{
                loader:"css-loader",
                options:{
                    sourceMap:true //是否显示路径
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
            filename:path.resolve(__dirname,"dev/index.html"),
            template:path.resolve(__dirname,"src/index.html"),
            inject: true
        })
    ]
}