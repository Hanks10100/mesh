import { getMeshStyle } from './parser'

// filter empty vnode
function filterChildren (children) {
  if (Array.isArray(children)) {
    return children.filter(vnode => !!vnode.tag)
  }
  return []
}

function extend (to, _from) {
  for (const key in _from) {
    to[key] = _from[key]
  }
  return to
}

function install (Vue) {
  Vue.component('mesh', {
    name: 'mesh',
    props: {
      width: [Number, String], // default 750
      column: [Number, String], // default 12
      gap: [Number, String], // default 0
      layout: {
        type: [Array, String],
        required: true,
        default: []
      }
    },

    render (createElement) {
      const { wrapperStyle, layoutStyle } = getMeshStyle(this)
      return createElement(
        'div',
        { staticStyle: wrapperStyle },
        filterChildren(this.$slots.default).map((vnode, i) => {
          vnode.data.staticStyle = extend(vnode.data.staticStyle || {}, layoutStyle[i])

          // support nested mesh
          const options = vnode.componentOptions
          if (options && options.tag === 'mesh') {
            if (!options.propsData) options.propsData = {}
            options.propsData.width = parseFloat(layoutStyle[i].width)
          }
          return vnode
        })
      )
    }
  })
}

// auto install in browser
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
