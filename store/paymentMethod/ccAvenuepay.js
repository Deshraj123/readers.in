/* eslint-disable no-console */
import createPaypalExpressTokenMutation from '~/graphql/ccAvenuepay/ccavenuepayPostData.graphql'
/**
 * @State
 */
export const state = () => ({
  postData: {},
  updateOrderResponse: {}
})

/**
 * @Getters
 */
export const getters = {
  getPostData: (state) => {
    return state.postData
  },
  getUpdateOrderResponse: (state) => {
    return state.updateOrderResponse
  }
}

/**
 * @Mutations
 */
export const mutations = {
  setPostData(state, data) {
    state.postData = data
  },
  setUpdateOrderResponse(state, data) {
    state.updateOrderResponse = data
  }
}

/**
 * @Actions
 */
export const actions = {
  getPostDataAction({commit}, payload) {
    commit("others/loading/setLoading", true, { root: true })
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .query({
          query: createPaypalExpressTokenMutation,
          variables: payload.variables,
          context: {
            headers: payload.headers
          }
        })
        .then((res) => {
          if (res.data.ccavenuepay_post_data !== null) {
            commit('setPostData', res.data.ccavenuepay_post_data)
          }
          resolve(res)
        })
        .catch((error) => {
          let str = error.message.replace(/GraphQL error:/, '')
          commit("others/loading/setLoading", false, { root: true })
          this.$toast.error(str)
          reject(error)
        })
    })
  },
  updateOrderStatusAction({commit}, payload) {
    commit("others/loading/setLoading", true, { root: true })
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .query({
          query: createPaypalExpressTokenMutation,
          variables: payload.variables,
          context: {
            headers: payload.headers
          }
        })
        .then((res) => {
          commit('setUpdateOrderResponse', res.data.updateOrderStatusByCcavenue)
          resolve(res)
        })
        .catch((error) => {
          let str = error.message.replace(/GraphQL error:/, '')
          commit("others/loading/setLoading", false, { root: true })
          this.$toast.error(str)
          this.$router.push({ path: "/cart" })
          reject(error)
        })
    })
  }
}
