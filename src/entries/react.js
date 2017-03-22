import React from 'react'
import { parseOrders, getMeshStyle } from '../parser'

function picker (vnode, attr) {
  const props = vnode.props
  if (props && props[attr]) {
    return props[attr]
  }
  return null
}

export default function ReactMeshComponent (props) {
  const orders = parseOrders(props, props.children, picker)
  const { wrapperStyle, layoutStyle } = getMeshStyle(props, orders)
  return React.createElement(
    'div',
    { style: Object.assign({}, props.style, wrapperStyle) },
    React.Children.map(props.children, (vnode, i) => {
      const props = {
        style: Object.assign({}, vnode.props.style, layoutStyle[i])
      }

      // support nested mesh
      if (vnode.type === ReactMeshComponent) {
        props.width = parseFloat(layoutStyle[i].width)
      }

      return React.cloneElement(vnode, props)
    })
  )
}

const { arrayOf, number, oneOfType, string } = React.PropTypes
ReactMeshComponent.propTypes = {
  width: oneOfType([number, string]),
  column: oneOfType([number, string]),
  gap: oneOfType([number, string]),
  orders: oneOfType([arrayOf(number), string]),
  layout: oneOfType([arrayOf(arrayOf(number)), string]).isRequired
}

ReactMeshComponent.defaultProps = {
  layout: []
}
