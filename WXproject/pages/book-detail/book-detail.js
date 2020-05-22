import {
  BookModel
} from '../../modles/book.js'
import {
  LikeModel
} from '../../modles/like.js'

let bookModel = new BookModel()
let likeModel = new LikeModel()

Page({

  data: {
    comments: [],
    book: {},
    likeStatus: false,
    likeCount: 0,
    posting: false, //评论输入框
  },

  onLoad: function(options) {
    wx.showLoading()
    const id = options.id
    const detail = bookModel.getDetail(id)
    const likeStatus = bookModel.getLikeStatus(id)
    const comments = bookModel.getComments(id)

    Promise.all([detail, comments, likeStatus]).then(res => {
      let [detail, comments, likeStatus] = res
      this.setData({
        likeStatus: likeStatus.like_status,
        likeCount: likeStatus.fav_nums,
        book: detail,
        comments: comments.comments
      })
      wx.hideLoading()
    })
  },
  onLike(event) {
    const like_or_cancel = event.detail.behavior
    likeModel.like(like_or_cancel, this.data.book.id, 400)
  },
  onFakePost(event) {
    this.setData({
      posting: true
    })
  },
  onCancel(event) {
    this.setData({
      posting: false
    })
  },
  onPost(event) {
    const comment = event.detail.text || event.detail.value

    if (comment.length > 12) {
      wx.showModal({
        title: '短评最多12个字',
        icon: "none"
      })
      return
    }

    bookModel.postComment(this.data.book.id, comment)
      .then(res => {
        wx.showToast({
          title: '+ 1',
          icon: "none"
        })
        this.data.comments.unshift({
          content: comment,
          nums: 1
        })
        // 只是改变数组，但是没有更新，调用setData更新
        this.setData({
          comments: this.data.comments,
          posting: false
        })
      })
  }
})