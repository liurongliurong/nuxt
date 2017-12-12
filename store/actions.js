export default {
  getInfo ({commit, state}) {
    console.log(11)
    var data = localStorage.getItem('info')
    if (data) {
      state.info = Object.assign(state.info, JSON.parse(data))
    }
  }
}
