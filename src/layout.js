export function isEqual (pa, pb) {
  return pa[0] === pb[0] && pa[1] === pb[1]
}

export function getCoord (point, vector) {
  return [
    [point[0], point[1]],
    [point[0] + vector[0], point[1]],
    [point[0], point[1] + vector[1]],
    [point[0] + vector[0], point[1] + vector[1]]
  ]
}

// AΔB = (A - B)∪(B - A)
export function xor (A, B) {
  return []
    .concat(A.filter(a => B.every(b => !isEqual(a, b))))
    .concat(B.filter(b => A.every(a => !isEqual(a, b))))
}

// Caculate the next origin
export function getOrigin (boundary) {
  let x = Number.MAX_VALUE
  let y = Number.MAX_VALUE
  boundary.forEach(point => {
    if (point[1] < y) {
      x = point[0]
      y = point[1]
    } else if (point[1] === y) {
      x = (point[0] < x) ? point[0] : x
    }
  })
  return [x, y]
}

// Caculate the origins of the layout
export function computeLayout (column, layout) {
  const coords = [[0, 0]]
  let origin = [0, 0]
  let boundary = [origin, [Number(column), 0]]

  layout.forEach(vector => {
    boundary = xor(boundary, getCoord(origin, vector))
    origin = getOrigin(boundary)
    coords.push(origin)
  })

  return coords
}
