import { expect } from 'chai'
import plugin from '../src/vue'

describe('vue component', () => {
  it('exports', () => {
    expect(plugin).to.be.an.object
    expect(plugin.install).to.be.a.function
  })
})
