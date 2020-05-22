import {
  KeyWordModel
} from '../../modles/keyword.js'

const keywordModel = new KeyWordModel()

Component({
  properties: {
    more: {
      type: String,
      observer: '_load_more'
    }
  },

  data: {
    historyWords: [],
    hotWords: [],
    dataArray: [],
    searching: false,
    searchText: '',
    loading: false,
    total: 0,
    loadinCenter: false,
    loadinBottom: false,
    isNone: false
  },
  attached() {
    keywordModel.getHot().then(res => {
      this.setData({
        hotWords: res.hot
      })
    })
    this.setData({
      historyWords: keywordModel.getHistory()
    })
  },

  methods: {
    // 上拉加载
    _load_more() {
      if (!this.data.searchText) return
      if (this.data.loading) return
      const length = this.data.dataArray.length
      if (this.data.total <= length) return
      this.data.loading = true
      this._showLoadingBottom()
      keywordModel.search(length, this.data.searchText).then(res => {
        const temp = this.data.dataArray.concat(res.books)
        this.setData({
          dataArray: temp
        })
        this._hideLoadingBottom()
        this.data.loading = false
      })
    },
    onCancel() {
      this.triggerEvent('onCancelSearching')
    },
    // 查找书籍
    onConfirm(event) {
      this.setData({
        dataArray: [],
        isNone: false,
        total: 0,
        searching: true
      })
      this._showLoadingCenter()
      const word = event.detail.value || event.detail.text
      keywordModel.search(0, word).then(res => {
        this.setData({
          dataArray: res.books,
          searchText: word,
          total: res.total
        })
        if (res.total === 0) {
          this.setData({
            isNone: true
          })
        } else {
          this.setData({
            isNone: false
          })
        }

        keywordModel.addToHistory(word)
        this._hideLoadingCenter()
      })
    },
    onDelete(event) {
      this.setData({
        searching: false,
        dataArray: [],
        searchText: '',
        isNone: false,
        total: 0
      })
    },
    _showLoadingCenter() {
      this.setData({
        loadinCenter: true
      })
    },
    _hideLoadingCenter() {
      this.setData({
        loadinCenter: false
      })
    },
    _showLoadingBottom() {
      this.setData({
        loadinBottom: true
      })
    },
    _hideLoadingBottom() {
      this.setData({
        loadinBottom: false
      })
    }
  }
})