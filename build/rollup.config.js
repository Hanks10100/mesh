import buble from 'rollup-plugin-buble'

export default {
  moduleName: 'WeexMesh',
  entry: './src/index.js',
  dest: './dist/index.js',
  format: 'umd',
  sourceMap: 'inline',
  plugins: [
    buble()
  ]
}
