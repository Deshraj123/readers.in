import { mapGetters } from "vuex"
export default {
  computed: {
    ...mapGetters({
      headers: "others/global/getHeaderData",
      orders:"sales/getOrders",
      order:"sales/getOrder"
    }),
  },

  methods: {
    async getOrders() {
      const payload = {
        variables: {},
        headers: this.headers,
      }
      await this.$store.dispatch("sales/getOrdersAction", payload)
    }
  }
}
