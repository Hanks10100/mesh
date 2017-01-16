import { computeLayout } from './layout'

export function unit (number) {
  if (Number(number) !== 0 && typeof WXEnvironment === 'object' && WXEnvironment.platform === 'Web') {
    return number + 'px'
  }
  return Number(number)
}

// parse string layout param
export function parseLayout (layout) {
  if (typeof layout === 'string') {
    return layout.split(/\s*\|\s*/).map(pair => pair.split(/\s*\,\s*/).map(Number))
  }
  return Array.isArray(layout) ? layout : []
}

export function getMeshStyle (props) {
  const width = Number(props.width) || 750
  const column = Number(props.column) || 12
  const layout = parseLayout(props.layout || [])
  const gap = Number(props.gap) || 0

  const ratio = (width + gap) / column
  const origins = computeLayout(column, layout)

  return {
    wrapperStyle: {
      position: 'relative',
      width: unit(width),
      height: unit(origins.pop().y * ratio - gap)
    },
    layoutStyle: layout.map((size, i) => ({
      position: 'absolute',
      top: unit(origins[i].y * ratio),
      left: unit(origins[i].x * ratio),
      width: unit(size[0] * ratio - gap),
      height: unit(size[1] * ratio - gap)
    }))
  }
}
