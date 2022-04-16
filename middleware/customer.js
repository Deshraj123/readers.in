export default function ({ app, store }) {
  if (app.$cookies.get("token")) {
    let headers = store.getters["others/global/getHeaderData"]
    const payload = {
      query: {},
      variables: {},
      headers: headers,
    }
    return store.dispatch("customer/getCustomerAction", payload)
  }

  return store.commit("customer/auth/setIsLogin", false)
}
