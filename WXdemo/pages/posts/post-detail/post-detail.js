let {
  postList
} = require('../../../data/posts-data.js')
let {
  globalData: {
    g_isPlayingMusic,
    g_currentMusicPostId
  }
} = getApp()

Page({
  data: {
    postId: '',
    detail: null,
    collected: false, //收藏
    isPlayMusic: false, //音乐播放
  },
  onLoad: function(options) {
    let postId = options.id
    this.setData({
      postId
    })
    let detail = postList[postId]
    this.setData({
      detail
    })

    let postsCollected = wx.getStorageSync('postsCollected')
    if (postsCollected) {
      let collected
      if (postsCollected[postId]) {
        collected = postsCollected[postId]
      } else {
        postsCollected[postId] = false
        wx.setStorageSync('postsCollected', postsCollected)
        collected = false
      }
      this.setData({
        collected
      })
    } else {
      let postsCollected = {}
      postsCollected[postId] = false
      wx.setStorageSync('postsCollected', postsCollected)
    }

    if (g_currentMusicPostId === postId) {
      this.setData({
        isPlayMusic: g_isPlayingMusic
      })
    }

    //监听音乐播放状态
    this.setAudioMonitor()
  },
  setAudioMonitor() {
    //监听音乐播放
    wx.onBackgroundAudioPlay(() => {
      this.setData({
        isPlayMusic: true
      })
      g_isPlayingMusic = true
      g_currentMusicPostId = this.data.postId
    })
    wx.onBackgroundAudioPause(() => {
      this.setData({
        isPlayMusic: false
      })
      g_isPlayingMusic = false
      g_currentMusicPostId = null
    })

    wx.onBackgroundAudioStop(() => {
      this.setData({
        isPlayMusic: false
      })
      g_isPlayingMusic = true
      g_currentMusicPostId = this.data.postId
    })
  },
  onCollection(event) {
    let postsCollected = wx.getStorageSync('postsCollected')
    let collected = postsCollected[this.data.postId]
    collected = !collected
    postsCollected[this.data.postId] = collected
    wx.setStorageSync('postsCollected', postsCollected)
    this.setData({
      collected
    })

    wx.showToast({
      title: collected ? '收藏成功' : '取消成功',
      duration: 1000,
      icon: 'success'
    })
  },
  onShare(event) {
    let itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享到微博",
      "分享到群聊"
    ]
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success(res) {
        // res.cancel 用户点击取消按钮
        // res.tapIndex 用户点击数组元素的序号(从0开始)
        wx.showModal({
          title: itemList[res.tapIndex],
          content: '现在无法实现分享功能，什么时候能支持呢'
        })
      }
    })
  },
  onMusicTap(event) {
    let isPlayMusic = this.data.isPlayMusic
    if (isPlayMusic) {
      wx.pauseBackgroundAudio()
    } else {
      wx.playBackgroundAudio({
        dataUrl: this.data.detail.music.url,
        title: this.data.detail.music.title,
        coverImgUrl: this.data.detail.music.coverImg
      })
    }
    this.setData({
      isPlayMusic: !this.data.isPlayMusic
    })
  },

})