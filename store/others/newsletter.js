import subscribeEmailToNewsletterMutation from "~/graphql/others/subscribeEmailToNewsletter.graphql"

export const state = () => ({
  status: {},
  newsletterError: null,
  newsletterSuccess: null
})

export const getters = {
  getStatus(state) {
    return state.status
  },
  getNewsletterError(state) {
    return state.newsletterError
  },
  getNewsletterSuccess(state) {
    return state.newsletterSuccess
  },
}

export const mutations = {
  setStatus(state, data) {
    state.status = data
  },
  setNewsletterError(state, data) {
    state.newsletterError = data
  },
  setNewsletterSuccess(state, data) {
    state.newsletterSuccess = data
  }
}

export const actions = {
  subscribeEmailToNewsletterAction({ commit }, payload) {
    commit("setNewsletterError", null)
    commit("setNewsletterSuccess", null)
    commit("others/loading/setLoading", true, { root: true })
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .mutate({
          mutation: subscribeEmailToNewsletterMutation,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          if (res.data.subscribeEmailToNewsletter) {
            commit("setStatus", res.data.subscribeEmailToNewsletter.status)
            commit("setNewsletterSuccess", "Newsletter subscribed successfully.")
          }
          setTimeout(function(){
            commit("setNewsletterSuccess", null)
          }, 5000)
          resolve(res)
          commit("others/loading/setLoading", false, { root: true })
          this.$toast.success('Newsletter subscribed successfully.')
        })
        .catch((error) => {
          let str = error.message.replace(/GraphQL error:/, "")
          commit("setNewsletterError", str)
          this.$toast.error(str)
          commit("others/loading/setLoading", false, { root: true })
          reject(error)
        })
    })
  }
}
