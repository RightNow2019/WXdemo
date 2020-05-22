Component({
  properties: {
    index: {
      type: String,
      observer: function(newVal, oldVal, changePath) {
        let val = newVal < 10 ? '0' + newVal : newVal
        this.setData({
          _index: val
        })
      }
    }
  },

  data: {
    year: 0,
    month: '',
    _index: '',
    months: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
  },

  methods: {

  },
  attached() {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()
      this.setData({
        year,
        month: this.data.months[month]
      })
  }
})