export function validatePhone(str) {
  const reg = /^1[^012]\d{9}$/
  return reg.test(str)
}
