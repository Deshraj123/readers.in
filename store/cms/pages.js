import pageQuery from '~/graphql/cms/page.graphql'

export const state = () => ({
  homepage: {},
  brand: {},
  searchResultPage: {},
  contactusPage: {},
  quotationPage: {},
  shippingPolicy: {},
  privacyPolicy: {},
  returnPolicy: {},
  paymentInformation: {},
  policySecurity: {},
  faqPage: {},
  sitemap: {},
  notFound: {},
  // my account pages
  myAccount:{},
  productReview: {},
  reviewDetails:{},
  myOrders:{},
  accountInformation:{},
  addnewAddress:{},
  addressBook:{},
  editAddress:{},
  mobilenoUpdate:{},
  newsletterSubscriptions:{},
  billingAgreements:{},
  openSupport:{},
  myWishlist:{},
  myWishlistSharing: {},
  logIn: {},
  signUp: {},
  
})

export const getters = {
  getHomepage(state) {
    return state.homepage
  },
  getBrand(state) {
    return state.brand
  },
  getSearchResultPage(state) {
    return state.searchResultPage
  },
  getContactusPage(state) {
    return state.contactusPage
  },
  getQuotationPage(state) {
    return state.quotationPage
  },
  getShippingPolicy(state) {
    return state.shippingPolicy
  },
  getPrivacyPolicy(state) {
    return state.privacyPolicy
  },
  getReturnPolicy(state) {
    return state.returnPolicy
  },
   getPaymentInformation(state) {
    return state.paymentInformation
  },
   getPolicySecurity(state) {
    return state.policySecurity
  },
   getFaqPage(state) {
    return state.faqPage
  },
    getSitemap(state) {
    return state.sitemap
  },
   getNotFound(state) {
    return state.notFound
  },
  // my account pages
  getMyAccount(state) {
    return state.myAccount
  },
  getProductReview(state) {
    return state.productReview
  },
  getReviewDetails(state) {
    return state.reviewDetails
  },
  getMyOrders(state) {
    return state.myOrders
  },
  getAccountInformation(state) {
    return state.accountInformation
  },
  getAddnewAddress(state) {
    return state.addnewAddress
  },
  getAddressBook(state) {
    return state.addressBook
  },
  getEditAddress(state) {
    return state.editAddress
  },
  getMobilenoUpdate(state) {
    return state.mobilenoUpdate
  },
  getNewsletterSubscriptions(state) {
    return state.newsletterSubscriptions
  },
  getBillingAgreements(state) {
    return state.billingAgreements
  },
  getOpenSupport(state) {
    return state.openSupport
  },
  getMyWishlist(state) {
    return state.myWishlist
  },
  getMyWishlistSharing(state) {
    return state.myWishlistSharing
  },
  //log in//
  getLogIn(state) {
    return state.logIn
  },
  //sign in//
  getSignUp(state) {
    return state.signUp
  }

  
}


export const mutations = {
  setHomepage(state, data) {
    state.homepage = data
  },
  setBrand(state, data) {
    state.brand = data
  },
  setSearchResultPage(state, data) {
    state.searchResultPage = data
  },
  setContactusPage(state, data) {
    state.contactusPage = data
  },
  setQuotationPage(state, data) {
    state.quotationPage = data
  },
  setShippingPolicy(state, data) {
    state.shippingPolicy = data
  },
  setPrivacyPolicy(state, data) {
    state.privacyPolicy = data
  },
   setReturnPolicy(state, data) {
    state.returnPolicy = data
  },
   setPaymentInformation(state, data) {
    state.paymentInformation = data
  },
   setPolicySecurity(state, data) {
    state.policySecurity = data
  },
   setFaqPage(state, data) {
    state.faqPage = data
  },
   setSitemap(state, data) {
    state.sitemap = data
  },
   setNotFound(state, data) {
    state.notFound = data
  },
  // my account pages
  setMyAccount(state, data) {
    state.myAccount = data
  },
  setProductReview(state, data) {
    state.productReview = data
  },
  setReviewDetails(state, data) {
    state.reviewDetails = data
  },
  setMyOrders(state, data) {
    state.myOrders = data
  },
  setAccountInformation(state, data) {
    state.accountInformation = data
  },
  setAddnewAddress(state, data) {
    state.addnewAddress = data
  },
  setAddressBook(state, data) {
    state.addressBook = data
  },
  setEditAddress(state, data) {
    state.editAddress = data
  },
  setMobilenoUpdate(state, data) {
    state.mobilenoUpdate = data
  },
  setNewsletterSubscriptions(state, data) {
    state.newsletterSubscriptions = data
  },
  setBillingAgreements(state, data) {
    state.billingAgreements = data
  },
  setOpenSupport(state, data) {
    state.openSupport = data
  },
  setMyWishlist(state, data) {
    state.myWishlist = data
  },
  setMyWishlistSharing(state, data) {
    state.myWishlistSharing = data
  },
  //log in//
  setLogIn(state, data) {
    state.logIn = data
  },
  //sign in//
  setSignUp(state, data) {
    state.signUp = data
  },
  
}
export const actions = {
  getPagesAction({ commit }, payload) {
    commit("others/loading/setLoading", true, { root: true })
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .query({
          query: pageQuery,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          if (res.data.cmsPage) {
            if (res.data.cmsPage.url_key === "index") {
              commit("setHomepage", res.data.cmsPage)
            }
            if (res.data.cmsPage.url_key === "brand") {
              commit("setBrand", res.data.cmsPage)
            }
            if (res.data.cmsPage.url_key === "pwa-search-page") {
              commit("setSearchResultPage", res.data.cmsPage)
            }
            if (res.data.cmsPage.url_key === "contactus") {
              commit("setContactusPage", res.data.cmsPage)
            }
            if (res.data.cmsPage.url_key === "quotation") {
              commit("setQuotationPage", res.data.cmsPage)
            }
            if (res.data.cmsPage.url_key === "shippingpolicy") {
              commit("setShippingPolicy", res.data.cmsPage)
            }
            if (res.data.cmsPage.url_key === "privacypolicy") {
              commit("setPrivacyPolicy", res.data.cmsPage)
            }
             if (res.data.cmsPage.url_key === "returnpolicy") {
              commit("setReturnPolicy", res.data.cmsPage)
            }
             if (res.data.cmsPage.url_key === "paymentinformation") {
              commit("setPaymentInformation", res.data.cmsPage)
            }
            if (res.data.cmsPage.url_key === "policysecurity") {
              commit("setPolicySecurity", res.data.cmsPage)
            }
            if (res.data.cmsPage.url_key === "faq-page") {
              commit("setFaqPage", res.data.cmsPage)
            }
             if (res.data.cmsPage.url_key === "sitemap") {
              commit("setSitemap", res.data.cmsPage)
            }
             if (res.data.cmsPage.url_key === "404notfound") {
              commit("setNotFound", res.data.cmsPage)
            }
            // my account pages
            if (res.data.cmsPage.url_key === "myaccount") {
              commit("setMyAccount", res.data.cmsPage)
            }
            if (res.data.cmsPage.url_key === "pwa-my-product-reviews") {
              commit("setProductReview", res.data.cmsPage)
            }
            if (res.data.cmsPage.url_key === "pwa-review-details") {
              commit("setReviewDetails", res.data.cmsPage)
            }
            if (res.data.cmsPage.url_key === "myorder") {
              commit("setMyOrders", res.data.cmsPage)
            }
            if (res.data.cmsPage.url_key === "account-information") {
              commit("setAccountInformation", res.data.cmsPage)
            }
            if (res.data.cmsPage.url_key === "pwa-add-new-address") {
              commit("setAddnewAddress", res.data.cmsPage)
            }
            if (res.data.cmsPage.url_key === "address-book") {
              commit("setAddressBook", res.data.cmsPage)
            }
            if (res.data.cmsPage.url_key === "pwa-edit-address") {
              commit("setEditAddress", res.data.cmsPage)
            }
            if (res.data.cmsPage.url_key === "pwa-update-mobile-number") {
              commit("setMobilenoUpdate", res.data.cmsPage)
            }
            if (res.data.cmsPage.url_key === "newsletter-subscriptions") {
              commit("setNewsletterSubscriptions", res.data.cmsPage)
            }
            if (res.data.cmsPage.url_key === "pwa-billing-agreements") {
              commit("setBillingAgreements", res.data.cmsPage)
            }
            if (res.data.cmsPage.url_key === "pwa-open-support") {
              commit("setOpenSupport", res.data.cmsPage)
            }
            if (res.data.cmsPage.url_key === "mywishlist") {
              commit("setMyWishlist", res.data.cmsPage)
            }
            if (res.data.cmsPage.url_key === "pwa-wish-list-sharing") {
              commit("setMyWishlistSharing", res.data.cmsPage)
            }
            //login//
            if (res.data.cmsPage.url_key === "login") {
              commit("setLogIn", res.data.cmsPage)
            }
            //signin//
            if (res.data.cmsPage.url_key === "pwa-signup") {
              commit("setSignUp", res.data.cmsPage)
            }
           
          }





          resolve(res)
          commit("others/loading/setLoading", false, { root: true })
        })
        .catch((error) => {
          reject(error)
          commit("others/loading/setLoading", false, { root: true })
        })
    })
  },
}
