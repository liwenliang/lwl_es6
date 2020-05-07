import { parsePath } from './modules/utils'

console.log(parsePath('a.b.c.d')({ a: { b: { c: { d: 'liwenliang' }}}}))

function createObj(path, value) {
  const pathArr = path.split('.')
  const obj = {}
  let tmp = obj
  for (let i = 0; i < pathArr.length; i++) {
    const key = pathArr[i]
    if (i === pathArr.length - 1) {
      tmp[key] = value
    } else {
      tmp[key] = {}
      tmp = tmp[key]
    }
  }
  return obj
}

console.log(createObj('a.b.c.d', 'liwenliang'))
