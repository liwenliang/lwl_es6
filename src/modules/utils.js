/**
 * 解析简单路径
 */
const baiRE = /[^\w.$]/

export function parsePath(path) {
  if (baiRE.test(path)) {
    return
  }
  const segments = path.split('.')
  return function(obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}
