export function isEqual (pa, pb) {
  return pa[0] === pb[0] && pa[1] === pb[1]
}

export function rect (point, vector) {
  return [
    [point[0], point[1]],
    [point[0] + vector[0], point[1]],
    [point[0], point[1] + vector[1]],
    [point[0] + vector[0], point[1] + vector[1]]
  ]
}

// Caculate the difference of two sets
function diff (A, B) {
  return A.filter(a => B.every(b => !isEqual(a, b)))
}

// Caculate the symmetric difference of two sets
// AΔB = (A - B)∪(B - A)
export function xor (A, B) {
  return diff(A, B).concat(diff(B, A))
}

export function nextOrigin (boundary) {
  let x = Number.MAX_VALUE
  let y = Number.MAX_VALUE

  for (let i = 0; i < boundary.length; ++i) {
    const point = boundary[i]
    if (point[1] < y) {
      x = point[0]
      y = point[1]
    } else if (point[1] === y) {
      x = (point[0] < x) ? point[0] : x
    }
  }

  return [x, y]
}

// Caculate the origins of the layout
export function computeLayout (column, layout) {
  let origin = [0, 0]
  let boundary = [origin, [Number(column), 0]]

  const coords = [[0, 0]]
  for (let i = 0; i < layout.length; ++i) {
    boundary = xor(boundary, rect(origin, layout[i]))
    coords[i+1] = origin = nextOrigin(boundary)
  }

  return coords
}
