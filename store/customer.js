import customerQuery from "~/graphql/customer/customer.graphql"
import updateCustomerMutation from "~/graphql/customer/updateCustomer.graphql"
import createCustomerAddressMutation from "~/graphql/customer/createCustomerAddress.graphql"
import updateCustomerAddressMutation from "~/graphql/customer/updateCustomerAddress.graphql"
import updateCustomerMobileNumberMutation from "~/graphql/customer/updateCustomerMobileNumber.graphql"
import deleteCustomerAddressMutation from "~/graphql/customer/deleteCustomerAddress.graphql"

export const state = () => ({
  customer: {},
  isChangePassword: false,
  isChangeEmail: false,

  // Success
  updateCustomerSuccess: null,
  addressSuccess: null,
  customerMobileNumberSuccess: null,

  // Error
  customerError: null,
  addressError: null,
  customerMobileNumberError: null
})

export const getters = {
  getCustomer(state) {
    return state.customer
  },
  getIsChangePassword(state) {
    return state.isChangePassword
  },
  getIsChangeEmail(state) {
    return state.isChangeEmail
  },

  // Success
  getUpdateCustomerSuccess(state) {
    return state.updateCustomerSuccess
  },
  getAddressSuccess(state) {
    return state.addressSuccess
  },
  getCustomerMobileNumberSuccess(state) {
    return state.customerMobileNumberSuccess
  },

  // Error
  getCustomerError(state) {
    return state.customerError
  },
  getUpdateCustomerError(state) {
    return state.updateCustomerError
  },
  getAddressError(state) {
    return state.addressError
  },
  getCustomerMobileNumberError(state) {
    return state.customerMobileNumberError
  }
}

export const mutations = {
  setCustomer(state, data) {
    state.customer = data
  },
  setCustomerWishlist(state, data) {
    state.isChangePassword = data
  },
  setIsChangePassword(state, data) {
    state.isChangePassword = data
  },
  setIsChangeEmail(state, data) {
    state.isChangeEmail = data
  },

  // Success
  setUpdateCustomerSuccess(state, data) {
    state.updateCustomerSuccess = data
  },
  setAddressSuccess(state, data) {
    state.addressSuccess = data
  },
  setCustomerMobileNumberSuccess(state, data) {
    state.customerMobileNumberSuccess = data
  },

  // Error
  setCustomerError(state, data) {
    state.customerError = data
  },
  setUpdateCustomerError(state, data) {
    state.updateCustomerError = data
  },
  setAddressError(state, data) {
    state.addressError = data
  },
  setCustomerMobileNumberError(state, data) {
    state.customerMobileNumberError = data
  }
}

export const actions = {
  getCustomerAction({ commit }, payload) {
    commit("setCustomerError", null)
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .query({
          fetchPolicy: 'no-cache',
          query: customerQuery,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          if (res.data.customer) {
            commit("setCustomer", res.data.customer)
            commit("customer/auth/setIsLogin", true, { root: true })
            commit("customer/wishlist/setWishlist", res.data.customer.wishlist, { root: true })
            commit("sales/setOrders", res.data.customer.orders, { root: true })
          }
          resolve(res)
        })
        .catch((error) => {
          let str = error.message.replace(/GraphQL error:/, "")
          commit("setCustomerError", str)
          this.$cookies.remove("cart_id")
          this.$cookies.remove("token")
          commit("customer/auth/setIsLogin", false, { root: true })
          this.$router.push({ path: "/" })
          reject(error)
          window.location.reload()
        })
    })
  },

  updateCustomerAction({ commit }, payload) {
    commit("setUpdateCustomerError", null)
    commit("setUpdateCustomerSuccess", null)
    commit("others/loading/setLoading", true, { root: true })
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .mutate({
          mutation: updateCustomerMutation,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          if (res.data.updateCustomer.customer) {
            commit("setUpdateCustomerSuccess", "Account information updated.")
            commit("setCustomer", res.data.updateCustomer.customer)
            commit("customer/wishlist/setWishlist", res.data.updateCustomer.customer.wishlist, { root: true })
          }
          commit("others/loading/setLoading", false, { root: true })
          setTimeout(function(){
            commit("setUpdateCustomerSuccess", null)
          }, 5000)
          resolve(res)
        })
        .catch((error) => {
          let str = error.message.replace(/GraphQL error:/, "")
          commit("setUpdateCustomerError", str)
          setTimeout(function(){
            commit("setUpdateCustomerError", null)
          }, 5000)
          commit("others/loading/setLoading", false, { root: true })
          reject(error)
        })
    })
  },

  createAddressAction({ commit }, payload) {
    commit("setAddressError", null)
    commit("setAddressSuccess", null)
    commit("others/loading/setLoading", true, { root: true })
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .mutate({
          mutation: createCustomerAddressMutation,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          commit("setAddressSuccess", "Address successfully updated.")
          commit("others/loading/setLoading", false, { root: true })
          resolve(res)
          setTimeout(function(){
            commit("setAddressSuccess", null)
          }, 5000)
        })
        .catch((error) => {
          let str = error.message.replace(/GraphQL error:/, "")
          commit("setAddressError", str)
          commit("others/loading/setLoading", false, { root: true })
          reject(error)
          setTimeout(function(){
            commit("setAddressError", null)
          }, 5000)
        })
    })
  },

  updateAddressAction({ commit }, payload) {
    commit("setAddressError", null)
    commit("setAddressSuccess", null)
    commit("others/loading/setLoading", true, { root: true })
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .mutate({
          mutation: updateCustomerAddressMutation,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          commit("setAddressSuccess", "Address successfully updated.")
          setTimeout(function(){
            commit("setAddressSuccess", null)
          }, 5000)
          commit("others/loading/setLoading", false, { root: true })
          resolve(res)
        })
        .catch((error) => {
          let str = error.message.replace(/GraphQL error:/, "")
          commit("setAddressError", str)
          setTimeout(function(){
            commit("setAddressError", null)
          }, 5000)
          commit("others/loading/setLoading", false, { root: true })
          reject(error)
        })
    })
  },

  updateCustomerMobileNumberAction({ commit }, payload) {
    commit("setCustomerMobileNumberError", null)
    commit("setCustomerMobileNumberSuccess", null)
    commit("others/loading/setLoading", true, { root: true })
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .mutate({
          mutation: updateCustomerMobileNumberMutation,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          if(!res.data.updateCustomerMobileNumber.error){
            commit("setCustomerMobileNumberSuccess", res.data.updateCustomerMobileNumber.message)
          }
          setTimeout(function(){
            commit("setCustomerMobileNumberSuccess", null)
          }, 5000)
          commit("others/loading/setLoading", false, { root: true })
          resolve(res)
        })
        .catch((error) => {
          let str = error.message.replace(/GraphQL error:/, "")
          commit("setCustomerMobileNumberError", str)
          setTimeout(function(){
            commit("setCustomerMobileNumberError", null)
          }, 5000)
          commit("others/loading/setLoading", false, { root: true })
          reject(error)
        })
    })
  },

  removeAddressAction({ commit }, payload) {
    commit("setAddressError", null)
    commit("setAddressSuccess", null)
    commit("others/loading/setLoading", true, { root: true })
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .mutate({
          mutation: deleteCustomerAddressMutation,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          commit("others/loading/setLoading", false, { root: true })
          resolve(res)
          this.$toast.success('Address is removed.')
        })
        .catch((error) => {
          let str = error.message.replace(/GraphQL error:/, "")
          commit("setAddressError", str)
          commit("others/loading/setLoading", false, { root: true })
          this.$toast.error(str)
          reject(error)
        })
    })
  }


}
