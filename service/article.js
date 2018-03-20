export function getContent (id) {
  this.showContent = true
  util('content', {token: 0, news_id: id}).then((res) => {
    this.content = res.msg
  })
}

export function loadMore () {
  if (this.now < this.len) {
    this.loading = true
    this.now++
    this.getList(1)
    setTimeout(() => {
      this.loading = false
    }, 1000)
  } else {
    this.loading = false
  }
}

export function setPage (n) {
  this.now = n
  if (!this.isMobile) {
    this.getList()
  }
}

export function getMobileList (that, more, res, perNum) {
  if (more) {
    for (let i = 0, len = res.list.length; i < len; i++) {
      that.list.push(res.list[i])
    }
  } else {
    that.list = res.list
    that.allid = res.id_list
    localStorage.setItem('all_id', JSON.stringify(that.allid))
  }
  if (that.now > 1) return false
  that.len = Math.ceil(res.total / perNum)
}
