const compressionPlugin = require('compression-webpack-plugin')

module.exports = {
    /** 区分打包环境与开发环境
     * process.env.NODE_ENV==='production'  (打包环境)
     * process.env.NODE_ENV==='development' (开发环境)
     * baseUrl: process.env.NODE_ENV==='production'?"https://cdn.didabisai.com/front/":'front/',
     */

    // 项目部署的基础路径

    // 我们默认假设你的应用将会部署在域名的根部,

    // 例如 https://www.my-app.com/

    // 如果你的应用部署在一个子路径下，那么你需要在这里

    // 指定子路径。比如将你的应用部署在

    // https://www.foobar.com/my-app/

    // 那么将这个值改为 '/my-app/'

    publicPath: process.env.NODE_ENV==='prod'?"./":'', // 构建好的文件输出到哪里

    outputDir: "dist", // where to put static assets (js/css/img/font/...) // 是否在保存时使用‘eslint-loader’进行检查 // 有效值: true | false | 'error' // 当设置为‘error’时，检查出的错误会触发编译失败

    lintOnSave: true, // 使用带有浏览器内编译器的完整构建版本 // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only

    runtimeCompiler: false, // babel-loader默认会跳过`node_modules`依赖. // 通过这个选项可以显示转译一个依赖

    transpileDependencies: [
        /* string or regex */
    ], // 是否为生产环境构建生成sourceMap?

    productionSourceMap: false, // 调整内部的webpack配置. // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md

    chainWebpack: (config) => {
        //设置index.html  的title   
        config.plugin('html').tap(args => {
            args[0].title = '精选小说'
            return args
        })
        // config.plugin('compressionPlugin').use(new compressionPlugin({
        //     test: /\.(js|css|less)$/, // 匹配文件名
        //     threshold: 10240, // 对超过10k的数据压缩
        //     minRatio: 0.8,
        //     deleteOriginalAssets: true // 删除源文件
        // }))
    },

    configureWebpack: () => {
        const config = {
            // webpack 配置的项目名称, 可以在 index.html 中被访问，用来注入页面标题
            name: '精选小说',
            // resolve: {
            //     fallback: {
            //         // 默认情况下，Webpack5 不再包含用于 Node.js 模块的 polyfills，所以引入 path-browserify
            //         path: require.resolve('path-browserify')
            //     }
            // }
        };
        return config
    }, // CSS 相关选项

    css: {
        // 将组件内部的css提取到一个单独的css文件（只用在生产环境）

        // 也可以是传递给 extract-text-webpack-plugin 的选项对象

        // extract: true, // 允许生成 CSS source maps?

        sourceMap: false, // pass custom options to pre-processor loaders. e.g. to pass options to // sass-loader, use { sass: { ... } }

        loaderOptions: {}, // Enable CSS modules for all css / pre-processor files. // This option does not affect *.vue files.

        requireModuleExtension: true
    }, // use thread-loader for babel & TS in production build // enabled by default if the machine has more than 1 cores

    parallel: require("os").cpus().length > 1, // PWA 插件相关配置 // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa

    pwa: {}, // configure webpack-dev-server behavior

    devServer: {
        open: process.platform === "darwin",

        disableHostCheck: false,

        host: "127.0.0.1",

        port: 8080,

        https: false,

        hotOnly: false, // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy

        proxy: null // string | Object

        // before: app => {}
    }, // 第三方插件配置
    pluginOptions: {

    }
};