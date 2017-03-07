import buble from 'rollup-plugin-buble'

export default {
  moduleName: 'WeexMesh',
  entry: './src/mesh.js',
  dest: './index.js',
  format: 'umd',
  plugins: [
    buble()
  ]
}
