const execa = require('execa')
async function run() {
    await execa('rollup', ['-c'], { stdio: 'inherit' })
}
run().then(() => console.log('finished build'))

