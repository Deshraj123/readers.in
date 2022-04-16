import customAttributeMetadataQuery from '~/graphql/catalog/customAttributeMetadata.graphql'

export const state = () => ({
  customAttributeMetadata: {},
})

export const getters = {
  getCustomAttributeMetadata(state) {
    return state.customAttributeMetadata
  }
}
export const mutations = {
  setCustomAttributeMetadata(state, data) {
    state.customAttributeMetadata = data
  }
}
export const actions = {
  getCustomAttributeMetadataAction({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .query({
          query: customAttributeMetadataQuery,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          if (res.data.customAttributeMetadata.items.length > 0) {
            commit("setCustomAttributeMetadata", res.data.customAttributeMetadata.items)
          }
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
