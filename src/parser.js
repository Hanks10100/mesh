import { computeLayout } from './layout'

export function unit (number) {
  if (!number) return 0
  if (typeof WXEnvironment === 'object' && WXEnvironment.platform !== 'Web') {
    return Number(number)
  }
  return number + 'px'
}

function parsePair (pair) {
  return pair.split(/\s*\,\s*/).map(Number)
}

// parse string layout param
export function parseLayout (layout) {
  if (typeof layout === 'string') {
    return layout.split(/\s*\|\s*/).map(parsePair)
  }
  return Array.isArray(layout) ? layout : []
}

function defaultPicker (vnode, attr) {
  const attrs = vnode.data.attrs
  if (attrs && attrs[attr]) {
    return attrs[attr]
  }
  return null
}

export function parseChildren (props, children, picker = defaultPicker) {
  if (!Array.isArray(children)) return

  let orders = Array.isArray(props.orders) ? props.orders : []
  let offsets = Array.isArray(props.offsets) ? props.offsets : []

  if (typeof props.orders === 'string') {
    orders = parsePair(props.orders)
  }
  if (typeof props.offsets === 'string') {
    offsets = parseLayout(props.offsets)
  }

  children.reduce((index, vnode, i) => {
    const orderProp = picker(vnode, 'mesh-order') || picker(vnode, 'meshOrder')
    const offsetProp = picker(vnode, 'mesh-offset') || picker(vnode, 'meshOffset')
    const order = Number(orderProp) || (index + 1)
    if (orderProp || !orders[i]) {
      orders.splice(i, 1, order)
    }
    if (offsetProp || !offsets[i]) {
      offsets.splice(i, 1, parsePair(offsetProp || '0,0'))
    }
    return order
  }, 0)

  return { orders, offsets }
}

export function getMeshStyle (props, childrenProps = {}) {
  const width = Number(props.width) || 750
  const column = Number(props.column) || 12
  const layout = parseLayout(props.layout || [])
  const orders = childrenProps.orders || layout.map((_, i) => i + 1)
  const offsets = childrenProps.offsets || layout.map((_) => [0, 0])
  const gap = Number(props.gap) || 0

  const ratio = (width + gap) / column
  const origins = computeLayout(column, layout)

  return {
    wrapperStyle: {
      position: 'relative',
      width: unit(width),
      height: unit(origins.pop()[1] * ratio - gap)
    },
    layoutStyle: orders.map(i => ({
      position: 'absolute',
      top: unit((origins[i-1][1] + offsets[i-1][1]) * ratio),
      left: unit((origins[i-1][0] + offsets[i-1][0]) * ratio),
      width: unit(layout[i-1][0] * ratio - gap),
      height: unit(layout[i-1][1] * ratio - gap)
    }))
  }
}
