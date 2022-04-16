import { mapGetters } from "vuex"

import quoteMixin from "~/mixins/quote.js";

export default {
  mixins: [quoteMixin],
  computed: {
    ...mapGetters({
      headers: "others/global/getHeaderData",
      isLogin: "customer/auth/getIsLogin",
      processingButton: "customer/auth/getProcessingButton",
      loginOrRegDetails: "customer/auth/getLoginOrRegDetails",
      loginOtpResponse: "customer/auth/getLoginOtpResponse",
      regOtpResponse: "customer/auth/getRegOtpResponse",
      regDetails: "customer/auth/getRegDetails",

      // Errors
      isEmailAvailabelError: "customer/auth/getIsEmailAvailabelError",
      isMobileAvailabelError: "customer/auth/getIsMobileAvailabelError",
      registerError: "customer/auth/getRegisterError",
      loginError: "customer/auth/getLoginError",
    }),
  },

  data(){
    return {
      emailKey: 'email',
      mobileKey: 'mobile',
    }
  },

  methods: {
    async checkEmailIsAvailable(params) {
      const payload = {
        variables: params,
        headers: this.headers,
      }
      await this.$store.dispatch("customer/auth/checkEmailIsAvailable", payload)
    },

    async checkMobileIsAvailable(params) {
      const payload = {
        variables: params,
        headers: this.headers,
      }
      await this.$store.dispatch("customer/auth/checkMobileIsAvailableAction", payload)
    },

    async sendOtpForRegister(params) {
      const payload = {
        variables: params,
        headers: this.headers,
      }
      await this.$store.dispatch("customer/auth/sendOtpForRegisterAction", payload)
    },

    async verifyAndCreateAndGenerateToken(params) {

      const payload = {
        variables: params,
        headers: this.headers,
      }
      await this.$store.dispatch("customer/auth/verifyAndCreateAndGenerateTokenAction", payload)
      await this.createCustomerCartId()
    },

    async sendLoginOtpAction(params) {
      const payload = {
        variables: params,
        headers: this.headers,
      }
      await this.$store.dispatch("customer/auth/loginOtpAction", payload)
    },

    async verifyAndCreateToken(params) {
      const payload = {
        variables: params,
        headers: this.headers,
      }
      await this.$store.dispatch("customer/auth/verifyAndGenerateTokenAction", payload)
      await this.createCustomerCartId()
    },

    async logOutAction() {
      const payload = {
        variables: {},
        headers: this.headers,
      }
      await this.$store.dispatch("customer/auth/logOutAction", payload)
      await this.$cookies.remove('token')
      await this.emptyCart()
      await this.redirectToHomePage()
    }
  },
}
