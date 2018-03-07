var path = require("path");
var webpack = require("webpack");
var fs = require("fs");
var autoprefixer = require("autoprefixer");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin"); // 提取公共部分插件
var HtmlWebpackPlugin = require('html-webpack-plugin'); // 自动生成index.html页面插件
var CopyWebpackPlugin = require('copy-webpack-plugin'); // 拷贝资源插件
var ExtractTextPlugin = require("extract-text-webpack-plugin"); // 抽离css样式，通过require引入的css，会被webpack打包到js中
var ENV = process.env.npm_lifecycle_event; // 直接通过获取启动命令来判断开发/生产环境
var isPro = process.env.NODE_ENV == "production";
var publicPath = "http://127.0.0.1:3000/dist/";
var webpackHotMiddleware = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=10000&reload=true';

var config = {
    entry: {
        vendor1 : ["es5-shim", "es5-sham", "console-polyfill", "babel-polyfill", webpackHotMiddleware],
        vendor2 : ["jquery", "react", "react-dom", webpackHotMiddleware],
        bundle : ["register", webpackHotMiddleware]
    },
    output: {
      path: path.resolve(__dirname, './src/dist'),
      publicPath:publicPath,
      filename: 'js/[name].js',
    },
    externals: {
        // jQuery: 'window.$',
        // 'react': 'React',
        // 'react-dom': 'ReactDOM'
    },
    // devtool: 'eval-source-map',
    module: {
        // 默认的require()方法会在webpack打包的时候去解压，遍历ReactJS及其依赖,
        noParse: [
            path.join(__dirname, "node_modules/react/dist/react.min.js"),
            path.join(__dirname, "node_modules/react-dom/dist/react-dom.min.js"),
            path.join(__dirname, "node_modules/jquery/dist/jquery.min.js"),
            path.join(__dirname, "node_modules/babel-polyfill/dist/polyfill.min.js"),
            path.join(__dirname, "node_modules/console-polyfill/index.js"),
            path.join(__dirname, "node_modules/es5-shim/es5-shim.min.js"),
            path.join(__dirname, "node_modules/es5-shim/es5-sham.min.js")
        ],
        loaders: [
            {
                // es3ify-loader 兼容ie8，将es5转译成es3
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loaders: ["es3ify-loader", "babel-loader"]
            },
            {
                // 识别js中require引入的样式表，并将其转换和兼容处理
                test: /\.(css|scss|sass)$/,
                exclude: /node_modules/,
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: { autoprefixer: true, sourceMap: true, importLoaders: 1 }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                plugins: () => [autoprefixer({ browsers: ['last 2 versions', 'safari >= 5', 'ie 8', 'ie 9','iOS >= 7', 'Android >= 4.1'] })],
                            }
                        },
                        'sass-loader'
                    ]
                }))
            },
            {
                // 图片加载器，可以将较小的图片转成base64，减少http请求
                // 如下配置，将小于8kb的图片转成base64码，大于8192byte的图片将通过file-loader把源文件迁移到指定的路径，并返回新的路径
                // [hash]/[name] hash值，防止重名，如两张图片一样，只会生成同一hash
                test: /\.(png|jpg|gif|svg)$/,
                loader: [
                    'url-loader?limit=8192&name=images/[hash].[ext]',
                    'image-webpack-loader'
                ],
              },
              {
                test: /\.(woff|woff2|eot|ttf)$/,
                loader: 'file-loader?name=fonts/[name].[ext]',
              },
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', ".css", ".scss"], // 用于自行补全文件后缀
        alias: {
            // 设置引入的插件别名或配置路径
            src : path.resolve(__dirname, "./src"),
            public : path.resolve(__dirname, "./src/public"),
            components: path.resolve(__dirname, "./src/public/components"),

            react : path.join(__dirname, "node_modules/react/dist/react.min.js"),
            "react-dom" : path.join(__dirname, "node_modules/react-dom/dist/react-dom.min.js"),
            "babel-polyfill" : path.join(__dirname, "node_modules/babel-polyfill/dist/polyfill.min.js"),
            "console-polyfill" : path.join(__dirname, "node_modules/console-polyfill/index.js"),
            "es5-shim" : path.join(__dirname, "node_modules/es5-shim/es5-shim.min.js"),
            "es5-sham" : path.join(__dirname, "node_modules/es5-shim/es5-sham.min.js"),
            jquery : path.join(__dirname, "node_modules/jquery/dist/jquery.min.js"),
            commonExt: path.resolve(__dirname, "./src/public/js/commonExt"),

            register : path.resolve(__dirname, './src/public/components/register.jsx')
        }    
    },
    plugins: [
        // 配置全局标识
        new webpack.DefinePlugin({ 
            "process.env": { NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development") }
        }),
        new webpack.LoaderOptionsPlugin({
            debug: !isPro
        }),
        // 当脚本有引入以下变量时，会自动加载引入相对应的模块
        new webpack.ProvidePlugin({
            $: "jquery",// 一定要安装低于2.0版本的，否则ie8会报错
            jQuery: "jquery",
            "window.jQuery": "jquery",
            React: 'react',
            ReactDOM: 'react-dom'
        }),
        // 抽离样式
        new ExtractTextPlugin({
            filename:  (getPath) => {
                return getPath('css/style.css');
            },
            allChunks: true
        }),
        // 拷贝资源
        new CopyWebpackPlugin(
            [{
                from: './src/public/plugins/',
                to: 'plugins'
            }]
        ),
        // 提取被引用两次以上的公共部分
        // new CommonsChunkPlugin({
        //     name:"chunk",
        //     minChunks:2,
        //     // minChunks: Infinity //提取所有entry依赖模块
        // }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'chunk',
            chunks: ['vendor2', 'bundle']
        }),

        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
};

// 遍历所有模板中的.html文件，使用HtmlWebpackPlugin引入静态资源(或者用ejs模板生成多个)
var htmlfiles = fs.readdirSync(path.resolve(__dirname, "./src/public/templates"));
htmlfiles.forEach(function(item) {
    var currentpath = path.resolve(__dirname+"/src/public/templates", item);
    var extname = path.extname(currentpath);
    if(fs.statSync(currentpath).isFile() && (extname == ".html" || extname == ".ejs")) {
        var json = {
            template: currentpath, // 设置引入的模板
            filename: path.join(__dirname, './src/dist/views/'+item), // 设置输出路径
            inject: 'body', // 设置js插入位置
            hash: true, // 为所有的资源加上hash值
            chunks: ["style", "vendor1", "vendor2", "chunk", "bundle"], // 指定引入的资源
            showErrors: true // 是否展示错误
        }
        // 生产环境压缩html
        if(isPro) {
            json["minify"] = {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }
        config.plugins.push(
            new HtmlWebpackPlugin(json)
        );
    }
});

if(isPro) {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            mangle: {
                except: ['jQuery', '$', 'exports', 'require', "module"]
            }
        })
    );
}

module.exports = config;