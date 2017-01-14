import { computeLayout } from './layout'
import { getGridStyle } from './parser'

function getChildren (children) {
  if (Array.isArray(children)) {
    return children.filter(vnode => !!vnode.tag)
  }
  return []
}

function install (Vue) {
  Vue.component('mesh', {
    name: 'mesh',
    // functional: true,
    props: {
      width: {
        type: Number,
        default: 750
      },
      column: {
        type: Number,
        required: true,
        default: 12
      },
      layout: {
        type: Array,
        required: true,
        default: []
      }
    },

    render (h) {
      const { wrapperStyle, layoutStyle } = getGridStyle(this, computeLayout(this))
      const children = getChildren(this.$slots.default)
      children.forEach((vnode, i) => {
        vnode.data.staticStyle = layoutStyle[i]
      })
      return h('div', { staticStyle: wrapperStyle }, children)
    }
  })
}

export default {
  install
}
