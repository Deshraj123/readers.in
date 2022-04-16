export default function ({ app, store, error }) {
  let updateHeaderByCookieValues = false

  let headerData = store.getters["others/global/getHeaderData"]

  if (app.$cookies.get("store")) {
    updateHeaderByCookieValues = true
    let store = app.$cookies.get("store")
    headerData.Store = store
  }

  if (app.$cookies.get("token")) {
    updateHeaderByCookieValues = true
    let token = app.$cookies.get("token")
    headerData.Authorization = "Bearer " + token
  }

  if (!updateHeaderByCookieValues) {
    app.$cookies.set("store", headerData.Store)
  }

  return store.dispatch("others/global/updateHeaderAction", headerData)
}
