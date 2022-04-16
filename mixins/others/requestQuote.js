import { mapGetters } from "vuex"

import globalMixin from "~/mixins/others/global.js";

export default {

  mixins: [globalMixin],

  computed: {
    ...mapGetters({
      headers: "others/global/getHeaderData",
      searchRequestQuoteProducts: "others/requestQuote/getRequestQuoteSearchProducts",
      searchRequestQuoteProductsShow: "others/requestQuote/getRequestQuoteSearchProductsShow",
      requestQuoteError: "others/requestQuote/getRequestQuoteError",
      requestQuoteSuccess: "others/requestQuote/getRequestQuoteSuccess"
    }),
  },

  methods: {
    async quoteRequestSubmit(params) {
      const payload = {
        variables: params,
        headers: this.headers,
      }
      await this.$store.dispatch("others/requestQuote/quoteRequestSubmitAction", payload)
    },
    async getSearchProducts(params) {
      const payload = {
        variables: params,
        headers: this.headers,
      }
      await this.$store.dispatch("others/requestQuote/getSearchProductsForRequestQuoteAction", payload)
    },
  }
}
