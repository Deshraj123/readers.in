import { mapGetters } from "vuex"

export default {
  computed: {
    ...mapGetters({
      headers: "others/global/getHeaderData",
      customer: "customer/getCustomer",
      isChangePassword: "customer/getIsChangePassword",
      isChangeEmail: "customer/getIsChangeEmail",

      // Success
      updateCustomerSuccess: "customer/getUpdateCustomerSuccess",
      addressSuccess: "customer/getAddressSuccess",
      customerMobileNumberSuccess: "customer/getCustomerMobileNumberSuccess",

      // Errors
      updateCustomerError: "customer/getUpdateCustomerError",
      addressError: "customer/getAddressError",
      customerMobileNumberError: "customer/getCustomerMobileNumberError",

    }),
  },

  methods:{
    async getCustomer(params) {
      const payload = {
        variables: params,
        headers: this.headers,
      }
      await this.$store.dispatch("customer/getCustomerAction", payload)
    },

    async updateCustomerInformation(params) {
      const payload = {
        variables: params,
        headers: this.headers,
      }
      await this.$store.dispatch("customer/updateCustomerAction", payload)
    },

    async createCustomerAddress(params) {
      const payload = {
        variables: params,
        headers: this.headers,
      }
      await this.$store.dispatch("customer/createAddressAction", payload)
    },

    async updateCustomerAddress(params) {
      const payload = {
        variables: params,
        headers: this.headers,
      }
      await this.$store.dispatch("customer/updateAddressAction", payload)
    },

    async updateCustomerMobileNumber(params){
      const payload = {
        variables: params,
        headers: this.headers,
      }
      await this.$store.dispatch("customer/updateCustomerMobileNumberAction", payload)
    },

    async removeCustomerAddress(params){
      const payload = {
        variables: {
          id: params
        },
        headers: this.headers,
      }
      await this.$store.dispatch("customer/removeAddressAction", payload)
    }
  }
}
