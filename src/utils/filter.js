const filters = {
  overflowHide: function(value) {
    if (!value) return ''
    value = value.toString()
    if (value.length > 42) {
      return `${value.substr(0, 42)}...`
    } else {
      return value
    }
  }
}

export default filters
