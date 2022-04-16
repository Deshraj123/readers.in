import requestQuoteMutation from "~/graphql/others/requestQuote.graphql"
import requestquoteproductsQuery from '~/graphql/catalog/requestquoteproducts.graphql'

export const state = () => ({
  requestQuoteError: null,
  requestQuoteSuccess: null,
  searchRequestQuoteProducts: [],
  searchRequestQuoteProductsShow: false
})

export const getters = {
  getRequestQuoteError(state) {
    return state.requestQuoteError
  },
  getRequestQuoteSuccess(state) {
    return state.requestQuoteSuccess
  },
  getRequestQuoteSearchProducts(state) {
    return state.searchRequestQuoteProducts
  },
  getRequestQuoteSearchProductsShow(state) {
    return state.searchRequestQuoteProductsShow
  }
}

export const mutations = {
  setRequestQuoteError(state, data) {
    state.requestQuoteError = data
  },
  setRequestQuoteSuccess(state, data) {
    state.requestQuoteSuccess = data
  },
  setRequestQuoteSearchProducts(state, data) {
    state.searchRequestQuoteProducts = data
  },
  setRequestQuoteSearchProductsShow(state, data) {
    state.searchRequestQuoteProductsShow = data
  }
}

export const actions = {

  quoteRequestSubmitAction({ commit }, payload) {
    commit("setRequestQuoteError", null)
    commit("setRequestQuoteSuccess", null)
    commit("others/loading/setLoading", true, { root: true })
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .mutate({
          mutation: requestQuoteMutation,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          if (!res.data.requestQuote.error) {
            commit("setRequestQuoteSuccess", res.data.requestQuote.message)
            setTimeout(function(){
              commit("setRequestQuoteSuccess", null)
            }, 5000)
          }else{
            commit("setRequestQuoteError", res.data.requestQuote.message)
            setTimeout(function(){
              commit("setRequestQuoteError", null)
            }, 5000)
          }

          resolve(res)
          commit("others/loading/setLoading", false, { root: true })
        })
        .catch((error) => {
          let str = error.message.replace(/GraphQL error:/, "")
          commit("setRequestQuoteError", str)
          commit("others/loading/setLoading", false, { root: true })
          reject(error)
        })
    })
  },

  getSearchProductsForRequestQuoteAction({ commit }, payload) {
    commit("others/loading/setLoading", true, { root: true })
    commit("setRequestQuoteSearchProducts", [])
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .query({
          query: requestquoteproductsQuery,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          if (res.data.products.items) {
            commit("setRequestQuoteSearchProducts", res.data.products.items)
          }
          resolve(res)
          commit("others/loading/setLoading", false, { root: true })
          commit("setRequestQuoteSearchProductsShow", true)
        })
        .catch((error) => {
          reject(error)
          commit("others/loading/setLoading", false, { root: true })
        })
    })
  }
}
