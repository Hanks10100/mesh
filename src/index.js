import { computeLayout } from './layout'
import { getMeshStyle } from './parser'

function getChildren (children) {
  if (Array.isArray(children)) {
    return children.filter(vnode => !!vnode.tag)
  }
  return []
}

function install (Vue) {
  Vue.component('mesh', {
    name: 'mesh',
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
      },
      gap: {
        type: Number,
        default: 0
      }
    },

    render (h, context) {
      const { wrapperStyle, layoutStyle } = getMeshStyle(this, computeLayout(this))
      const children = getChildren(this.$slots.default)
      return h('div', { staticStyle: wrapperStyle }, children.map((vnode, i) => {
        vnode.data.staticStyle = layoutStyle[i]
        const options = vnode.componentOptions
        if (options.tag === 'mesh') {
          if (!options.propsData) options.propsData = {}
          options.propsData.width = parseFloat(layoutStyle[i].width)
        }
        return vnode
      }))
    }
  })
}

export default {
  install
}
