import json from '@rollup/plugin-json'
import ts from 'rollup-plugin-typescript2'
import resolvePlugin from '@rollup/plugin-node-resolve'
import path from 'path'
import commonjs from 'rollup-plugin-commonjs';
//工具函数，能拿到当前包下的文件
const packageJson = require('./package.json')
const resolve = p => path.resolve(__dirname, p)
const buildOptions = packageJson.buildOptions || {}
const fileName = 'sakuraframework'
const moduleName = buildOptions.name

function createConfig(buildOptions, fileName, moduleName) {
    const ouputOptions = {
        "esm-bundler": {
            file: resolve(`dist/${fileName}.esm-bundler.js`),
            format: 'es'
        },
        "esm-browser": {
            file: resolve(`dist/${fileName}.esm-browser.js`),
            format: 'es'
        },
        "cjs": {
            file: resolve(`dist/${fileName}.cjs.js`),
            format: 'cjs'
        },
        "global": {
            file: resolve(`dist/${fileName}.global.js`),
            format: 'iife'
        }
    }
    return buildOptions.formats.map(format => {
        const output = ouputOptions[format]
        output.name = moduleName
        output.sourcemap = true
        return {
            input: resolve('src/index.ts'),
            output,
            plugins: [
                resolvePlugin(),
                commonjs({
                    include: 'node_modules/**',  // Default: undefined
                    // if true then uses of `global` won't be dealt with by this plugin
                    ignore: ['conditional-runtime-dependency']
                }),
                json(),
                ts({
                    tsconfig: path.resolve(__dirname, 'tsconfig.json')
                }),
            ]
        }
    })
}
export default createConfig(buildOptions, fileName, moduleName)