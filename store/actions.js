export default {
  getInfo ({commit, state}) {
    var data = localStorage.getItem('info')
    if (data) {
      state.info = Object.assign(state.info, JSON.parse(data))
    }
  }
}
