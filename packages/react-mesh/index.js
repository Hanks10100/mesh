/**
 * react-mesh v0.3.0
 * Author: Hanks <zhanghan.me@gmail.com>
 * Build: 2017-03-22 15:29
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
	typeof define === 'function' && define.amd ? define(['react'], factory) :
	(global.ReactMeshComponent = factory(global.React));
}(this, (function (React) { 'use strict';

React = 'default' in React ? React['default'] : React;

function isEqual (pa, pb) {
  return pa[0] === pb[0] && pa[1] === pb[1]
}

function rect (point, vector) {
  return [
    [point[0], point[1]],
    [point[0] + vector[0], point[1]],
    [point[0], point[1] + vector[1]],
    [point[0] + vector[0], point[1] + vector[1]]
  ]
}

// Caculate the difference of two sets
function diff (A, B) {
  return A.filter(function (a) { return B.every(function (b) { return !isEqual(a, b); }); })
}

// Caculate the symmetric difference of two sets
// AΔB = (A - B)∪(B - A)
function xor (A, B) {
  return diff(A, B).concat(diff(B, A))
}

function nextOrigin (boundary) {
  var x = Number.MAX_VALUE;
  var y = Number.MAX_VALUE;

  for (var i = 0; i < boundary.length; ++i) {
    var point = boundary[i];
    if (point[1] < y) {
      x = point[0];
      y = point[1];
    } else if (point[1] === y) {
      x = (point[0] < x) ? point[0] : x;
    }
  }

  return [x, y]
}

// Caculate the origins of the layout
function computeLayout (column, layout) {
  var origin = [0, 0];
  var boundary = [origin, [Number(column), 0]];

  var coords = [[0, 0]];
  for (var i = 0; i < layout.length; ++i) {
    boundary = xor(boundary, rect(origin, layout[i]));
    coords[i+1] = origin = nextOrigin(boundary);
  }

  return coords
}

function unit (number) {
  if (!number) { return 0 }
  if (typeof WXEnvironment === 'object' && WXEnvironment.platform !== 'Web') {
    return Number(number)
  }
  return number + 'px'
}

// parse string layout param
function parseLayout (layout) {
  if (typeof layout === 'string') {
    return layout.split(/\s*\|\s*/).map(function (pair) { return pair.split(/\s*\,\s*/).map(Number); })
  }
  return Array.isArray(layout) ? layout : []
}

function defaultPicker (vnode, attr) {
  var attrs = vnode.data.attrs;
  if (attrs && attrs[attr]) {
    return attrs[attr]
  }
  return null
}

function parseOrders (props, children, picker) {
  if ( picker === void 0 ) picker = defaultPicker;

  if (!Array.isArray(children)) { return }

  var orders = Array.isArray(props.orders) ? props.orders : [];

  if (typeof props.orders === 'string') {
    orders = props.orders.split(/\s*\,\s*/).map(Number);
  }

  children.reduce(function (index, vnode, i) {
    var prop = picker(vnode, 'mesh-order') || picker(vnode, 'meshOrder');
    var order = Number(prop) || (index + 1);
    if (prop || !orders[i]) {
      orders.splice(i, 1, order);
    }
    return order
  }, 0);

  return orders
}

function getMeshStyle (props, _orders) {
  var width = Number(props.width) || 750;
  var column = Number(props.column) || 12;
  var layout = parseLayout(props.layout || []);
  var orders = _orders || layout.map(function (_, i) { return i + 1; });
  var gap = Number(props.gap) || 0;

  var ratio = (width + gap) / column;
  var origins = computeLayout(column, layout);

  return {
    wrapperStyle: {
      position: 'relative',
      width: unit(width),
      height: unit(origins.pop()[1] * ratio - gap)
    },
    layoutStyle: orders.map(function (i) { return ({
      position: 'absolute',
      top: unit(origins[i-1][1] * ratio),
      left: unit(origins[i-1][0] * ratio),
      width: unit(layout[i-1][0] * ratio - gap),
      height: unit(layout[i-1][1] * ratio - gap)
    }); })
  }
}

function picker (vnode, attr) {
  var props = vnode.props;
  if (props && props[attr]) {
    return props[attr]
  }
  return null
}

function ReactMeshComponent (props) {
  var orders = parseOrders(props, props.children, picker);
  var ref = getMeshStyle(props, orders);
  var wrapperStyle = ref.wrapperStyle;
  var layoutStyle = ref.layoutStyle;
  return React.createElement(
    'div',
    { style: Object.assign({}, props.style, wrapperStyle) },
    React.Children.map(props.children, function (vnode, i) {
      var props = {
        style: Object.assign({}, vnode.props.style, layoutStyle[i])
      };

      // support nested mesh
      if (vnode.type === ReactMeshComponent) {
        props.width = parseFloat(layoutStyle[i].width);
      }

      return React.cloneElement(vnode, props)
    })
  )
}

var ref = React.PropTypes;
var arrayOf = ref.arrayOf;
var number = ref.number;
var oneOfType = ref.oneOfType;
var string = ref.string;
ReactMeshComponent.propTypes = {
  width: oneOfType([number, string]),
  column: oneOfType([number, string]),
  gap: oneOfType([number, string]),
  orders: oneOfType([arrayOf(number), string]),
  layout: oneOfType([arrayOf(arrayOf(number)), string]).isRequired
};

ReactMeshComponent.defaultProps = {
  layout: []
};

return ReactMeshComponent;

})));
