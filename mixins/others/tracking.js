import { mapGetters } from "vuex"

export default {

  computed: {
    ...mapGetters({
      headers: "others/global/getHeaderData",
      trackings: "others/tracking/getTrackings"
    }),
  },

  methods: {
    async getTrackings(params) {
      const payload = {
        variables: {
          input: params
        },
        headers: this.headers,
      }
      await this.$store.dispatch("others/tracking/getTrackingsAction", payload)
    }
  }
}
