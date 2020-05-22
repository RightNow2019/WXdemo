import {
  BookModel
} from '../../modles/book.js'

let bookModel = new BookModel()

Page({

  data: {
    books: [],
    searching: false,
    more: 0
  },

  onLoad: function(options) {
    bookModel.getHotList().then(res => {
        this.setData({
          books: res
        })
      })
      .catch(err => {})
  },
  onSearch(event) {
    this.setData({
      searching: true
    })
  },
  onCancelSearching() {
    this.setData({
      searching: false
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
      more: Math.random()
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})