import { mapGetters } from "vuex"

export default {
  computed: {
    ...mapGetters({
      //header
      headers: "others/global/getHeaderData",
      headerTopbar: "cms/blocks/getHeaderTopbar",
      headerMiddleleft: "cms/blocks/getHeaderMiddleleft",
      headerPhonenumber: "cms/blocks/getHeaderPhonenumber",
      headerReaderoffer: "cms/blocks/getHeaderReaderoffer",
      //home
      homeTopbanner: "cms/blocks/getHomeBanner",
      homeBrands: "cms/blocks/getHomeBrands",
      homeFeaturecate: "cms/blocks/getHomeFeaturecate",
      //footer
      footerSocialicons: "cms/blocks/getFooterSocialicons",
      footerLogocol: "cms/blocks/getFooterLogocol",
      footerTopcatecol: "cms/blocks/getFooterTopcatecol",
      footerInfocol: "cms/blocks/getFooterInfocol",
      footerHelpcol: "cms/blocks/getFooterHelpcol",
      footerContactcol: "cms/blocks/getFooterContactcol",
      footerCopyrights: "cms/blocks/getFooterCopyrights",
      //megamenu
      officeSubmegamenu: "cms/blocks/getOfficeSubmegamenu",
      schoolSubmegamenu: "cms/blocks/getSchoolSubmegamenu",
      toygamesSubmegamenu: "cms/blocks/getToygamesSubmegamenu",
      inktonerSubmegamenu: "cms/blocks/getInktonerSubmegamenu",
      artcraftSubmegamenu: "cms/blocks/getArtcraftSubmegamenu",
      corporategiftsSubmegamenu: "cms/blocks/getCorporategiftsSubmegamenu",
      cleaningSubmegamenu: "cms/blocks/getCleaningSubmegamenu",
      mobCustommenu: "cms/blocks/getMobCustommenu",
      //footer_help_links
      returnPolicy: "cms/blocks/getReturnPolicy",
      paymentInformation: "cms/blocks/getPaymentInformation",
      policiesAndSecurity: "cms/blocks/getPoliciesAndSecurity",
      shippingPolicy: "cms/blocks/getShippingPolicy",
      faQ: "cms/blocks/getFAQ",
      //footer_info_links
      privacyPolicy: "cms/blocks/getPrivacyPolicy",
      // terms and conditions
      termsConditions: "cms/blocks/getTermsConditions",
      contactusAddress: "cms/blocks/getContactusAddress",
      featuredBrand: "cms/blocks/getFeaturedBrand",
      productpageShareicon: "cms/blocks/getProductpageShareicon",
      bankDetails: "cms/blocks/getBankDetails"
    }),
  },

  methods: {
    async getBlocks(params) {
      const payload = {
        variables: params,
        headers: this.headers,
      }
      await this.$store.dispatch("cms/blocks/getBlocksAction", payload)
    },
  },
}
