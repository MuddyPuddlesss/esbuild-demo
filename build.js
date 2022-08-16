const { build, buildSync, serve } = require('esbuild');

async function runBuild() {
    // 异步方法 返回一个Promise
    const result = await build({
        // 如下是一些常见的配置
        // 当前项目根目录
        absWorkingDir: process.cwd(),
        // 入口文件列表，为一个数组
        entryPoints: ["./src/index.jsx"],
        // 打包产物目录
        outdir: "dist",
        // 是否需要打包，一般设置为 true
        bundle: true,
        // 模块格式，包括 esm, commonjs, iife
        format: "esm",
        // 需要排除打包的依赖列表
        external: [],
        // 是否开启自动拆包
        splitting: true,
        // 是否生成 SourceMap 文件
        sourcemap: true,
        // 是否生成打包的元信息文件
        metafile: true,
        // 是否进行代码压缩
        minify: false,
        // 是否开启 watch 模式， 在watch模式下代码变动则会出发重新打包
        watch: false,
        // Esbuild 内置了一系列的 loader，包括 base64、binary、CSS、dataurl、file、js(x)、ts(x)、text、json
        // 针对一些特殊的文件，调用不同的loader进行加载
        loader: {
            '.png': "base64"
        }
    })
    console.log(result)
}

runBuild()