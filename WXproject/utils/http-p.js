import {
  config
} from '../config.js'


const tips = {
  1: '网络连接失败',
  '1005': '不正确的开发者key',
  '3000': '期刊不存在'
}
class HTTP {
  request({
    url,
    data = {},
    method = 'GET'
  }) {
    return new Promise((resolve, reject) => {
      this._request(resolve, reject, url, data, method)
    })
  }
  _request(resolve, reject, url, data = {}, method = 'GET') {
    wx.request({
      url: config.api_base_url + url,
      method: method,
      data: data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success: res => {
        let code = res.statusCode.toString()
        if (code.startsWith('2')) {
          resolve(res.data)
        } else {
          this._show_error(res.data.error_code)
          reject()
        }
      },
      fail: err => {
        this._show_error(res.data.error_code)
        reject()
      }
    })
  }
  _show_error(error_code) {
    let err_code = error_code ? 1 : error_code
    wx.showToast({
      title: tips[err_code],
      icon: 'none',
      duration: 2000
    })
  }
}

export {
  HTTP
}