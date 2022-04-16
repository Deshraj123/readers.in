export default function ({ store }) {
  let storeConfigData = store.getters["others/global/getConfig"]

  if (Object.keys(storeConfigData).length < 1) {
    const headers = store.getters["others/global/getHeaderData"]
    const payload = {
      variables: {},
      headers: headers,
    }

    return store.dispatch("others/global/getStoreConfigAction", payload)
  }
}
