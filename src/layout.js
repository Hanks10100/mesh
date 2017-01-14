
// 判断两点是否相等
export function isEqual (pa, pb) {
  return pa.x === pb.x && pa.y === pb.y
}

// 获取由起点和一个向量构成的矩形的顶点坐标
export function getRect (origin, vector) {
  return [
    { x: origin.x, y: origin.y },
    { x: origin.x + vector[0], y: origin.y },
    { x: origin.x, y: origin.y + vector[1] },
    { x: origin.x + vector[0], y: origin.y + vector[1] }
  ]
}

// 求集合对称差，参考公式：AΔB = (A - B)∪(B - A)
function xor (A, B) {
  return []
    .concat(A.filter(a => B.every(b => !isEqual(a, b))))
    .concat(B.filter(b => A.every(a => !isEqual(a, b))))
}

// 根据边界集合计算下一个起点的坐标
export function getOrigin (boundary) {
  let x = Number.MAX_VALUE
  let y = Number.MAX_VALUE

  boundary.forEach(point => {
    if (point.y < y) {
      ({ x, y } = point)
    } else if (point.y === y) {
      x = (point.x < x) ? point.x : x
    }
  })

  return { x, y }
}

// =========================================================
//  计算每个图形应该摆放的起始位置
//  @param column: 网格横向总宽度
//  @param layout: 由每个图形的宽高构成的数组 [{x:*,y:*},...]
//  返回值: 每个图形应该摆放的起始位置所构成的数组
// =========================================================
export function computeLayout ({ column, layout }) {
  // 初始化所有格子的起点记录
  const records = [{ x: 0, y: 0 }]

  // 初始化起点和底部边界线
  let origin = { x: 0, y: 0 }
  let boundary = [origin, { x: Number(column), y: 0 }]

  layout.forEach(vector => {
    // 计算新的边界线
    boundary = xor(boundary, getRect(origin, vector))

    // 计算下一个起点的位置
    origin = getOrigin(boundary)

    records.push(origin)
  })

  return records
}
