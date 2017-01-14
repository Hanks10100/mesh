import { computeLayout } from './layout'

function unit (number) {
  if (Number(number) !== 0 && typeof WXEnvironment === 'object' && WXEnvironment.platform === 'Web') {
    return number + 'px'
  }
  return number
}

export function parseLayout (layout) {
  if (Array.isArray(layout)) {
    return layout
  }
  if (typeof layout === 'string') {
    return layout.split(/\s*\|\s*/).map(pair => pair.split(/\s*\,\s*/).map(Number))
  }
  return []
}

// 根据属性值计算布局样式
export function getMeshStyle (props) {
  const width = Number(props.width) || 750
  const column = Number(props.column) || 12
  const layout = parseLayout(props.layout || [])
  const gap = Number(props.gap) || 0

  const ratio = (width + gap) / column
  const origins = computeLayout({ column, layout })

  // 计算外框样式
  const wrapperStyle = {
    position: 'relative',
    width: unit(width),
    height: unit(origins.pop().y * ratio - gap)
  }

  // 计算布局样式
  const layoutStyle = layout.map((size, index) => {
    const coord = origins[index]
    return {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      top: unit(coord.y * ratio),
      left: unit(coord.x * ratio),
      width: unit(size[0] * ratio - gap),
      height: unit(size[1] * ratio - gap)
    }
  })

  return { wrapperStyle, layoutStyle }
}
