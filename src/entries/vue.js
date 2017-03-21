import { getMeshStyle } from '../parser'

// filter empty vnode
function filterChildren (children) {
  if (Array.isArray(children)) {
    return children.filter(vnode => !!vnode.tag)
  }
  return []
}

function pick (vnode, attr) {
  const attrs = vnode.data.attrs
  if (attrs && attrs[attr]) {
    return attrs[attr]
  }
  return null
}

function parseOrders (props, children) {
  if (!Array.isArray(children)) return

  let orders = Array.isArray(props.orders) ? props.orders : []

  if (typeof props.orders === 'string') {
    orders = props.orders.split(/\s*\,\s*/).map(Number)
  }

  children.reduce((index, vnode, i) => {
    const prop = pick(vnode, 'mesh-order') || pick(vnode, 'meshOrder')
    const order = Number(prop) || (index + 1)
    if (prop || !orders[i]) {
      orders.splice(i, 1, order)
    }
    return order
  }, 0)

  return orders
}

function install (Vue) {
  Vue.component('mesh', {
    props: {
      width: [Number, String], // default 750
      column: [Number, String], // default 12
      gap: [Number, String], // default 0
      orders: [Array, String],
      layout: {
        type: [Array, String],
        required: true,
        default: []
      }
    },

    render (createElement) {
      const children = filterChildren(this.$slots.default)
      const { wrapperStyle, layoutStyle } = getMeshStyle(this, parseOrders(this, children))
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
