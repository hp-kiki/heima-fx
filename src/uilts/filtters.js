// 显示时间的过滤器

export const filtertime = (time, spe, spr) => {
  time = time || new Date()
  spe = spe || '/'
  spr = spr || ':'
  var year = time.getFullYear()
  var yue = time.getMonth() + 1
  var ri = time.getDate()
  var shi = time.getHours()
  var fen = time.getMinutes()
  var miao = time.getSeconds()
  return year + spe + yue + spe + ri + '  ' + shi + spr + fen + spr + miao
}
