const pkg = require('./package.json')

export default {
  input: 'index.js',
  output: [
    { file: pkg.exports.require, format: 'cjs' },
    { file: pkg.exports.import, format: 'esm' }
  ],
  external: ['vue']
}
