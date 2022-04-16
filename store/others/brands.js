import brandsQuery from "~/graphql/others/brands.graphql"
/**
 * @State
 */
export const state = () => ({
  brands: [],
  letters: [],
  seletedBrand: {},
  brandProductShow: false
})

/**
 * @Getters
 */
export const getters = {
  getBrands: (state) => {
    return state.brands
  },
  getLetters: (state) => {
    return state.letters
  },
  getSeletedBrand: (state) => {
    return state.seletedBrand
  },
  getBrandProductShow(state) {
    return state.brandProductShow
  }
}

/**
 * @Mutations
 */
export const mutations = {
  setBrands(state, data) {
    state.brands = data
  },
  setLetters(state, data) {
    state.letters = data
  },
  setSeletedBrand(state, data) {
    state.seletedBrand = data
  },
  setBrandProductShow(state, data) {
    state.brandProductShow = data
  }
}

/**
 * @Actions
 */
export const actions = {
  getBrandsAction({ commit }, payload) {
    commit("others/loading/setLoading", true, { root: true })
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .query({
          query: brandsQuery,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          if (res.data.brands) {
            commit("setBrands", res.data.brands.brands)
            commit("setLetters", res.data.brands.letters)
          }
          commit("others/loading/setLoading", false, { root: true })
          resolve(res)
        })
        .catch((error) => {
          commit("others/loading/setLoading", false, { root: true })
          reject(error)
        })
    })
  }
}
