import { expect } from 'chai'
import { unit, parseLayout, getMeshStyle } from '../src/parser'

describe('parser', () => {
  it('exports', () => {
    expect(unit).to.be.a.function
    expect(parseLayout).to.be.a.function
    expect(getMeshStyle).to.be.a.function
  })

  it('unit (in browser)', () => {
    expect(unit(0)).to.be.equal(0)
    expect(unit()).to.be.equal(0)
    expect(unit(null)).to.be.equal(0)
    expect(unit(NaN)).to.be.equal(0)
    expect(unit(35)).to.be.equal('35px')
    expect(unit(3.5)).to.be.equal('3.5px')
    expect(unit(-7)).to.be.equal('-7px')
    expect(unit(-7.35)).to.be.equal('-7.35px')
  })

  it('unit (in weex)', () => {
    global.WXEnvironment = {
      platform: 'iOS'
    }

    expect(unit(0)).to.be.equal(0)
    expect(unit()).to.be.equal(0)
    expect(unit(null)).to.be.equal(0)
    expect(unit(NaN)).to.be.equal(0)
    expect(unit(35)).to.be.equal(35)
    expect(unit(3.5)).to.be.equal(3.5)
    expect(unit(-7)).to.be.equal(-7)
    expect(unit(-7.35)).to.be.equal(-7.35)

    delete global.WXEnvironment
  })

  it('parseLayout', () => {
    expect(parseLayout()).to.deep.equal([])
    expect(parseLayout({})).to.deep.equal([])
    expect(parseLayout([])).to.deep.equal([])
    expect(parseLayout([[2,1]])).to.deep.equal([[2,1]])
    expect(parseLayout([[2,1],[1,2],[2,1]])).to.deep.equal([[2,1],[1,2],[2,1]])
    expect(parseLayout('2,1|1,2|2,1')).to.deep.equal([[2,1],[1,2],[2,1]])
    expect(parseLayout('2,1 | 1,2 | 2,1')).to.deep.equal([[2,1],[1,2],[2,1]])
    expect(parseLayout('2, 1 |1 ,2|  2,1 ')).to.deep.equal([[2,1],[1,2],[2,1]])
    expect(parseLayout(' 2, 1 | 1 , 2|  2 , 1 ')).to.deep.equal([[2,1],[1,2],[2,1]])
    expect(parseLayout(',|,|,')).to.deep.equal([[0,0],[0,0],[0,0]])
    expect(parseLayout('4,1|1,3|3,3')).to.deep.equal([[4,1],[1,3],[3,3]])
    expect(parseLayout('5,4|4,4|3,7|3,6|6,3|9,3')).to.deep.equal([[5,4],[4,4],[3,7],[3,6],[6,3],[9,3]])
    expect(parseLayout('10,2|3,3|3,3|4,2|4,3|6,2')).to.deep.equal([[10,2],[3,3],[3,3],[4,2],[4,3],[6,2]])
  })

  describe('getMeshStyle', () => {
    before(() => { global.WXEnvironment = { platform: 'Android' } })
    after(() => { delete global.WXEnvironment })

    it('empty parameter', () => {
      const { wrapperStyle, layoutStyle } = getMeshStyle({})
      expect(wrapperStyle).to.deep.equal({
        position: 'relative',
        width: 750,
        height: 0
      })
      expect(layoutStyle).to.deep.equal([])
    })

    it('default parameter', () => {
      const { wrapperStyle, layoutStyle } = getMeshStyle({ layout: '12,10' })
      expect(wrapperStyle).to.deep.equal({
        position: 'relative',
        width: 750,
        height: 625
      })
      expect(layoutStyle).to.deep.equal([{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 750,
        height: 625
      }])
    })

    it('example 1', () => {
      const { wrapperStyle, layoutStyle } = getMeshStyle({ width: 600, gap: 25, column: 4, layout: '4,1|1,3|3,3' })
      expect(wrapperStyle).to.deep.equal({
        position: 'relative',
        width: 600,
        height: 600
      })
      expect(layoutStyle).to.deep.equal([{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 600,
        height: 131.25
      }, {
        position: 'absolute',
        top: 156.25,
        left: 0,
        width: 131.25,
        height: 443.75
      }, {
        position: 'absolute',
        top: 156.25,
        left: 156.25,
        width: 443.75,
        height: 443.75
      }])
    })

    it('example 2', () => {
      const { wrapperStyle, layoutStyle } = getMeshStyle({ width: 640, gap: 20, column: 3, layout: '2,1|1,2|2,1' })
      expect(wrapperStyle).to.deep.equal({
        position: 'relative',
        width: 640,
        height: 420
      })
      expect(layoutStyle).to.deep.equal([{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 420,
        height: 200
      }, {
        position: 'absolute',
        top: 0,
        left: 440,
        width: 200,
        height: 420
      }, {
        position: 'absolute',
        top: 220,
        left: 0,
        width: 420,
        height: 200
      }])
    })

    it('example 3 (with orders)', () => {
      const { wrapperStyle, layoutStyle } = getMeshStyle({ width: 600, gap: 25, column: 4, layout: '4,1|1,3|3,3' }, { orders: [2,1,3] })
      expect(wrapperStyle).to.deep.equal({
        position: 'relative',
        width: 600,
        height: 600
      })
      expect(layoutStyle).to.deep.equal([{
        position: 'absolute',
        top: 156.25,
        left: 0,
        width: 131.25,
        height: 443.75
      }, {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 600,
        height: 131.25
      }, {
        position: 'absolute',
        top: 156.25,
        left: 156.25,
        width: 443.75,
        height: 443.75
      }])
    })

    it('example 4 (with orders)', () => {
      const { wrapperStyle, layoutStyle } = getMeshStyle({ width: 640, gap: 20, column: 3, layout: '2,1|1,2|2,1' }, { orders: [3,1,2] })
      expect(wrapperStyle).to.deep.equal({
        position: 'relative',
        width: 640,
        height: 420
      })
      expect(layoutStyle).to.deep.equal([{
        position: 'absolute',
        top: 220,
        left: 0,
        width: 420,
        height: 200
      }, {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 420,
        height: 200
      }, {
        position: 'absolute',
        top: 0,
        left: 440,
        width: 200,
        height: 420
      }])
    })
  })
})
