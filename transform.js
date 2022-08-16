const { transform, transformSync } = require('esbuild')

const runTransform = async() => {
    // 第一个参数是代码字符串，第二个参数为编译配置
    const content = await transform(
        "const isNull = (str: string): boolean => str.length > 0",
        {
            sourcemap: true,
            loader: "tsx"
        }
    )
    console.log(content)
}

runTransform()