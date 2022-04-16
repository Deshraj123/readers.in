import trackingQuery from "~/graphql/others/tracking.graphql"

export const state = () => ({
  trackings: []
})

export const getters = {
  getTrackings(state) {
    return state.trackings
  }
}

export const mutations = {
  setTrackings(state, data) {
    state.trackings = data
  }
}

export const actions = {
  getTrackingsAction({ commit }, payload) {
    commit("setTrackings", [])
    commit("others/loading/setLoading", true, { root: true })
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .query({
          query: trackingQuery,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          commit("setTrackings", res.data.tracking)
          commit("others/loading/setLoading", false, { root: true })
          resolve(res)
        })
        .catch((error) => {
          commit("others/loading/setLoading", false, { root: true })
          reject(error)
        })
    })
  }
}
