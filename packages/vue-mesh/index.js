/**
 * vue-mesh v0.3.0
 * Author: Hanks <zhanghan.me@gmail.com>
 * Build: 2017-03-21 20:19
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueMeshComponent = factory());
}(this, (function () { 'use strict';

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

// filter empty vnode
function filterChildren (children) {
  if (Array.isArray(children)) {
    return children.filter(function (vnode) { return !!vnode.tag; })
  }
  return []
}

function pick (vnode, attr) {
  var attrs = vnode.data.attrs;
  if (attrs && attrs[attr]) {
    return attrs[attr]
  }
  return null
}

function parseOrders (props, children) {
  if (!Array.isArray(children)) { return }

  var orders = Array.isArray(props.orders) ? props.orders : [];

  if (typeof props.orders === 'string') {
    orders = props.orders.split(/\s*\,\s*/).map(Number);
  }

  children.reduce(function (index, vnode, i) {
    var prop = pick(vnode, 'mesh-order') || pick(vnode, 'meshOrder');
    var order = Number(prop) || (index + 1);
    if (prop || !orders[i]) {
      orders.splice(i, 1, order);
    }
    return order
  }, 0);

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

    render: function render (createElement) {
      var children = filterChildren(this.$slots.default);
      var ref = getMeshStyle(this, parseOrders(this, children));
      var wrapperStyle = ref.wrapperStyle;
      var layoutStyle = ref.layoutStyle;
      return createElement(
        'div',
        { staticStyle: wrapperStyle },
        children.map(function (vnode, i) {
          vnode.data.staticStyle = Vue.util.extend(vnode.data.staticStyle || {}, layoutStyle[i]);

          // support nested mesh
          var options = vnode.componentOptions;
          if (options && options.tag === 'mesh') {
            if (!options.propsData) { options.propsData = {}; }
            options.propsData.width = parseFloat(layoutStyle[i].width);
          }

          return vnode
        })
      )
    }
  });
}

// auto install
if (typeof Vue === 'function') {
  install(Vue);
}

var vue = {
  install: install
};

return vue;

})));
