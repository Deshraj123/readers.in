import countriesQuery from "~/graphql/directory/countries.graphql"
import countryQuery from "~/graphql/directory/country.graphql"
import currencyQuery from "~/graphql/directory/currency.graphql"
/**
 * @State
 */
export const state = () => ({
  countries: [],
  regions: [],
  currency: {},
  locale: "en-US",
})

/**
 * @Getters
 */
export const getters = {
  getCountries: (state) => {
    return state.countries
  },
  getRegions: (state) => {
    return state.regions
  },
  getCurrency: (state) => {
    return state.currency
  },
  getLocale: (state) => {
    return state.locale
  },
}

/**
 * @Mutations
 */
export const mutations = {
  setCountries(state, data) {
    state.countries = data
  },
  setRegions(state, data) {
    state.regions = data
  },
  setCurrency(state, data) {
    state.currency = data
  },
}

/**
 * @Actions
 */
export const actions = {
  getCountriesActions({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .query({
          query: countriesQuery,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          if (res.data.countries) {
            commit("setCountries", res.data.countries)
          }
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  getRegionsAction({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .query({
          query: countryQuery,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          if (res.data.country) {
            commit("setRegions", res.data.country.available_regions)
          }
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  getCurrencyAction({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .query({
          query: currencyQuery,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          if (res.data.currency) {
            commit("setCurrency", res.data.currency)
          }
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
