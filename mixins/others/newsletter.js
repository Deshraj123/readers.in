import { mapGetters } from "vuex"

export default {
  computed: {
    ...mapGetters({
      headers: "others/global/getHeaderData",
      status: "others/newsletter/getStatus",
      newsletterError: "others/newsletter/getNewsletterError",
      newsletterSuccess: "others/newsletter/getNewsletterSuccess"
    }),
  },

  methods: {
    async subscribeEmailToNewsletter(email) {
      const payload = {
        variables: {
          email: email
        },
        headers: this.headers,
      }
      await this.$store.dispatch("others/newsletter/subscribeEmailToNewsletterAction", payload)
    }
  }
}
