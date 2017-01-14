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
    functional: true,
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
      const props = context.props
      const { wrapperStyle, layoutStyle } = getMeshStyle(props, computeLayout(props))
      const children = getChildren(context.children)
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
