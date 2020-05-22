import {
  ClassicModel
} from '../../modles/classic.js'
import {
  LikeModel
} from '../../modles/like.js'

let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Page({
  data: {
    calssicData: {},
    first: false,
    latest: true,
    like_status: false,
    likeCount: 0
  },

  onLoad(options) {
    classicModel.getLatest(res => {
      this.setData({
        calssicData: res,
        like_status: res.like_status,
        likeCount: res.fav_nums
      })
    })
  },
  onLike(e) {
    let behavior = e.detail.behavior
    likeModel.like(behavior, this.data.calssicData.id, this.data.calssicData.type)
  },
  onPrev() {
    this._updateClassic('next')
  },

  onNext() {
    this._updateClassic('previous')
  },

  _updateClassic(nextOrPrev) {
    let index = this.data.calssicData.index
    classicModel.getClassic(index, nextOrPrev, res => {
      this._getLikeStatus(res.id, res.type)
      this.setData({
        calssicData: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFrist(res.index)
      })
    })
  },
  _getLikeStatus(artID, category) {
    likeModel.getClassicLikeStatus(artID, category, res => {
      this.setData({
        like_status: res.like_status,
        likeCount: res.fav_nums
      })
    })
  }
})