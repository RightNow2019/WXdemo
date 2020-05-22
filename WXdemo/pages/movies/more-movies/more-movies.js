let {
  globalData: {
    doubanBase
  }
} = getApp()

let {
  convertToStarsArray
} = require('../../utils/utils.js')

Page({
  data: {
    category: '',
    movies: [],
    requestUrl: '',
    totalCount: 0
  },
  // 跳转详情页
  onMovieTap(event) {
    let movieId = event.currentTarget.dataset.movieId
    wx.navigateTo({
      url: '../movie-detail/movie-detail?movieId=' + movieId
    })
  },
  // 下拉刷新
  onPullDownRefresh(event) {
    wx.showNavigationBarLoading()
    let nextUrl = this.data.requestUrl + '?start=0&count=20'
    this.getMovieListData(nextUrl, this.onScrollUpperCallback)

  },
  onScrollUpperCallback(moviesDouban) {
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
    this.data.totalCount = 20
    this.setData({
      movies
    })
    wx.hideNavigationBarLoading()
  },
  //上滑加载更多
  onReachBottom(event) {
    let nextUrl = this.data.requestUrl + '?start=' + this.data.totalCount + '&count=20'
    this.getMovieListData(nextUrl, this.callback)
    wx.showNavigationBarLoading()
  },
  onLoad(options) {
    let dataUrl
    let category = options.category
    this.setData({
      category
    })
    switch (category) {
      case '正在热映':
        dataUrl = doubanBase + '/v2/movie/in_theaters' //正在热映
        break
      case '即将上映':
        dataUrl = doubanBase + '/v2/movie/coming_soon' //正在热映
        break
      case '豆瓣Top250':
        dataUrl = doubanBase + '/v2/movie/top250' //正在热映
        break
    }
    this.setData({
      requestUrl: dataUrl
    })
    this.getMovieListData(dataUrl, this.callback)
  },
  callback(moviesDouban) {
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
    let totalMovies = []
    this.data.totalCount += 20
    totalMovies = this.data.movies.concat(movies)
    this.setData({
      movies: totalMovies
    })
    wx.hideNavigationBarLoading()
  },
  onReady() {
    wx.setNavigationBarTitle({
      title: this.data.category,
    })
  },
  //请求函数
  getMovieListData(url, callback) {
    let _self = this
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        callback(res.data.subjects)
      },
      fail(err) {
        console.log(error)
      }
    })
  }
})