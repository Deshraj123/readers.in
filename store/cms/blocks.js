import blocksQuery from "~/graphql/cms/blocks.graphql"

export const state = () => ({
  homeBanner: {},
  headerTopbar: {},
  headerMiddleleft: {},
  headerPhonenumber: {},
  headerReaderoffer: {},
  homeBrands: {},
  homeFeaturecate: {},
  //footer
  footerSocialicons: {},
  footerLogocol: {},
  footerTopcatecol: {},
  footerInfocol: {},
  footerHelpcol: {},
  footerContactcol: {},
  footerCopyrights: {},
  //megamenu
  officeSubmegamenu: {},
  schoolSubmegamenu: {},
  toygamesSubmegamenu: {},
  inktonerSubmegamenu: {},
  artcraftSubmegamenu: {},
  corporategiftsSubmegamenu: {},
  cleaningSubmegamenu: {},
  mobCustommenu: {},
  //footer_help_links
  returnPolicy: {},
  paymentInformation: {},
  policiesAndSecurity: {},
  shippingPolicy: {},
  faQ: {},
   //footer_info_links
   privacyPolicy: {},
   termsConditions: {},
   contactusAddress: {},
   //Featured_brands_slider
   featuredBrand: {},
   productpageShareicon: {},

   bankDetails: {}

})

export const getters = {
  //home
  getHomeBanner(state) {
    return state.homeBanner
  },
  getHeaderTopbar(state) {
    return state.headerTopbar
  },
  getHeaderMiddleleft(state) {
    return state.headerMiddleleft
  },
  getHeaderPhonenumber(state) {
    return state.headerPhonenumber
  },
  getHeaderReaderoffer(state) {
    return state.headerReaderoffer
  },
  getHomeBrands(state) {
    return state.homeBrands
  },
  getHomeFeaturecate(state) {
    return state.homeFeaturecate
  },
  getFooterSocialicons(state) {
    return state.footerSocialicons
  },
  //footer
  getFooterLogocol(state) {
    return state.footerLogocol
  },
  getFooterTopcatecol(state) {
    return state.footerTopcatecol
  },
  getFooterInfocol(state) {
    return state.footerInfocol
  },
  getFooterHelpcol(state) {
    return state.footerHelpcol
  },
  getFooterContactcol(state) {
    return state.footerContactcol
  },
  getFooterCopyrights(state) {
    return state.footerCopyrights
  },
  //megamenu
  getOfficeSubmegamenu(state) {
    return state.officeSubmegamenu
  },
  getSchoolSubmegamenu(state) {
    return state.schoolSubmegamenu
  },
  getToygamesSubmegamenu(state) {
    return state.toygamesSubmegamenu
  },
  getInktonerSubmegamenu(state) {
    return state.inktonerSubmegamenu
  },
  getArtcraftSubmegamenu(state) {
    return state.artcraftSubmegamenu
  },
  getCorporategiftsSubmegamenu(state) {
    return state.corporategiftsSubmegamenu
  },
  getCleaningSubmegamenu(state) {
    return state.cleaningSubmegamenu
  },
  getMobCustommenu(state) {
    return state.mobCustommenu
  },
  //footer_help_links
  getReturnPolicy(state) {
    return state.returnPolicy
  },
  getPaymentInformation(state) {
    return state.paymentInformation
  },
  getPoliciesAndSecurity(state) {
    return state.policiesAndSecurity
  },
  getShippingPolicy(state) {
    return state.shippingPolicy
  },
  getFAQ(state) {
    return state.faQ
  },
  //footer_info_links
  getPrivacyPolicy(state) {
    return state.privacyPolicy
  },
  getTermsConditions(state) {
    return state.termsConditions
  },
  getContactusAddress(state) {
    return state.contactusAddress
  },
  //featured_brand
  getFeaturedBrand(state) {
    return state.featuredBrand
  },
  getProductpageShareicon(state) {
    return state.productpageShareicon
  },
  getBankDetails(state) {
    return state.bankDetails
  }


}


//////////////////////////
export const mutations = {
  //header
  setHeaderMiddleleft(state, data) {
    state.headerMiddleleft = data
  },
  setHeaderTopbar(state, data) {
    state.headerTopbar = data
  },

  setHeaderPhonenumber(state, data) {
    state.headerPhonenumber = data
  },
  setHeaderReaderoffer(state, data) {
    state.headerReaderoffer = data
  },
  //home
  setHomeBanner(state, data) {
    state.homeBanner = data
  },
  setHomeBrands(state, data) {
    state.homeBrands = data
  },
  setHomeFeaturecate(state, data) {
    state.homeFeaturecate = data
  },
  //footer
  setFooterSocialicons(state, data) {
    state.footerSocialicons = data
  },
  setFooterLogocol(state, data) {
    state.footerLogocol = data
  },
  setFooterTopcatecol(state, data) {
    state.footerTopcatecol = data
  },
  setFooterInfocol(state, data) {
    state.footerInfocol = data
  },
  setFooterHelpcol(state, data) {
    state.footerHelpcol = data
  },
  setFooterContactcol(state, data) {
    state.footerContactcol = data
  },
  setFooterCopyrights(state, data) {
    state.footerCopyrights = data
  },
  //megamenu
  setOfficeSubmegamenu(state, data) {
    state.officeSubmegamenu = data
  },
  setSchoolSubmegamenu(state, data) {
    state.schoolSubmegamenu = data
  },
  setToygamesSubmegamenu(state, data) {
    state.toygamesSubmegamenu = data
  },
  setInktonerSubmegamenu(state, data) {
    state.inktonerSubmegamenu = data
  },
  setArtcraftSubmegamenu(state, data) {
    state.artcraftSubmegamenu = data
  },
  setCorporategiftsSubmegamenu(state, data) {
    state.corporategiftsSubmegamenu = data
  },
  setCleaningSubmegamenu(state, data) {
    state.cleaningSubmegamenu = data
  },
  setMobCustommenu(state, data) {
    state.mobCustommenu = data
  },
  //footer_help_links
  setReturnPolicy(state, data) {
    state.returnPolicy = data
  },
  setPaymentInformation(state, data) {
     state.paymentInformation = data
  },
  setPoliciesAndSecurity(state, data) {
     state.policiesAndSecurity = data
  },
  setShippingPolicy(state, data) {
    state.shippingPolicy = data
  },
  setFAQ(state, data) {
    state.faQ = data
  },
  //footer_info_links
  setPrivacyPolicy(state, data) {
    state.privacyPolicy = data
  },
  setTermsConditions(state, data) {
    state.termsConditions = data
  },
  setContactusAddress(state, data) {
    state.contactusAddress = data
  },
  //featured brand
  setFeaturedBrand(state, data) {
    state.featuredBrand = data
  },
  setProductpageShareicon(state, data) {
    state.productpageShareicon = data
  },
  setBankDetails(state, data) {
    state.bankDetails = data
  }
}
export const actions = {
  getBlocksAction({ commit }, payload) {
    //commit("others/loading/setLoading", true, { root: true })
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .query({
          query: blocksQuery,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          if (res.data.cmsBlocks.items.length > 0) {
            res.data.cmsBlocks.items.forEach(function (value) {

              // Home
              if (value.identifier == "pwa-home-topbanner") {
                commit("setHomeBanner", value)
              }
              if (value.identifier == "pwa-header-topbar") {
                commit("setHeaderTopbar", value)
              }
              if (value.identifier == "pwa-hmiddle-left") {
                commit("setHeaderMiddleleft", value)
              }
              if (value.identifier == "pwa-header-phonenumber") {
                commit("setHeaderPhonenumber", value)
              }
              if (value.identifier == "pwa-header-readeroffer") {
                commit("setHeaderReaderoffer", value)
              }
              if (value.identifier == "pwa-home-brands") {
                commit("setHomeBrands", value)
              }
              if (value.identifier == "pwa-home-featurecate") {
                commit("setHomeFeaturecate", value)
              }





              /////////footer start//////
              if (value.identifier == "pwa-footer-socialicons") {
                commit("setFooterSocialicons", value)
              }
              if (value.identifier == "pwa-footer-logocol") {
                commit("setFooterLogocol", value)
              }
              if (value.identifier == "pwa-footer-topcatecol") {
                commit("setFooterTopcatecol", value)
              }
              if (value.identifier == "pwa-footer-infocol") {
                commit("setFooterInfocol", value)
              }
              if (value.identifier == "pwa-footer-helpcol") {
                commit("setFooterHelpcol", value)
              }
              if (value.identifier == "pwa-footer-contactcol") {
                commit("setFooterContactcol", value)
              }
              if (value.identifier == "pwa-footer-copyrights") {
                commit("setFooterCopyrights", value)
              }
              //megamenu
              if (value.identifier == "pwa-office-submegamenu") {
                commit("setOfficeSubmegamenu", value)
              }
              if (value.identifier == "pwa-school-submegamenu") {
                commit("setSchoolSubmegamenu", value)
              }
              if (value.identifier == "pwa-toygame-submegamenu") {
                commit("setToygamesSubmegamenu", value)
              }
              if (value.identifier == "pwa-inktoner-submegamenu") {
                commit("setInktonerSubmegamenu", value)
              }
              if (value.identifier == "pwa-artcraft-submegamenu") {
                commit("setArtcraftSubmegamenu", value)
              }
              if (value.identifier == "pwa-corporategifts-submegamenu") {
                commit("setCorporategiftsSubmegamenu", value)
              }
              if (value.identifier == "pwa-cleaning-submegamenu") {
                commit("setCleaningSubmegamenu", value)
              }
              if (value.identifier == "pwa-mob-custom-menu") {
                commit("setMobCustommenu", value)
              }

              //footer_help_links
              if (value.identifier == "pwa-return-policy") {
                commit("setReturnPolicy", value)
              }
              if (value.identifier == "pwa-payment-information") {
                commit("setPaymentInformation", value)
              }
              if (value.identifier == "pwa-policies-and-security") {
                commit("setPoliciesAndSecurity", value)
              }
              if (value.identifier == "pwa-shipping-policy") {
                commit("setShippingPolicy", value)
              }
              if (value.identifier == "pwa-faq") {
                commit("setFAQ", value)
              }
              //footer_info_links
              if (value.identifier == "pwa-privacy-policy") {
                commit("setPrivacyPolicy", value)
              }
              if (value.identifier == "terms-and-conditions") {
                commit("setTermsConditions", value)
              }
              if (value.identifier == "contactpage-address-section") {
                commit("setContactusAddress", value)
              }
              //featured_brand
              if (value.identifier == "pwa-featured-Brands-slider") {
                commit("setFeaturedBrand", value)
              }
              if (value.identifier == "pwa-productshare-items") {
                commit("setProductpageShareicon", value)
              }

              if (value.identifier == "pwa-bank-detail") {
                commit("setBankDetails", value)
              }

            })
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
