import { parsePath } from './utils'

export default class Watcher {
  constructor(vm, expOrFun, cb) {
    this.vm = vm
    // 执行this.getter()，就可以读取data.a.b.c的内容
    this.getter = parsePath(expOrFun)
    this.cb = cb
    this.value = this.get()
  }

  get() {
    window.target = this
    const value = this.getter.call(this.vm, this.vm)
    window.target = undefined
    return value
  }

  update() {
    const oldValue = this.value
    this.value = this.get()
    this.cb.call(this.vm, this.value, oldValue)
  }
}

