import { whitelistChars, getLastWord } from '@/components/mixins/helpers'

describe('whitelistChars function', () => {
  it('removes matched chars from string', () => {
    expect(whitelistChars('abc!%&123')).toMatch('abc123')
  })
})

describe('getLastWord function', () => {
  it('returns only the last word from a string', () => {
    expect(getLastWord('Barbera Cline')).toMatch('Cline')
  })
})
