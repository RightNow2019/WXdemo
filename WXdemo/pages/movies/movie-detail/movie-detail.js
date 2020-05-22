let {
  globalData: {
    doubanBase
  }
} = getApp()

let {
  convertToStarsArray,
  convertToCastString,
  convertToCastInfos
} = require('../../utils/utils.js')

Page({
  data: {
    movie: {}
  },
  onLoad(options) {
    let movieId = options.movieId
    let url = doubanBase + '/v2/movie/subject/' + movieId
    this.http(url, this.callback)
  },
  http(url, callback) {
    wx.request({
      url: url,
      method: 'GET',
      success(res) {
        callback(res.data)
      },
      fail(err) {

      }
    })
  },
  callback(data) {
    if (!data) {
      return;
    }
    let director = {
      avatar: "",
      name: "",
      id: ""
    }
    if (data.directors[0] != null) {
      if (data.directors[0].avatars != null) {
        director.avatar = data.directors[0].avatars.large

      }
      director.name = data.directors[0].name;
      director.id = data.directors[0].id;
    }
    let movie = {
      movieImg: data.images ? data.images.large : "",
      country: data.countries[0],
      title: data.title,
      originalTitle: data.original_title,
      wishCount: data.wish_count,
      commentCount: data.comments_count,
      year: data.year,
      generes: data.genres.join("、"),
      stars: convertToStarsArray(data.rating.stars),
      score: data.rating.average,
      director: director,
      casts: convertToCastString(data.casts),
      castsInfo: convertToCastInfos(data.casts),
      summary: data.summary
    }
    this.setData({
      movie
    })
  },
  /*查看图片*/
  viewMoviePostImg: function(e) {
    var src = e.currentTarget.dataset.src;
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: [src] // 需要预览的图片http链接列表
    })
  },
})