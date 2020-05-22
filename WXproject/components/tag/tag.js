Component({
  options: {
    multipleSlots: true
  },
  externalClasses: ['tag-class'],
  properties: {
    text: String
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
    ontap(event) {
      this.triggerEvent('tapping', {
        text: this.properties.text
      })
    }
  }
})