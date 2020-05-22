import {
  HTTP
} from '../utils/http-p.js'

class KeyWordModel extends HTTP {
  key = 'q'
  maxLength = 10
  getHistory() {
    return wx.getStorageSync(this.key) || []
  }
  getHot() {
    return this.request({
      url: '/book/hot_keyword'
    })
  }
  addToHistory(keyWord) {
    let words = this.getHistory()
    let has = words.includes(keyWord)
    if (!has) {
      const length = words.length
      if (length >= this.maxLength) {
        words.pop()
      }
      words.unshift(keyWord)
      wx.setStorageSync(this.key, words)
    }
  }
  search(start, q) {
    return this.request({
      url: `/book/search?summary=1`,
      data: {
        start,
        q
      }
    })
  }
}
export {
  KeyWordModel
}