import { computeLayout } from './layout'

export function unit (number) {
  if (!number) return 0
  if (typeof WXEnvironment === 'object' && WXEnvironment.platform !== 'Web') {
    return Number(number)
  }
  return number + 'px'
}

// parse string layout param
export function parseLayout (layout) {
  if (typeof layout === 'string') {
    return layout.split(/\s*\|\s*/).map(pair => pair.split(/\s*\,\s*/).map(Number))
  }
  return Array.isArray(layout) ? layout : []
}

export function getMeshStyle (props, _orders) {
  const width = Number(props.width) || 750
  const column = Number(props.column) || 12
  const layout = parseLayout(props.layout || [])
  const orders = _orders || layout.map((_, i) => i + 1)
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
      top: unit(origins[i-1][1] * ratio),
      left: unit(origins[i-1][0] * ratio),
      width: unit(layout[i-1][0] * ratio - gap),
      height: unit(layout[i-1][1] * ratio - gap)
    }))
  }
}
