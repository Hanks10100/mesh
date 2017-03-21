const path = require('path')
const replace = require('rollup-plugin-replace')
const buble = require('rollup-plugin-buble')

const configs = {
  'weex-component-mesh': {
    moduleName: 'WeexMeshComponent',
    entry: absolute('src/entries/vue.js'),
    dest: absolute('index.js')
  },
  'vue-mesh': {
    moduleName: 'VueMeshComponent',
    entry: absolute('src/entries/vue.js'),
    dest: absolute('packages/vue-mesh/index.js')
  },
  'react-mesh': {
    moduleName: 'ReactMeshComponent',
    entry: absolute('src/entries/react.js'),
    dest: absolute('packages/react-mesh/index.js')
  }
}

function getConfig (name, minify) {
  const opt = configs[name]
  if (opt) {
    return {
      moduleName: opt.moduleName,
      entry: opt.entry,
      dest: minify ? opt.dest.replace(/\.js$/, '.min.js') : opt.dest,
      format: 'umd',
      plugins: [
        replace({
          'process.env.NODE_ENV': JSON.stringify(minify ? 'production' : 'development')
        }),
        buble()
      ]
    }
  }
}

// get the absolute path
function absolute (str) {
  return path.resolve(__dirname, '..', str)
}

function now () {
  const time = Date.now() - (new Date()).getTimezoneOffset() * 60000
  return (new Date(time)).toISOString().replace('T', ' ').substring(0, 16)
}

module.exports = getConfig
