import {
  HTTP
} from '../utils/http.js'
class ClassicModel extends HTTP {

  getLatest(sCallback) {
    this.request({
      url: '/classic/latest',
      success: res => {
        sCallback(res)
        this._setLatestIndex(res.index)
      }
    })
  }

  getClassic(index, nextOrPrev, sCallback) {
    let key = nextOrPrev === 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    if (!classic) {
      this.request({
        url: '/classic/' + index + '/' + nextOrPrev,
        success: res => {
          wx.setStorageSync(this._getKey(res.index), res)
          sCallback(res)
        }
      })
    } else {
      sCallback(classic)
    }
  }

  isFrist(index) {
    return index === 1 ? true : false
  }
  isLatest(index) {
    return index === wx.getStorageSync('latest') ? true : false
  }
  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }
  _getKey(index) {
    return 'classic-' + index
  }
}
export {
  ClassicModel
}