import {
  classBeh
} from '../calssic-beh.js'

//拿取背景音乐管理对象
const mMgr = wx.getBackgroundAudioManager()


Component({
  behaviors: [classBeh],
  properties: {
    src: String,
    titleM: String
  },
  data: {
    pauseSrc: 'images/player@waitting.png',
    playSrc: 'images/player@playing.png',
    playing: false
  },
  attached() {
    this._recoverStatus()
    this._monitorSwitch()
  },

  methods: {
    onplay(e) {
      if (!this.data.playing) {
        this.setData({
          playing: true
        })
        mMgr.title = this.data.titleM
        mMgr.src = this.properties.src
      } else {
        this.setData({
          playing: false
        })
        mMgr.pause()
      }
    },
    _recoverStatus() {
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        return
      }
      if (mMgr.src === this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },
    _monitorSwitch() {
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      mMgr.onStop(() => {
        this._recoverStatus()
      })
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    }
  }

})