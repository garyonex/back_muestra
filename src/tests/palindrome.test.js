import { palindrome } from '../utils/for_testing.js'

test('palindrome de garycalle', () => {
  const result = palindrome('steven')
  expect(result).toBe('nevets')
})
test('palindrome of emply string', () => {
  const result = palindrome('')
  expect(result).toBe('')
})
test('palindrome of undefined', () => {
  const result = palindrome()
  expect(result).toBeUndefined()
})
