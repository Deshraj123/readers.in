import storeQuery from "~/graphql/store/storeConfig.graphql"

export const state = () => ({
  config: {},
  headers: {
    "content-type": "application/json", // required
    Authorization: "", // Optional
    Store: "default", // required
  },
})

export const getters = {
  getConfig(state) {
    return state.config
  },
  getHeaderData(state) {
    return state.headers
  },
}

export const mutations = {
  setConfig(state, data) {
    state.config = data
  },
  setHeaderData(state, header) {
    state.headers = header
  },
  setHeaderTokenData(state, token) {
    state.headers.Authorization = "Bearer " + token
  },
  setHeaderStoreData(state, value) {
    state.headers.Store = value
  },
}

export const actions = {
  getStoreConfigAction({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .query({
          query: storeQuery,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          if (res.data.storeConfig) {
            commit("setConfig", res.data.storeConfig)
          }
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  updateHeaderAction({ commit }, header) {
    commit("setHeaderData", header)
  },
}
