import { mapGetters } from 'vuex'
import sales from "~/mixins/sales.js";
export default {
  mixins: [sales],
  computed: {
    ...mapGetters({
      headers: "others/global/getHeaderData",
      postData: "paymentMethod/ccAvenuepay/getPostData",
      updateOrderResponse: "paymentMethod/ccAvenuepay/getUpdateOrderResponse"
    })
  },

  methods: {
    async getCcAvenuepayPostData(){
      const payload = {
        headers: this.headers,
        variables: {
          order_id: this.order.order_number
        }
      };
      await this.$store.dispatch('paymentMethod/ccAvenuepay/getPostDataAction', payload)
    },

    async updateOrderStatusByccAvenuepay(params) {
      const payload = {
        headers: this.headers,
        variables: params
      };
      await this.$store.dispatch('paymentMethod/ccAvenuepay/updateOrderStatusAction', payload)
    }
  }
}
