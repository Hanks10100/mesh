const fs = require('fs')
const path = require('path')
const zlib = require('zlib')
const rollup = require('rollup')
const watch = require('rollup-watch')
const uglify = require('uglify-js')
const pkg = require('../package.json')
const getConfig = require('./config')

let isWatch = false
if (process.argv[3]) {
  isWatch = process.argv[3] === '--watch' || process.argv[3] === '-w'
}

function runRollupOnWatch(config) {
  const watcher = watch(rollup, config)
  watcher.on('event', event => {
    switch ( event.code ) {
      case 'STARTING':
        console.log('checking rollup-watch version...')
        break

      case 'BUILD_START':
        console.log('bundling...')
        break

      case 'BUILD_END':
        console.log('bundled in ' + path.relative(process.cwd(), config.dest)
          + ' (' + event.duration + 'ms)')
        console.log('Watching for changes...' )
        break

      case 'ERROR':
        console.error('ERROR: ', event.error)
        break

      default:
        console.error('unknown event', event)
    }
  })
}

function build (name) {
  const config = getConfig(name)
  if (!config) {
    console.log(`\n => unkown package ${blue(name)}`)
    return
  }

  if (isWatch) {
    console.log(`\n => watching ${blue(name)} source files\n`)
    return runRollupOnWatch(config)
  } else {
    console.log(`\n => start to build ${blue(name)}\n`)
    buildEntry(name).then(() => buildEntry(name, true))
  }
}

function buildEntry (name, minify) {
  const config = getConfig(name, minify)
  const banner = `/**\n * ${name} v${pkg.version}\n * Author: ${pkg.author}\n * Build: ${now()}\n */\n\n`
  return rollup.rollup(config).then(bundle => {
    let code = bundle.generate(config).code
    if (minify) {
      code = uglify.minify(code, { fromString: true }).code
    }
    return write(config.dest, banner + code, minify)
  })
}

function write (dest, code, zip) {
  return new Promise((resolve, reject) => {
    function report (extra) {
      console.log(`${blue(path.relative(process.cwd(), dest))} ${green(getSize(code))}${light(extra)}`)
      resolve()
    }

    fs.writeFile(dest, code, err => {
      if (err) return reject(err)
      if (zip) {
        zlib.gzip(code, (err, zipped) => {
          if (err) return reject(err)
          report(` (gzipped: ${getSize(zipped)})`)
        })
      } else {
        report('')
      }
    })
  })
}

function getSize (code) {
  return (code.length / 1024).toFixed(2) + 'KB'
}

function blue (str) {
  return `\x1b[1m\x1b[34m${str}\x1b[39m\x1b[22m`
}
function green (str) {
  return `\x1b[1m\x1b[32m${str}\x1b[39m\x1b[22m`
}
function light (str) {
  return `\u001b[32m${str}\u001b[0m`
}

function now () {
  const time = Date.now() - (new Date()).getTimezoneOffset() * 60000
  return (new Date(time)).toISOString().replace('T', ' ').substring(0, 16)
}

// build specific package
build(process.argv[2])
