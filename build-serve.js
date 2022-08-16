const { serve } = require('esbuild')

const runBuild = () => {
    serve(
        {
            port: 8888,
            servedir: './dist'
        },
        {
            absWorkingDir: process.cwd(),
            entryPoints: ['./src/index.jsx'],
            bundle: true,
            format: 'esm',
            splitting: true,
            sourcemap: true,
            ignoreAnnotations: true,
            metafile: true
        }
    ).then((server) => {
        console.log("Http server start at port", server.port)
    })
}

runBuild()