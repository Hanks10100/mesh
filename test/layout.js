import { expect } from 'chai'
import { isEqual, getCoord, xor, getOrigin, computeLayout } from '../src/layout'

describe('layout', () => {
  it('exports', () => {
    expect(isEqual).to.be.a.function
    expect(getCoord).to.be.a.function
    expect(xor).to.be.a.function
    expect(getOrigin).to.be.a.function
    expect(computeLayout).to.be.a.function
  })

  it('isEqual', () => {
    expect(isEqual({}, {})).to.be.true
    expect(isEqual({ x:0 }, { x:0 })).to.be.true
    expect(isEqual({ x:0, y:0 }, { x:0, y:0 })).to.be.true
    expect(isEqual({ x:1, y:3 }, { x:1, y:3 })).to.be.true
    expect(isEqual({ x:1, y:6 }, { x:2, y:6 })).to.be.false
    expect(isEqual({ x:2, y:1 }, { x:2, y:0 })).to.be.false
    expect(isEqual({ x:0 }, { y:0 })).to.be.false
  })

  it('getCoord', () => {
    expect(getCoord({ x:0, y:0 }, [0, 0])).to.be.deep.equal([
      { x:0, y:0 },
      { x:0, y:0 },
      { x:0, y:0 },
      { x:0, y:0 }
    ])
    expect(getCoord({ x:0, y:0 }, [1, 2])).to.be.deep.equal([
      { x:0, y:0 },
      { x:1, y:0 },
      { x:0, y:2 },
      { x:1, y:2 }
    ])
    expect(getCoord({ x:1, y:2 }, [3, 4])).to.be.deep.equal([
      { x:1, y:2 },
      { x:4, y:2 },
      { x:1, y:6 },
      { x:4, y:6 }
    ])
  })

  it('xor', () => {
    const a = { x: 0, y: 0 }
    const b = { x: 1, y: 0 }
    const c = { x: 0, y: 1 }
    const d = { x: 1, y: 1 }
    const e = { x: 2, y: 0 }

    expect(xor([a, b], [])).to.deep.equal([a, b])
    expect(xor([a, b], [a, b])).to.deep.equal([])
    expect(xor([a, b, c], [b, c, d])).to.deep.equal([a, d])
    expect(xor([b, c, d], [a, b, c])).to.deep.equal([d, a])
    expect(xor([a, b, c], [a, b, c, d, e])).to.deep.equal([d, e])
    expect(xor([a, b, c], [d, e])).to.deep.equal([a, b, c, d, e])
  })

  it('getOrigin', () => {
    expect(getOrigin([{x:0,y:0}])).to.deep.equal({ x:0, y:0 })
    expect(getOrigin([{x:0,y:0}, {x:1,y:0}])).to.deep.equal({ x:0, y:0 })
    expect(getOrigin([{x:0,y:2}, {x:1,y:0}, {x:2,y:1}])).to.deep.equal({ x:1, y:0 })
    expect(getOrigin([{x:0,y:1}, {x:1,y:0}, {x:2,y:2}])).to.deep.equal({ x:1, y:0 })
    expect(getOrigin([{x:0,y:1}, {x:1,y:2}, {x:2,y:2}])).to.deep.equal({ x:0, y:1 })
    expect(getOrigin([{x:0,y:2}, {x:1,y:0}, {x:2,y:1}, {x:3,y:3}])).to.deep.equal({ x:1, y:0 })
    expect(getOrigin([{x:0,y:2}, {x:1,y:3}, {x:2,y:1}, {x:3,y:0}])).to.deep.equal({ x:3, y:0 })
    expect(getOrigin([{x:0,y:2}, {x:1,y:3}, {x:2,y:2}, {x:3,y:2}])).to.deep.equal({ x:0, y:2 })
    expect(getOrigin([{x:1,y:2}, {x:1,y:0}, {x:2,y:2}, {x:3,y:2}])).to.deep.equal({ x:1, y:0 })
  })

  it('computeLayout', () => {
    expect(computeLayout(2, [[1,1],[1,1]])).to.deep.equal([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 }
    ])
    expect(computeLayout(3, [[2,1],[1,2]])).to.deep.equal([
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 0, y: 1 }
    ])
    expect(computeLayout(3, [[2,1],[1,2],[2,1]])).to.deep.equal([
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 }
    ])
    expect(computeLayout(4, [[4,1],[1,3],[3,3]])).to.deep.equal([
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 0, y: 4 }
    ])
    expect(computeLayout(4, [[4,1],[1,2],[1,2],[2,1],[2,1]])).to.deep.equal([
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
      { x: 0, y: 3 }
    ])
    expect(computeLayout(10, [[10,2],[3,3],[3,3],[4,2],[4,3],[6,2]])).to.deep.equal([
      { x: 0, y: 0 },
      { x: 0, y: 2 },
      { x: 3, y: 2 },
      { x: 6, y: 2 },
      { x: 6, y: 4 },
      { x: 0, y: 5 },
      { x: 0, y: 7 }
    ])
    expect(computeLayout(12, [[5,4],[4,4],[3,7],[3,6],[6,3],[9,3]])).to.deep.equal([
      { x: 0, y: 0 },
      { x: 5, y: 0 },
      { x: 9, y: 0 },
      { x: 0, y: 4 },
      { x: 3, y: 4 },
      { x: 3, y: 7 },
      { x: 0, y: 10 }
    ])
  })
})
