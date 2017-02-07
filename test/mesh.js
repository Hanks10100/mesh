import { expect } from 'chai'
import plugin from '../src/mesh'

describe('mesh', () => {
  it('exports', () => {
    expect(plugin).to.be.an.object
    expect(plugin.install).to.be.a.function
  })
})
