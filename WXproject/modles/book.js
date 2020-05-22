import {
  HTTP
} from '../utils/http-p.js'

class BookModel extends HTTP {
  getHotList() {
    return this.request({
      url: '/book/hot_list'
    })
  }
  getDetail(id) {
    return this.request({
      url: `/book/${id}/detail`
    })
  }
  getLikeStatus(id) {
    return this.request({
      url: `/book/${id}/favor`
    })
  }
  getComments(id) {
    return this.request({
      url: `/book/${id}/short_comment`
    })
  }
  postComment(id, comment) {
    return this.request({
      url: `/book/add/short_comment`,
      method: 'POST',
      data: {
        book_id: id,
        content: comment
      }
    })
  }
}
export {
  BookModel
}