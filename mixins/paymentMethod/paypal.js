import { mapGetters } from 'vuex'

import quote from "~/mixins/quote.js";

export default {

  mixins: [quote],

  computed: {
    ...mapGetters({
      headers: "others/global/getHeaderData",
      paypalPaymentMethod: 'paymentMethod/paypal/getPaypal'
    })
  },

  data() {
    return {
      paypalParams:{
        code: 'paypal_express',
        paypal_express: {
          payer_id: '',
          token: '',
        }
      }
    }
  },

  async mounted() {

    if(this.$route.query.PayerID) {

      this.paypalParams.paypal_express.payer_id = this.$route.query.PayerID
      this.paypalParams.paypal_express.token = this.$route.query.token

      // Express Checkout
      const payload = {
        paymentMethod: this.paypalParams
      };

      await this.setPaymentMethodOnCart(payload)
    }
  },

  methods: {
    async createPaypalToken(){
      let location = window.location;

      const payload = {
        headers: this.headers,
        variables: {
          input:{
            cart_id: this.$cookies.get('cart_id'),
            code: 'paypal_express',
            express_button: true,
            urls: {
              return_url: location.origin + location.pathname,
              cancel_url: location.origin + location.pathname,
            }
          }
        }
      };

      await this.$store.dispatch('paymentMethod/paypal/createPaypalExpressToken', payload)
    }
  }
}
