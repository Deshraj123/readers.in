export default function ({ app, store }) {
  if (app.$cookies.get("cart_id")) {
    const cartId = app.$cookies.get("cart_id")
    const headers = store.getters["others/global/getHeaderData"]
    const payload = {
      variables: { cartId: cartId },
      headers: headers,
    }
    return store.dispatch("quote/getCartAction", payload)
  }
}
