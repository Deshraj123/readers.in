/* eslint-disable no-console */
import createPaypalExpressTokenMutation from '~/graphql/paypal/createPaypalExpressToken.graphql'
/**
 * @State
 */
export const state = () => ({
  success: null,
  error: null,
  paypal: ''
})

/**
 * @Getters
 */
export const getters = {
  success: (state) => {
    return state.success
  },
  error: (state) => {
    return state.error
  },
  getPaypal: (state) => {
    return state.paypal
  }
}

/**
 * @Mutations
 */
export const mutations = {
  setSuccess(state, success) {
    state.success = success
  },

  setError(state, error) {
    state.error = error
  },

  setPaypal(state, data) {
    state.paypal = data
  }
}

/**
 * @Actions
 */
export const actions = {
  createPaypalExpressToken({commit}, payload) {
    commit("others/loading/setLoading", true, { root: true })
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .mutate({
          mutation: createPaypalExpressTokenMutation,
          variables: payload.variables,
          context: {
            headers: payload.headers
          }
        })
        .then((res) => {
          if (res.data.createPaypalExpressToken !== null) {
            commit('setPaypal', res.data.createPaypalExpressToken)
            window.open(res.data.createPaypalExpressToken.paypal_urls.start, "_self");
          }
          resolve(res)
        })
        .catch((error) => {
          let str = error.message.replace(/GraphQL error:/, '')
          commit('quote/setPaymentPageError', str, { root: true})
          commit("others/loading/setLoading", false, { root: true })
          reject(error)
        })
    })
  }
}
