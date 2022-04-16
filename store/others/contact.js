import contactusMutation from "~/graphql/others/contactus.graphql"
/**
 * @State
 */
export const state = () => ({
  error: null,
  success: null
})

/**
 * @Getters
 */
export const getters = {
  getError: (state) => {
    return state.error
  },
  getSuccess: (state) => {
    return state.success
  }
}

/**
 * @Mutations
 */
export const mutations = {
  setError(state, data) {
    state.error = data
  },
  setSuccess(state, data) {
    state.success = data
  }
}

/**
 * @Actions
 */
export const actions = {
  sendContactEmailAction({ commit }, payload) {
    commit("others/loading/setLoading", true, { root: true })
    commit("setError", null)
    commit("setSuccess", null)
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .mutate({
          mutation: contactusMutation,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          if (res.data.contactUs.error) {
            commit("setError", res.data.contactUs.message)
            setTimeout(function(){
              commit("setError", null)
            }, 5000)
          }else{
            commit("setSuccess", res.data.contactUs.message)
            setTimeout(function(){
              commit("setSuccess", null)
            }, 5000)
          }
          commit("others/loading/setLoading", false, { root: true })
          resolve(res)
        })
        .catch((error) => {
          let str = error.message.replace(/GraphQL error:/, "")
          commit("setError", str)
          commit("others/loading/setLoading", false, { root: true })
          reject(error)
        })
    })
  }
}
