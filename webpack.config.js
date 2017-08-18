let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry:{
        index:path.resolve(__dirname,"src/main.js")
    },
    output:{
        path:path.resolve(__dirname,"dev/javascript"),
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
            loader: "vue-loader"
        },{
            test: /\.js$/,
            loader: "babel-loader",
            exclude:path.resolve(__dirname,"node_modules"),    //排除目录
            include:[                                           //包含目录
                path.resolve(__dirname,"src")
            ],
            options:{
                presets:["es2015"]
            }
        },{
            test: /\.less$/,
            use: [{
                loader:"style-loader"
            },{
                loader:"css-loader",
                options:{
                    minimize:true,
                    sourceMap:true //是否显示路径
                }
            },{
                loader:"less-loader",
                options:{
                    strictMath: true,
                    noIeCompat: true
                }
            }]
        },{
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: "file-loader",
            options:{
                outputPath:"../files/",  //相对于js的路径
                name:"[name].[hash].[ext]"
            }
        },{
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            loader: "file-loader",
            options:{
                outputPath:"../files/",  //相对于js的路径
                name:"[name].[hash].[ext]"
            }
        },{
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: "file-loader",
            options:{
                outputPath:"../files/",  //相对于js的路径
                name:"[name].[hash].[ext]"
            }
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename:path.resolve(__dirname,"dev/index.html"),
            template:path.resolve(__dirname,"src/index.html"),
            inject: true
        })
    ]
}