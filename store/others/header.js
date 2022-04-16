export const state = () => ({
  miniCartShow: false
})

export const getters = {
  getMiniCartShow(state) {
    return state.miniCartShow
  }
}

export const mutations = {
  setMiniCartShow(state, data) {
    state.miniCartShow = data
  }
}
