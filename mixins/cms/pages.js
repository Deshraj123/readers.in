import { mapGetters } from "vuex"

export default {
  computed: {
    ...mapGetters({
      headers: "others/global/getHeaderData",
      homepage: "cms/pages/getHomepage",
      brand: "cms/pages/getBrand",
      searchResultPage: "cms/pages/getSearchResultPage",
      contactusPage: "cms/pages/getContactusPage",
      quotationPage: "cms/pages/getQuotationPage",
      shippingPolicy: "cms/pages/getShippingPolicy",
      privacyPolicy: "cms/pages/getPrivacyPolicy",
      returnPolicy: "cms/pages/getReturnPolicy",
      paymentInformation: "cms/pages/getPaymentInformation",
      policySecurity: "cms/pages/getPolicySecurity",
      faqPage: "cms/pages/getFaqPage",
      sitemap: "cms/pages/getSitemap",
      notFound: "cms/pages/getNotFound",
      // my account pages
      myAccount: "cms/pages/getMyAccount",
      productReview: "cms/pages/getProductReview",
      reviewDetails: "cms/pages/getReviewDetails",
      myOrders: "cms/pages/getMyOrders",
      accountInformation: "cms/pages/getAccountInformation" ,
      addnewAddress: "cms/pages/getAddnewAddress",
      addressBook: "cms/pages/getAddressBook",
      editAddress: "cms/pages/getEditAddress",
      mobilenoUpdate: "cms/pages/getMobilenoUpdate",
      newsletterSubscriptions: "cms/pages/getNewsletterSubscriptions",
      billingAgreements: "cms/pages/getBillingAgreements",
      openSupport: "cms/pages/getOpenSupport",
      myWishlist: "cms/pages/getMyWishlist",
      myWishlistSharing: "cms/pages/getMyWishlistSharing",
      logIn: "cms/pages/getLogIn",
      signUp: "cms/pages/getSignUp",
    
     
    }),
  },
  methods: {
    async getPage(params) {
      const payload = {
        variables: params,
        headers: this.headers,
      }
      await this.$store.dispatch("cms/pages/getPagesAction", payload)
    },
  },
}
