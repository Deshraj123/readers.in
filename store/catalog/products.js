import categoryProductsQuery from '~/graphql/catalog/categoryproducts.graphql'
import productsQuery from '~/graphql/catalog/products.graphql'
import reviewMutation from '~/graphql/catalog/review.graphql'

export const state = () => ({
  simpleCode: 'simple',
  configurationCode: 'configurable',
  bundleCode: 'bundle',
  groupCode: 'grouped',
  products: [],
  loadinProducts: false,
  aggregations: [],
  searchKeyword: '',
  searchProducts: [],
  searchProductsShow: false,
  searchResultProductsShow: false,
  isProduct: false,
  product: {},

  // Configuration Product
  selectedConfigurationProduct:{},

  // Group Products
  groupProducts:[],

  // Bundle Products
  bundleProductPrice: 0,
  bundleProductCustomizeShow: false,

  // Success
  createReviewSuccess: null,

  // Error
  createReviewError: null
})

export const getters = {
  getSimpleCode(state) {
    return state.simpleCode
  },
  getConfigurationCode(state) {
    return state.configurationCode
  },
  getBundleCode(state) {
    return state.bundleCode
  },
  getGroupCode(state) {
    return state.groupCode
  },
  getProducts(state) {
    return state.products
  },
  getProduct(state) {
    return state.product
  },
  getAggregations(state) {
    return state.aggregations
  },
  getSearchProducts(state) {
    return state.searchProducts
  },
  getSearchProductsShow(state) {
    return state.searchProductsShow
  },
  getSearchResultProductsShow(state) {
    return state.searchResultProductsShow
  },
  getSearchKeyword(state) {
    return state.searchKeyword
  },
  getSelectedConfigurationProduct(state) {
    return state.selectedConfigurationProduct
  },
  getGroupProducts(state) {
    return state.groupProducts
  },
  getBundleProductPrice(state) {
    return state.bundleProductPrice
  },
  getBundleProductCustomizeShow(state) {
    return state.bundleProductCustomizeShow
  },
  getLoadinProducts(state) {
    return state.loadinProducts
  },


  // Success
  getCreateReviewSuccess(state) {
    return state.createReviewSuccess
  },

  // Errors
  getCreateReviewError(state) {
    return state.createReviewError
  },

  getIsProduct(state) {
    return state.isProduct
  }
}
export const mutations = {
  setProducts(state, data) {

    // set aggregations
    state.aggregations =[]
    let fromPrice = 0
    let toPrice = 0
    if(data.aggregations.length > 0){
      data.aggregations.forEach(function(value, index){
        if(value.attribute_code != 'category_id'){
          value['visible'] = false
          if(index === 0) {
            value['visible'] = true
          }
          if(value.options.length > 0){
            value.options.forEach(function(option, _index){
              value.options[_index]['selected']= false

              if(value.attribute_code == 'price') {
                let priceOptionValues= option.value.split('_')
                if(_index === 0){
                  fromPrice = parseInt(priceOptionValues[0])
                }

                if(toPrice < priceOptionValues[1]) {
                  toPrice = parseInt(priceOptionValues[1])
                }
              }

            })
          }

          // Custom For Price
          if(value.attribute_code === 'price') {
            value['value']= [fromPrice, toPrice]
          }

          state.aggregations.push(value)
        }
      })
    }

    // Set Custom Field
    if(data.items.length > 0){
      data.items.forEach(function(value, index){
        data.items[index]['qty'] = 1
        data.items[index]['qty_error_msg'] = null
      })
    }

    state.products = data
  },

  updateProducts(state, data){
    state.products = data
  },

  setProduct(state, data) {
    if(data.type_id == state.configurationCode && data.configurable_options.length > 0) {
      data.configurable_options.forEach(function(option, index){
        if(option.values.length > 0) {
          option.values.forEach(function(optionValue, _index){
            data.configurable_options[index].values[_index]['selected'] = false
            if(_index == 0) {
              data.configurable_options[index].values[_index]['selected'] = true
            }
          })
        }
      })

      data.configurable_options.sort(function(a, b) {
        return a.position - b.position;
      })
    }
    state.product = data
  },

  updateProduct(state, data) {
    state.product = data
  },

  setAggregations(state, data) {
    state.aggregations = data
  },

  setSearchProducts(state, data) {

    // Set Custom Field
    if(data.length > 0){
      data.forEach(function(value, index){
        data[index]['qty'] = 1
        data[index]['qty_error_msg'] = null
      })
    }

    state.searchProducts = data
  },
  setSearchProductsDirect(state, data) {
    state.searchProducts = data
  },
  setSearchProductsShow(state, data) {
    state.searchProductsShow = data
  },
  setSearchResultProductsShow(state, data) {
    state.searchResultProductsShow = data
  },
  setSearchKeyword(state, data) {
    state.searchKeyword = data
  },
  setSelectedConfigurationProduct(state, data) {
    state.selectedConfigurationProduct = data
  },
  setGroupProducts(state, data) {
    state.groupProducts = data
  },
  setBundleProductPrice(state, data) {
    state.bundleProductPrice = data
  },
  setBundleProductCustomizeShow(state, data) {
    state.bundleProductCustomizeShow = data
  },
  setLoadinProducts(state, data) {
    state.loadinProducts = data
  },

  // Success
  setCreateReviewSuccess(state, data) {
    state.createReviewSuccess = data
  },

  // Errors
  setCreateReviewError(state, data) {
    state.createReviewError = data
  },

  setIsProduct(state, data) {
    state.isProduct = data
  }
}
export const actions = {
  getProductsAction({ commit }, payload) {
    commit("setLoadinProducts", true)
    commit("others/loading/setLoading", true, { root: true })
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .query({
          query: categoryProductsQuery,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          if (res.data.products) {
            commit("setProducts", res.data.products)
            commit("others/loading/setLoading", false, { root: true })
          }
          resolve(res)
          commit("setLoadinProducts", false)
        })
        .catch((error) => {
          reject(error)
          commit("others/loading/setLoading", false, { root: true })
          commit("setLoadinProducts", false)
        })
    })
  },
  getProductAction({ commit }, payload) {
    commit('setIsProduct', false)
    commit("others/loading/setLoading", true, { root: true })
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .query({
          query: productsQuery,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          if (res.data.products.items.length > 0) {
            commit('setIsProduct', true)
            commit("setProduct", res.data.products.items[0])
          }
          resolve(res)
          commit("others/loading/setLoading", false, { root: true })
        })
        .catch((error) => {
          let str = error.message.replace(/GraphQL error:/, "")
          commit("others/loading/setLoading", false, { root: true })
          this.$toast.error(str)
          reject(error)
        })
    })
  },
  getSearchProductsAction({ commit }, payload) {
    commit("others/loading/setLoading", true, { root: true })
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .query({
          query: categoryProductsQuery,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          if (res.data.products.items) {
            commit("setSearchProducts", res.data.products.items)
          }
          resolve(res)
          commit("others/loading/setLoading", false, { root: true })
          commit("setSearchProductsShow", true)
        })
        .catch((error) => {
          reject(error)
          commit("others/loading/setLoading", false, { root: true })
        })
    })
  },
  createReviewAction({ commit }, payload) {
    commit('setCreateReviewSuccess', null)
    commit('setCreateReviewError', null)
    commit("others/loading/setLoading", true, { root: true })
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .mutate({
          mutation: reviewMutation,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          if (res.data.review) {
            commit("setProduct", res.data.review.product)
          }
          commit('setCreateReviewSuccess', "You submitted your review for moderation.")
          setTimeout(function(){
            commit('setCreateReviewSuccess', null)
          }, 5000)

          commit("others/loading/setLoading", false, { root: true })
          resolve(res)
        })
        .catch((error) => {
          let str = error.message.replace(/GraphQL error:/, "")
          commit("setCreateReviewError", str)
          commit("others/loading/setLoading", false, { root: true })
          reject(error)
        })
    })
  }
}
