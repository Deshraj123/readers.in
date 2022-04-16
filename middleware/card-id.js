export default function ({ app, store }) {
  if (!app.$cookies.get("cart_id") || typeof app.$cookies.get("cart_id") === "undefined") {
    const headers = store.getters["others/global/getHeaderData"]
    const payload = {
      query: {},
      variables: {},
      headers: headers,
    }
    return store.dispatch("quote/getCartId", payload)
  }
}
