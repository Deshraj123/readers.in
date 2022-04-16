<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="main revenue-page">
    <div class="revenue-wrapper">
      <div class="container">
        <div class="revenue-bg">
           We are updating your order status, please wait.....
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ccAvenuepayMixin from "~/mixins/paymentMethod/ccAvenuepay.js";
import customerMixin from "~/mixins/customer/index.js";
import quote from "~/mixins/quote.js";
export default {
  name: "ccavenuepay_return",
  layout: "checkout",
  mixins: [ccAvenuepayMixin, customerMixin, quote],
  async created() {
    await this.emptyCart()
    await this.getCart()
    await this.getCustomer()
    if(this.$route.query.order_id){
       await this.updateCurrentOrder()
       await this.thankyouStepShow()
       await this.$router.push({ path: "/checkout" })
    }else{
      // Redirect to home page
      let str = 'Something wrong.....'
      if(this.$route.query.error){
        str = 'CCAvenue Payment has been cancelled and the transaction has been declined'
      }
      this.$toast.error(str)
      await this.$router.push({ path: "/" })
    }
  },

  methods:{
    updateCurrentOrder() {
      let that = this
      if(this.customer.orders.items){
        this.customer.orders.items.forEach(function(order){
          if(order.number == that.$route.query.order_id){
            that.$store.commit("sales/setOrder", order)
          }
        })
      }
    }
  }
};
</script>
