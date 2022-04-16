import categorylistpageQuery from '~/graphql/catalog/categorylistpage.graphql'

export const state = () => ({
  homeSchoolSupplies: {},
  homeArtsCraft: {},
  homeOfficeSupplies: {},
  category:{},
  isCategory: false,
  currentPage: 1,
  sortCategory: {
    position: 'ASC'
  },

  // Pagination
  paginations: [],
  showPreviousButton: false,
  showNextButton: false,
})

export const getters = {
  getHomeSchoolSupplies(state) {
    return state.homeSchoolSupplies
  },
  getHomeArtsCraft(state) {
    return state.homeArtsCraft
  },
  getHomeOfficeSupplies(state) {
    return state.homeOfficeSupplies
  },
  getCategory(state) {
    return state.category
  },
  getIsCategory(state) {
    return state.isCategory
  },
  getCurrentPage(state) {
    return state.currentPage
  },
  getSortCategory(state) {
    return state.sortCategory
  },

  //Pagination
  getPaginations(state) {
    return state.paginations
  },
  getShowPreviousButton(state) {
    return state.showPreviousButton
  },
  getShowNextButton(state) {
    return state.showNextButton
  }
}
export const mutations = {
  setHomeSchoolSupplies(state, data) {
    state.homeSchoolSupplies = data
  },
  setHomeArtsCraft(state, data) {
    state.homeArtsCraft = data
  },
  setHomeOfficeSupplies(state, data) {
    state.homeOfficeSupplies = data
  },
  setCategory(state, data) {

    // breadcrumbs order manage
    if(data.breadcrumbs != null && data.breadcrumbs.length > 0) {
      let newBreadcrumbs = []
      data.breadcrumbs.forEach(function(value){
        newBreadcrumbs[value.category_level] = value
      })
      data.breadcrumbs = newBreadcrumbs.filter(function(value){ return value != undefined })
    }

    // Add Default Sort
    //state.sortCategory = data.default_sort_by

    state.category = data
  },
  setIsCategory(state, data) {
    state.isCategory = data
  },
  setCurrentPage(state, data) {
    state.currentPage = data
  },
  setSortCategory(state, data) {
    state.sortCategory = data
  },

  // Pagination
  setPaginations(state, data) {
    state.paginations = data
  },
  setShowPreviousButton(state, data) {
    state.showPreviousButton = data
  },
  setShowNextButton(state, data) {
    state.showNextButton = data
  }
}
export const actions = {
  getCategoryAction({ commit }, payload) {
    if(payload.loading) {
      commit("others/loading/setLoading", true, { root: true })
    }

    commit('setIsCategory', false)
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .query({
          query: categorylistpageQuery,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          if (res.data.categoryList.length > 0) {

            if(res.data.categoryList[0].url_key === 'school-supplies') {
              commit("setHomeSchoolSupplies", res.data.categoryList[0])
            }else if(res.data.categoryList[0].url_key === 'art-crafts') {
              commit("setHomeArtsCraft", res.data.categoryList[0])
            }else if(res.data.categoryList[0].url_key === 'office-supplies') {
              commit("setHomeOfficeSupplies", res.data.categoryList[0])
            }

            commit('setIsCategory', true)
            commit("setCategory", res.data.categoryList[0])



          }
          resolve(res)
          commit("others/loading/setLoading", false, { root: true })
        })
        .catch((error) => {
          reject(error)
          commit("others/loading/setLoading", false, { root: true })
        })
    })
  }
}
