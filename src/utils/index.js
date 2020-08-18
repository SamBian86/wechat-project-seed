export function validateRule(rules) {
  if (!rules || rules.length === 0) {
    return true
  }
  for (let i = 0; i < rules.length; i++) {
    if (rules[i] !== '') {
      return false
    }
    if (i == rules.length - 1) {
      return true
    }
  }
}

export function futureTime(time, dayNum) {
  const date = new Date(parseTime(time, '{y}-{m}-{d}'))
  date.setDate(date.getDate() + dayNum)
  return date
}

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}
export function isDef(value) {
  return value !== undefined && value !== null
}

export function setStorage(key, value = '') {
  return window.localStorage.setItem(key, value ? JSON.stringify(value) : value)
}

export function getStorage(key) {
  return window.localStorage.getItem(key)
    ? JSON.parse(window.localStorage.getItem(key))
    : ''
}

export function fixSoftKeyboard() {
  return window.scrollTo(0, 0)
}
