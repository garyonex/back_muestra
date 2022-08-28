export const palindrome = (string) => {
  if (typeof string === 'undefined') return
  return string.split('').reverse().join('')
}
export const average = (array) => {
  if (array.length === 0) return 0
  // else if (array.length === isNaN) return 0
  let sum = 0
  array.forEach((num) => {
    sum += num
  })
  return sum / array.length
}
