import { mapGetters } from "vuex"

export default {
  computed: {
    ...mapGetters({
      headers: "others/global/getHeaderData",
      openSupports: "others/openSupport/getOpenSupports",
      openSupportsTopicOptions: "others/openSupport/getOpenSupportTopicOptions",
      openSupportsError: "others/openSupport/getOpenSupportsError",
      openSupportsSuccess: "others/openSupport/getOpenSupportsSuccess"
    }),
  },

  methods: {
    async getOpenSupports(params) {
      const payload = {
        variables: params,
        headers: this.headers,
      }
      await this.$store.dispatch("others/openSupport/openSupportsAction", payload)
    },
    async getOpenSupportTopicOptions(params) {
      const payload = {
        variables: params,
        headers: this.headers,
      }
      await this.$store.dispatch("others/openSupport/openSupportsTopicOptionsAction", payload)
    },
    async createNewOpenSupports(params) {
      const payload = {
        variables: params,
        headers: this.headers,
      }
      await this.$store.dispatch("others/openSupport/newOpenSupportsACtion", payload)
    }
  }
}
