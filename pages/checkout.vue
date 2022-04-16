<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="main">
    <div class="progressbar-wrapper">
      <ProgressBar />
    </div>
    <div class="container">
      <div class="opc-page-content" v-if="!steps.thank_you">
        <div class="checkout-wrapper opc-wrapper">
          <ShippingStep v-if="steps.shipping" />
          <PaymentStep v-if="steps.payment" />
        </div>
        <OpcSidebar />
      </div>
      <ThankyouStep v-if="steps.thank_you" />
    </div>
  </div>
</template>
<script>
import ProgressBar from "~/components/checkout/ProgressBar.vue";
import OpcSidebar from "~/components/checkout/OpcSidebar.vue";
import ShippingStep from "~/components/checkout/ShippingStep.vue";
import PaymentStep from "~/components/checkout/PaymentStep.vue";
import ThankyouStep from "~/components/checkout/ThankyouStep.vue";
import quote from "~/mixins/quote.js";
export default {
  name: "checkout",
  layout: "checkout",
  mixins: [quote],
  middleware: ['authenticated','card-data','customer'],
  components: {
    ProgressBar,
    ShippingStep,
    PaymentStep,
    OpcSidebar,
    ThankyouStep
  },
  created(){
    if(this.checkPlaceOrderForMinimumOrder() && this.steps.thank_you != true){
      this.$router.push({ path: "/cart" })
    }
  },

  async fetch() {
    await this.getCountries();
  },
  mounted() {
    let that = this;
    let _cart = JSON.parse(JSON.stringify(that.cart));
    if (_cart.shipping_addresses.length > 0) {
      _cart.shipping_addresses.forEach(function(address) {
        if (address.selected_shipping_method != null) {
          that.paymentStepShow();
        }
      });
    }
  }
};
</script>
