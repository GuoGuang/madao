/**
 * 时间戳转日期
 */
export function timestampToTime(timestamp) {
  const date = new Date(timestamp)
  const Y = date.getFullYear() + '-'
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  let D = date.getDate() + ' '
  if (parseInt(D) < 10) {
    D = '0' + D
  }
  let h = date.getHours()
  if (parseInt(h) < 10) {
    h = '0' + h
  }
  let m = date.getMinutes()
  if (parseInt(m) < 10) {
    m = '0' + m
  }
  let s = date.getSeconds()
  if (parseInt(s) < 10) {
    s = '0' + s
  }
  return Y + M + D + h + ':' + m + ':' + s
}
