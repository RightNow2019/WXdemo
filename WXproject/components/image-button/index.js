Component({
  options: {
    multipleSlots: true
  },
  properties: {
    openType: String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    getUserInfo(event) {
      this.triggerEvent('getuserinfo', event.detail, {})
    }
  }
})