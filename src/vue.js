import { parseChildren, getMeshStyle } from './parser'

// filter empty vnode
function filterChildren (children) {
  if (Array.isArray(children)) {
    return children.filter(vnode => !!vnode.tag)
  }
  return []
}

function install (Vue) {
  Vue.component('mesh', {
    props: {
      width: [Number, String], // default 750
      column: [Number, String], // default 12
      gap: [Number, String], // default 0
      orders: [Array, String],
      offsets: [Array, String],
      layout: {
        type: [Array, String],
        required: true,
        default: []
      }
    },

    render (createElement) {
      const children = filterChildren(this.$slots.default)
      const { wrapperStyle, layoutStyle } = getMeshStyle(this, parseChildren(this, children))
      return createElement(
        'div',
        { staticStyle: wrapperStyle },
        children.map((vnode, i) => {
          vnode.data.staticStyle = Vue.util.extend(vnode.data.staticStyle || {}, layoutStyle[i])

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

// auto install
if (typeof Vue === 'function') {
  install(Vue)
}

export default {
  install
}
