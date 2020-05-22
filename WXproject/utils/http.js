import {
  config
} from '../config.js'


const tips = {
  1: '网络连接失败',
  '1005': '不正确的开发者key',
  '3000': '期刊不存在'
}
class HTTP {
  request(params) {
    if (!params.method) {
      params.method = 'GET'
    }
    wx.request({
      url: config.api_base_url + params.url,
      method: params.method,
      data: params.data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success: res => {
        let code = res.statusCode.toString()
        if (code.startsWith('2')) {
          params.success && params.success(res.data)
        } else {
          this._show_error(res.data.error_code)
        }
      },
      fail: err => {
        this._show_error(res.data.error_code)
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