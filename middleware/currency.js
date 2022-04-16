export default function ({ store }) {
  let currency = store.getters["others/directory/getCurrency"]

  if (Object.keys(currency).length == 0) {
    const headers = store.getters["others/global/getHeaderData"]
    const payload = {
      variables: {},
      headers: headers,
    }
    return store.dispatch("others/directory/getCurrencyAction", payload)
  }
}
