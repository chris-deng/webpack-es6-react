var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPulgin = require('extract-text-webpack-plugin'); // 从打包文件中提取文件，或者打包成一个独立的文件
var CopyWebpackPlugin = require('copy-webpack-plugin');  // copy资源文件到指定位置
var HtmlWebpackPlugin = require('html-webpack-plugin');  // 将生成的js文件插入到html中
var pkg = require('./package.json');      // package.json文件
var env = process.env.Node_ENV;    // 开发环境还是生产环境

// 环境判断
var isDev = (env === 'dev'),     // 开发环境
    isPro = (env === 'production');   // 生产环境
// 路径指定
var src = {
    html: path.resolve(__dirname, 'src/layouts/index.html'),
    js: path.resolve(__dirname, 'src/main.js'),
    static: path.resolve(__dirname, 'src/static')       // 静态资源文件
};
// 打包后的文件路径
var dist = {
    html: path.resolve(__dirname, 'dist/index.html'),
    static: path.resolve(__dirname, 'dist/static')
};

// 配置打包后资源文件加载的上下文路径
paths = {
    dev: '/',
    product: '/'
};

// 打包配置
var packConfig = {
    entry: './src/main.js',        // 入口文件
    // 输出
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].bundle.js"
    },
    // 模块配置loader
    module: {
        rules: [
            {
                // 将es6转化为es5
                test: /\.jsx?$/,
                use: [{
                    loader: 'babel-loader'
                }],
                exclude: [path.resolve(__dirname, 'node_modules')]
            },
            {
                // 编译css并自动添加css前缀
                test: /\.css$/,
                use: ExtractTextPulgin.extract({
                    use: ['css-loader', 'postcss-loader']
                })
            },
            {
                // scss文件编译
                test: /\.scss$/,
                use: ExtractTextPulgin.extract({
                    use: ['css-loader?minimize', 'postcss-loader', 'sass-loader'],
                    fallback: 'style-loader'    // 当css文件不从js文件中提取的时候，用style-loader去解析
                })
                // use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                // 图片转化，小于8k自动转化为base64编码
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 11920,
                    name: 'images/' + pkg.name + '.[ext]'
                }
            }
        ]
    },
    // 重命名
    resolve: {
        // 引入问件事，自动填充文件后缀
        extensions: [".js", ".jsx", '.json'],
        // 定义别名, 开发工程中可以通过别名来表示设定路径，简化路径描写
        alias: {
            page: path.resolve(__dirname, 'src/pages')
        }
    },
    // 插件
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: {
                    plugins: [autoprefixer]
                }
            }
        }),
        // 将静态资源文件拷贝到打包目录
        new CopyWebpackPlugin([{
            from: src.static,
            to: dist.static
        }]),
        // 从js文件中把css文件抽出来，单独输出成css文件
        new ExtractTextPulgin('[name].min.css')
    ],
    devServer: {
        disableHostCheck: true,
    },
    // 不进行打包的库
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'axios': 'axios'
    }
};

// 根据开发环境决定文件压缩方式
if (isDev) {
    // 生成页面(将生成的js文件和css文件自动插入到html页面)
    packConfig.plugins.push(new HtmlWebpackPlugin({
        path: paths.dev,
        filename: dist.html,
        template: src.html,
        hash: false,
        inject: true,
        minify: {
            collapseWhitespace: false,       // 不折叠空格
            removeComments: false      // 不移除注释
        }
    }));
    // 开发与联调环境开启source-map
    packConfig.devtool = 'source-map';    // 开启source-map
    // 增加开发环境中的接口代理
    packConfig.devServer = {
        proxy: {
            "/": {
                target: 'http://139.199.188.155',
                changeOrigin: true
            }
        }
    };
}
// 生产环境
if (isPro) {
    // 上线路径变化
    packConfig.output.publicPath = '/';
    // 生成页面
    packConfig.plugins.push(new HtmlWebpackPlugin({
        path: paths.product,
        filename: dist.html,
        template: src.html,
        hash: false,
        inject: true,
        minify: {
            collapseWhitespace: true,       // 折叠空格
            removeComments: true,      // 移除注释
            minifyCSS: true         // 压缩css
        }
    }));
    // 生产环境压缩代码
    packConfig.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            compress: {
                warnings: false
            },
            except: ['exports', 'require']
        })
    );
}
module.exports = packConfig;