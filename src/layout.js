export function isEqual (pa, pb) {
  return pa.x === pb.x && pa.y === pb.y
}

export function getCoord (point, vector) {
  return [
    { x: point.x, y: point.y },
    { x: point.x + vector[0], y: point.y },
    { x: point.x, y: point.y + vector[1] },
    { x: point.x + vector[0], y: point.y + vector[1] }
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
    if (point.y < y) {
      x = point.x
      y = point.y
    } else if (point.y === y) {
      x = (point.x < x) ? point.x : x
    }
  })
  return { x, y }
}

// Caculate the origins of the layout
export function computeLayout (column, layout) {
  const coords = [{ x: 0, y: 0 }]
  let origin = { x: 0, y: 0 }
  let boundary = [origin, { x: Number(column), y: 0 }]

  layout.forEach(vector => {
    boundary = xor(boundary, getCoord(origin, vector))
    origin = getOrigin(boundary)
    coords.push(origin)
  })

  return coords
}
