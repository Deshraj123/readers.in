import openSupportQuery from "~/graphql/others/openSupport/openSupport.graphql"
import openSupportTopicOptionQuery from "~/graphql/others/openSupport/openSupportTopicOptions.graphql"
import openSupportCreateMutation from "~/graphql/others/openSupport/openSupportCreate.graphql"

export const state = () => ({
  openSupports: {},
  openSupportsTopicOptions: {},
  openSupportsError: null,
  openSupportsSuccess: null
})

export const getters = {
  getOpenSupports(state) {
    return state.openSupports
  },
  getOpenSupportTopicOptions(state) {
    return state.openSupportsTopicOptions
  },
  getOpenSupportsError(state) {
    return state.openSupportsError
  },
  getOpenSupportsSuccess(state) {
    return state.openSupportsSuccess
  },
}

export const mutations = {
  setOpenSupports(state, data) {
    state.openSupports = data
  },
  setOpenSupportTopicOptions(state, data) {
    state.openSupportsTopicOptions = data
  },
  setOpenSupportsError(state, data) {
    state.openSupportsError = data
  },
  setOpenSupportsSuccess(state, data) {
    state.openSupportsSuccess = data
  }
}

export const actions = {
  openSupportsAction({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .query({
          query: openSupportQuery,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          if (res.data.openSupport) {
            commit("setOpenSupports", res.data.openSupport)
          }
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  openSupportsTopicOptionsAction ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .query({
          query: openSupportTopicOptionQuery,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          commit("setOpenSupportTopicOptions", res.data.openSupportTopicOptions)
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  newOpenSupportsACtion({ commit }, payload) {
    commit("setOpenSupportsError", null)
    commit("setOpenSupportsSuccess", null)
    commit("others/loading/setLoading", true, { root: true })
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .mutate({
          mutation: openSupportCreateMutation,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          if (res.data.openSupportCreate) {
            commit("setOpenSupports", res.data.openSupportCreate)
            commit("setOpenSupportsSuccess", "Open support is created successfully.")
          }
          setTimeout(function(){
            commit("setOpenSupportsSuccess", null)
          }, 5000)
          resolve(res)
          commit("others/loading/setLoading", false, { root: true })
        })
        .catch((error) => {
          let str = error.message.replace(/GraphQL error:/, "")
          commit("setOpenSupportsError", str)
          commit("others/loading/setLoading", false, { root: true })
          reject(error)
        })
    })
  }
}
