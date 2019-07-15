/**
 * 自定义事件对象
 */
class Event {
  constructor() {
    this.events = {}
    this.onceEvents = {}
  }

  /**
   * 添加事件监听
   * @param eventName 事件名称
   * @param callback  事件函数
   */
  on(eventName, callback) {
    this.events[eventName] = this.events[eventName] || []
    this.events[eventName].push(callback)
  }

  /**
   * 添加事件监听，只触发一次
   * @param eventName   事件名称
   * @param callback    事件函数
   */
  once(eventName, callback) {
    this.onceEvents[eventName] = callback
  }

  /**
   * 触发事件
   * @param eventName 事件名称
   * @param args      事件参数
   */
  emit(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].map(callback => {
        callback(...args)
      })
    }

    if (this.onceEvents[eventName]) {
      this.onceEvents[eventName](...args)
      delete this.onceEvents[eventName]
    }
  }

  /**
   * 移除特定事件
   * @param eventName 事件名称
   * @param callback  事件对应处理函数
   */
  remove(eventName, callback) {
    if (this.events[eventName]) {
      let eventIdx = -1
      this.events[eventName].map((cb, idx) => {
        if (cb === callback) {
          eventIdx = idx
        }
      })
      if (eventIdx !== -1) {
        this.events[eventName].splice(eventIdx, 1)
      } else {
        this.events[eventName] = []
      }
    }

    if (this.onceEvents[eventName]) {
      delete this.onceEvents[eventName]
    }
  }

  /**
   * 移除所有事件
   */
  removeAll() {
    this.events = {}
    this.onceEvents = {}
  }
}

export default new Event()
