const httpImportPlugin = () => ({
    name: "esbuild:http",
    setup(build) {
        let https = require("https");
        let http = require("http");
    
        // 1. 拦截 CDN 请求
        build.onResolve({ filter: /.*/, namespace: "http-url" }, (args) => ({
            // 重写路径
            path: new URL(args.path, args.importer).toString(),
            namespace: "http-url",
        }));
    
        // 2. 通过 fetch 请求加载 CDN 资源
        build.onLoad({ filter: /.*/, namespace: "http-url" }, async (args) => {
            let contents = await new Promise((resolve, reject) => {
            function fetch(url) {
                console.log(`Downloading: ${url}`);
                let lib = url.startsWith("https") ? https : http;
                let req = lib
                    .get(url, (res) => {
                    if ([301, 302, 307].includes(res.statusCode)) {
                        // 重定向
                        fetch(new URL(res.headers.location, url).toString());
                        req.abort();
                    } else if (res.statusCode === 200) {
                        // 响应成功
                        let chunks = [];
                        res.on("data", (chunk) => chunks.push(chunk));
                        res.on("end", () => resolve(Buffer.concat(chunks)));
                    } else {
                        reject(
                            new Error(`GET ${url} failed: status ${res.statusCode}`)
                        );
                        }
                    })
                    .on("error", reject);
                }
            fetch(args.path);
        });
        return { contents };
        });
    },
})

require('esbuild').build({
    absWorkingDir: process.cwd(),
    entryPoints: ['./src/index.jsx'],
    outdir: "dist",
    bundle: true,
    format: 'esm',
    splitting: true,
    sourcemap: true,
    metafile: true,
    plugins: [httpImportPlugin()]
}).then(() => {
    console.log('🚀 Build Finished!')
}).catch(() => process.exit(1))
