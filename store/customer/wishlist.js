import addProductsToWishlistMutation from '~/graphql/customer/wishlist/addProductsToWishlist.graphql'
import removeProductsFromWishlistMutation from '~/graphql/customer/wishlist/removeProductsFromWishlist.graphql'
import updateProductsInWishlistMutation from '~/graphql/customer/wishlist/updateProductsInWishlist.graphql'
import shareWishlistMutation from '~/graphql/customer/wishlist/shareWishlist.graphql'

export const state = () => ({
  wishlist: {},
  errors: null,
  success: null
})

export const getters = {
  getWishlist(state) {
    return state.wishlist
  },
  getWishlistErrors(state) {
    return state.errors
  },
  getWishlistSuccess(state) {
    return state.success
  }
}
export const mutations = {
  setWishlist(state, data) {
    if(data.items.length > 0) {
      data.items.forEach(function(value, index){
        data.items[index].product['qty'] = value.qty
        data.items[index].product['qty_error_msg'] = null
      })
    }
    state.wishlist = data
  },
  updateWishlist(state, data) {
    state.wishlist = data
  },
  setWishlistErrors(state, data) {
    state.errors = data
  },
  setWishlistSuccess(state, data) {
    state.success = data
  }
}
export const actions = {
  addProductsToWishlistAction({ commit }, payload) {
    commit("others/loading/setLoading", true, { root: true })
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .mutate({
          mutation: addProductsToWishlistMutation,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          if (res.data.addProductsToWishlist.wishlist) {
            commit("setWishlist", res.data.addProductsToWishlist.wishlist)
          }
          resolve(res)
          commit("others/loading/setLoading", false, { root: true })
          this.$toast.success("Product is added into your wishlist.")
        })
        .catch((error) => {
          reject(error)
          commit("others/loading/setLoading", false, { root: true })
        })
    })
  },
  removeProductsFromWishlistAction({ commit }, payload) {
    commit('setWishlistErrors', null)
    commit("others/loading/setLoading", true, { root: true })
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .mutate({
          mutation: removeProductsFromWishlistMutation,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          if (res.data.removeProductsFromWishlist.wishlist) {
            commit("setWishlist", res.data.removeProductsFromWishlist.wishlist)
          }
          resolve(res)
          commit("others/loading/setLoading", false, { root: true })
          this.$toast.success("Product is remove into your wishlist.")
        })
        .catch((error) => {
          reject(error)
          commit("others/loading/setLoading", false, { root: true })
        })
    })
  },

  updateProductsInWishlistAction({ commit }, payload) {
    commit('setWishlistErrors', null)
    commit("others/loading/setLoading", true, { root: true })
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .mutate({
          mutation: updateProductsInWishlistMutation,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          if (res.data.updateProductsInWishlist.wishlist) {
            commit("setWishlist", res.data.updateProductsInWishlist.wishlist)
          }
          resolve(res)
          commit("others/loading/setLoading", false, { root: true })
        })
        .catch((error) => {
          reject(error)
          commit("others/loading/setLoading", false, { root: true })
        })
    })
  },

  shareWishlistAction({ commit }, payload) {
    commit('setWishlistErrors', null)
    commit('setWishlistSuccess', null)
    commit("others/loading/setLoading", true, { root: true })
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .mutate({
          mutation: shareWishlistMutation,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          if (!res.data.shareWishlist.error) {
            commit('setWishlistSuccess', res.data.shareWishlist.message)
          }else{
            commit('setWishlistErrors', res.data.shareWishlist.message)
          }
          resolve(res)
          commit("others/loading/setLoading", false, { root: true })
        })
        .catch((error) => {
          let str = error.message.replace(/GraphQL error:/, "")
          commit('setWishlistErrors', str)
          commit("others/loading/setLoading", false, { root: true })
          reject(error)
        })
    })
  }
}
