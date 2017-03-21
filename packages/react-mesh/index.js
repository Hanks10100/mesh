/**
 * react-mesh v0.3.0
 * Author: Hanks <zhanghan.me@gmail.com>
 * Build: 2017-03-21 20:20
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ReactMeshComponent = factory());
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

var react = {
  getMeshStyle: getMeshStyle
};

return react;

})));
