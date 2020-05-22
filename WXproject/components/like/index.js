Component({
  properties: {
    like: {
      type: Boolean, // String Number Object Boolean Array...
    },
    count: {
      type: Number
    }
  },
  data: {
    yesSrc: 'images/like.png',
    noSrc: 'images/like@dis.png'
  },
  methods: {
    onLike(e) {
      let like = this.properties.like
      let count = this.properties.count
      count = like ? count - 1 : count + 1
      like = !like
      this.setData({
        count,
        like
      })
      //激活
      let behavior = like ? 'like' : 'cancel'
      this.triggerEvent('like', {
        behavior
      }, {})
    }
  }
})