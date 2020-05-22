let {
  globalData: {
    doubanBase
  }
} = getApp()

let {
  convertToStarsArray
} = require('../utils/utils.js')

Page({
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {},
    searchPanelShow: false,
    searchResult: []
  },
  onBindFocus(event) {
    this.setData({
      searchPanelShow: true
    })
  },
  // 跳转详情页
  onMovieTap(event) {
    let movieId = event.currentTarget.dataset.movieId
    wx.navigateTo({
      url: 'movie-detail/movie-detail?movieId=' + movieId
    })
  },
  //取消搜索
  onCancelImgTap(event) {
    this.setData({
      searchPanelShow: false,
      searchResult: []
    })
  },
  onBindChange(event) {
    let text = event.detail.value
    let searchUrl = doubanBase + "/v2/movie/search?q=" + text
    this.getMovieListData(searchUrl, "searchResult", "")
  },
  //点击查看更多
  moreMovies(event) {
    let category = event.currentTarget.dataset.category
    wx.navigateTo({
      url: 'more-movies/more-movies?category=' + category
    })
  },
  onLoad(options) {
    let inTheatersUrl = doubanBase + '/v2/movie/in_theaters?start=0&count=3' //正在热映
    let comingSoonUrl = doubanBase + '/v2/movie/coming_soon?start=0&count=3' //即将上映
    let top250Url = doubanBase + '/v2/movie/top250?start=0&count=3' //排名前250的电影
    this.getMovieListData(inTheatersUrl, 'inTheaters', '正在热映')
    this.getMovieListData(comingSoonUrl, 'comingSoon', '即将上映')
    this.getMovieListData(top250Url, 'top250', '豆瓣Top250')
  },
  //请求函数
  getMovieListData(url, settedKey, headTitle) {
    let _self = this
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        _self.processDoubanData(res.data.subjects, settedKey, headTitle)
      },
      fail(err) {}
    })
  },
  processDoubanData(moviesDouban, settedKey, headTitle) {
    let movies = []
    for (let key in moviesDouban) {
      let title = moviesDouban[key].title
      title = title.length >= 6 ? title.slice(0, 6) + '...' : title
      let temp = {
        title,
        average: moviesDouban[key].rating.average,
        coverageUrl: moviesDouban[key].images.large,
        movieId: moviesDouban[key].id,
        stars: convertToStarsArray(moviesDouban[key].rating.stars)
      }
      movies.push(temp)
    }
    let redayData = {}
    redayData[settedKey] = {
      headTitle,
      movies
    }
    this.setData(redayData)
  }

})