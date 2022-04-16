// import customerOrdersQuery from "~/graphql/sales/customerOrders.graphql"
//import getOrderDetailsQuery from "~/graphql/sales/getOrderDetails.graphql"
//import orderTrackingQuery from "~/graphql/sales/orderTracking.graphql"

export const state = () => ({
  order: {},
  orders: {
    items: [],
    page_info: {
      current_page: 0,
      page_size: 0,
      total_pages: 0
    },
    total_count: 0
  },
  orderDetails: {},
  orderTracking: []
})

export const getters = {
  getOrder(state) {
    return state.order
  },
  getOrders(state) {
    return state.orders
  }
  /*getOrderDetails(state) {
    return state.orderDetails
  },
  getOrderTracking(state) {
    return state.orderTracking
  }*/
}

export const mutations = {
  setOrder(state, data) {
    state.order = data
  },
  setOrders(state, data) {
    if(data.items) {
      data.items.reverse()
    }

    state.orders = data
  },
  /*setOrderDetails(state, data) {
    state.orderDetails = data
  },
  setOrderTracking(state, data) {
    state.orderTracking = data
  }*/
}

export const actions = {
  /*getOrdersAction({ commit }, payload) {
    commit("others/loading/setLoading", true, { root: true })
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .query({
          query: customerOrdersQuery,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          if (res.data.customerOrders) {
            commit('setOrders', res.data.customerOrders.items)
          }
          commit("others/loading/setLoading", false, { root: true })
          resolve(res)
        })
        .catch((error) => {
          commit("others/loading/setLoading", false, { root: true })
          reject(error)
        })
    })
  },
  /*getOrdersDetailsAction({ commit }, payload) {
    commit("partials/loading/setLoading", true, { root: true })
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .query({
          query: getOrderDetailsQuery,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          if (res.data.getOrderDetails) {
            commit('setOrderDetails', res.data.getOrderDetails)
          }
          commit("partials/loading/setLoading", false, { root: true })
          resolve(res)
        })
        .catch((error) => {
          commit("partials/loading/setLoading", false, { root: true })
          reject(error)
        })
    })
  },
  getOrderTrackingAction({ commit }, payload) {
    commit("partials/loading/setLoading", true, { root: true })
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .query({
          query: orderTrackingQuery,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          console.log(res.data.orderTracking)
          if (res.data.orderTracking) {
            commit('setOrderTracking', res.data.orderTracking)
          }
          commit("partials/loading/setLoading", false, { root: true })
          resolve(res)
        })
        .catch((error) => {
          commit("partials/loading/setLoading", false, { root: true })
          reject(error)
        })
    })
  }*/
}
