import isEmailAvailabelQuery from "~/graphql/customer/auth/isEmailAvailable.graphql"
import mobileIsAvailableQuery from "~/graphql/customer/auth/mobileIsAvailable.graphql"
import registerMutation from "~/graphql/customer/auth/register.graphql"
import loginOtpMutation from "~/graphql/customer/auth/loginOTP.graphql"
import verifyAndGenerateTokenMutation from "~/graphql/customer/auth/verifyAndGenerateToken.graphql"
import registerOTPMutation from "~/graphql/customer/auth/registerOTP.graphql"
import verifyAndCreateAndGenerateTokenMutation from "~/graphql/customer/auth/verifyAndCreateAndGenerateToken.graphql"
import logoutMutation from "~/graphql/customer/auth/logout.graphql"

export const state = () => ({
  // Buttons
  processingButton: false,
  loginOrRegDetails: {},
  loginOtpResponse: {},
  isLogin: false,
  regOtpResponse: {},
  regDetails: {},



  // Errors
  isEmailAvailabelError: null,
  isMobileAvailabelError: null,
  registerError: null,
  loginError: null

})

export const getters = {
  getProcessingButton(state) {
    return state.processingButton
  },
  getLoginOrRegDetails(state) {
    return state.loginOrRegDetails
  },
  getLoginOtpResponse(state) {
    return state.loginOtpResponse
  },
  getIsLogin(state) {
    return state.isLogin
  },
  getRegOtpResponse(state) {
    return state.regOtpResponse
  },
  getRegDetails(state) {
    return state.regDetails
  },

  // Errors
  getIsEmailAvailabelError(state) {
    return state.isEmailAvailabelError
  },
  getIsMobileAvailabelError(state) {
    return state.isMobileAvailabelError
  },
  getRegisterError(state) {
    return state.registerError
  },
  getLoginError(state) {
    return state.loginError
  }
}
export const mutations = {
  setProcessingButton(state, data) {
    state.processingButton = data
  },
  setLoginOrRegDetails(state, data) {
    state.loginOrRegDetails = data
  },
  setLoginOtpResponse(state, data) {
    state.loginOtpResponse = data
  },
  setIsLogin(state, data) {
    state.isLogin = data
  },
  setRegOtpResponse(state, data) {
    state.regOtpResponse = data
  },
  setRegDetails(state, data) {
    state.regDetails = data
  },

  // Errors
  setIsEmailAvailabelError(state, data) {
    state.isEmailAvailabelError = data
  },
  setIsMobileAvailabelError(state, data) {
    state.isMobileAvailabelError = data
  },
  setRegisterError(state, data) {
    state.registerError = data
  },
  setLoginError(state, data) {
    state.loginError = data
  }
}
export const actions = {
  checkEmailIsAvailable({ commit }, payload) {
    commit("others/loading/setLoading", true, { root: true })
    commit("setIsEmailAvailabelError", null)
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .query({
          query: isEmailAvailabelQuery,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          if (!res.data.isEmailAvailable.is_email_available) {
            commit("setIsEmailAvailabelError", 'Email address already exists in an associated website.')
          }
          resolve(res)
          commit("others/loading/setLoading", false, { root: true })
        })
        .catch((error) => {
          let str = error.message.replace(/GraphQL error:/, "")
          commit("setIsEmailAvailabelError", str)
          reject(error)
          commit("others/loading/setLoading", false, { root: true })
        })
    })
  },

  checkMobileIsAvailableAction({ commit }, payload) {
    commit("others/loading/setLoading", true, { root: true })
    commit("setIsMobileAvailabelError", null)
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .query({
          query: mobileIsAvailableQuery,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          if (!res.data.mobileIsAvailable.mobile_is_available) {
            commit("setIsMobileAvailabelError", 'Mobile number already exists in an associated website.')
          }
          resolve(res)
          commit("others/loading/setLoading", false, { root: true })
        })
        .catch((error) => {
          let str = error.message.replace(/GraphQL error:/, "")
          commit("setIsMobileAvailabelError", str)
          reject(error)
          commit("others/loading/setLoading", false, { root: true })
        })
    })
  },

  createCustomerAction({ commit }, payload) {
    commit("others/loading/setLoading", true, { root: true })
    commit("setRegisterError", null)
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .mutate({
          mutation: registerMutation,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          commit("setProcessingButton", false)
          resolve(res)
          commit("others/loading/setLoading", false, { root: true })
        })
        .catch((error) => {
          let str = error.message.replace(/GraphQL error:/, "")
          commit("setRegisterError", str)
          commit("setProcessingButton", false)
          reject(error)
          commit("others/loading/setLoading", false, { root: true })
        })
    })
  },

  loginOtpAction({ commit }, payload) {
    commit("others/loading/setLoading", true, { root: true })
    commit("setLoginOtpResponse", {})
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .mutate({
          mutation: loginOtpMutation,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          if(res.data.loginOTP) {
            commit("setLoginOtpResponse", res.data.loginOTP)
            if(res.data.loginOTP.error){
              this.$toast.error(res.data.loginOTP.message)
            }
          }

          commit("others/loading/setLoading", false, { root: true })
          resolve(res)
        })
        .catch((error) => {
          let str = error.message.replace(/GraphQL error:/, "")
          commit("setLoginOtpResponse", {
            error: true,
            message: str
          })
          commit("others/loading/setLoading", false, { root: true })
          this.$toast.error(str)
          reject(error)
        })
    })
  },

  logOutAction({ commit }, payload) {
    commit("others/loading/setLoading", true, { root: true })
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .mutate({
          mutation: logoutMutation,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          commit("others/loading/setLoading", false, { root: true })
          resolve(res)
        })
        .catch((error) => {
          commit("others/loading/setLoading", false, { root: true })
          reject(error)
        })
    })
  },

  verifyAndGenerateTokenAction({ commit }, payload) {
    commit("others/loading/setLoading", true, { root: true })
    commit("setLoginError", null)
    commit("setIsLogin", false)
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .mutate({
          mutation: verifyAndGenerateTokenMutation,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          if (res.data.verifyAndGenerateToken) {
            commit("setIsLogin", true)
            commit("setLoginOtpResponse", {})

            // Set Token
            this.$cookies.set("token", res.data.verifyAndGenerateToken.token)
          }
          commit("others/loading/setLoading", false, { root: true })
          resolve(res)
        })
        .catch((error) => {
          let str = error.message.replace(/GraphQL error:/, "")
          commit("setLoginError", str)
          commit("setIsLogin", false)
          commit("others/loading/setLoading", false, { root: true })
          reject(error)
        })
    })
  },

  sendOtpForRegisterAction({ commit }, payload) {
    commit("others/loading/setLoading", true, { root: true })
    commit("setRegOtpResponse", {})
    commit("setRegisterError", null)
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .mutate({
          mutation: registerOTPMutation,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          if(res.data.registerOTP) {
            commit("setRegOtpResponse", res.data.registerOTP)
          }

          commit("others/loading/setLoading", false, { root: true })
          resolve(res)
        })
        .catch((error) => {
          let str = error.message.replace(/GraphQL error:/, "")
          commit("setRegisterError", str)
          commit("others/loading/setLoading", false, { root: true })
          reject(error)
        })
    })
  },

  verifyAndCreateAndGenerateTokenAction({ commit }, payload) {
    commit("others/loading/setLoading", true, { root: true })
    commit("setRegisterError", null)
    commit("setIsLogin", false)
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .mutate({
          mutation: verifyAndCreateAndGenerateTokenMutation,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          if (res.data.verifyAndCreateAndGenerateToken) {
            commit("setIsLogin", true)
            commit("setRegOtpResponse", {})

            // Set Token
            this.$cookies.set("token", res.data.verifyAndCreateAndGenerateToken.token)
          }
          commit("others/loading/setLoading", false, { root: true })
          resolve(res)
        })
        .catch((error) => {
          let str = error.message.replace(/GraphQL error:/, "")
          commit("setRegisterError", null)
          commit("setIsLogin", false)
          commit("others/loading/setLoading", false, { root: true })
          reject(error)
        })
    })
  },
}
