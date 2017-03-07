import { expect } from 'chai'
import { isEqual, rect, xor, nextOrigin, computeLayout } from '../src/layout'

describe('layout', () => {
  it('exports', () => {
    expect(isEqual).to.be.a.function
    expect(rect).to.be.a.function
    expect(xor).to.be.a.function
    expect(nextOrigin).to.be.a.function
    expect(computeLayout).to.be.a.function
  })

  it('isEqual', () => {
    expect(isEqual([], [])).to.be.true
    expect(isEqual([0, 0], [0, 0])).to.be.true
    expect(isEqual([1, 3], [1, 3])).to.be.true
    expect(isEqual([1, 6], [2, 6])).to.be.false
    expect(isEqual([2, 1], [2, 0])).to.be.false
    expect(isEqual([1, 2], [3, 4])).to.be.false
  })

  it('rect', () => {
    expect(rect([0, 0], [0, 0])).to.be.deep.equal([
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ])
    expect(rect([0, 0], [1, 2])).to.be.deep.equal([
      [0, 0],
      [1, 0],
      [0, 2],
      [1, 2]
    ])
    expect(rect([1, 2], [3, 4])).to.be.deep.equal([
      [1, 2],
      [4, 2],
      [1, 6],
      [4, 6]
    ])
  })

  it('xor', () => {
    const a = [0, 0]
    const b = [1, 0]
    const c = [0, 1]
    const d = [1, 1]
    const e = [2, 0]

    expect(xor([a, b], [])).to.deep.equal([a, b])
    expect(xor([a, b], [a, b])).to.deep.equal([])
    expect(xor([a, b, c], [b, c, d])).to.deep.equal([a, d])
    expect(xor([b, c, d], [a, b, c])).to.deep.equal([d, a])
    expect(xor([a, b, c], [a, b, c, d, e])).to.deep.equal([d, e])
    expect(xor([a, b, c], [d, e])).to.deep.equal([a, b, c, d, e])
  })

  it('nextOrigin', () => {
    expect(nextOrigin([[0,0]])).to.deep.equal([0, 0])
    expect(nextOrigin([[0,0], [1,0]])).to.deep.equal([0, 0])
    expect(nextOrigin([[0,2], [1,0], [2,1]])).to.deep.equal([1, 0])
    expect(nextOrigin([[0,1], [1,0], [2,2]])).to.deep.equal([1, 0])
    expect(nextOrigin([[0,1], [1,2], [2,2]])).to.deep.equal([0, 1])
    expect(nextOrigin([[0,2], [1,0], [2,1], [3,3]])).to.deep.equal([1, 0])
    expect(nextOrigin([[0,2], [1,3], [2,1], [3,0]])).to.deep.equal([3, 0])
    expect(nextOrigin([[0,2], [1,3], [2,2], [3,2]])).to.deep.equal([0, 2])
    expect(nextOrigin([[1,2], [1,0], [2,2], [3,2]])).to.deep.equal([1, 0])
  })

  it('computeLayout', () => {
    expect(computeLayout(2, [[1,1],[1,1]])).to.deep.equal([
      [0, 0],
      [1, 0],
      [0, 1]
    ])
    expect(computeLayout(3, [[2,1],[1,2]])).to.deep.equal([
      [0, 0],
      [2, 0],
      [0, 1]
    ])
    expect(computeLayout(3, [[2,1],[1,2],[2,1]])).to.deep.equal([
      [0, 0],
      [2, 0],
      [0, 1],
      [0, 2]
    ])
    expect(computeLayout(4, [[4,1],[1,3],[3,3]])).to.deep.equal([
      [0, 0],
      [0, 1],
      [1, 1],
      [0, 4]
    ])
    expect(computeLayout(4, [[4,1],[1,2],[1,2],[2,1],[2,1]])).to.deep.equal([
      [0, 0],
      [0, 1],
      [1, 1],
      [2, 1],
      [2, 2],
      [0, 3]
    ])
    expect(computeLayout(10, [[10,2],[3,3],[3,3],[4,2],[4,3],[6,2]])).to.deep.equal([
      [0, 0],
      [0, 2],
      [3, 2],
      [6, 2],
      [6, 4],
      [0, 5],
      [0, 7]
    ])
    expect(computeLayout(12, [[5,4],[4,4],[3,7],[3,6],[6,3],[9,3]])).to.deep.equal([
      [0, 0],
      [5, 0],
      [9, 0],
      [0, 4],
      [3, 4],
      [3, 7],
      [0, 10]
    ])
  })
})
