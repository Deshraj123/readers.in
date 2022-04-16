<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="d-flex align-items-end mb-4 justify-content-end">
    <div class="actions-toolbar text-right">
      <div class="primary">
        <button
          class="action action-update"
          type="button"
          @click="placeOrderBtnclick()"
        >
          <span data-bind="i18n: 'Update'">{{ textBtn }}</span>
        </button>
      </div>
    </div>
    <CcavenuepayForm />
  </div>
</template>
<script>
import CcavenuepayForm from "~/components/ccavenuepay/Form.vue";
import quote from "~/mixins/quote.js";
import ccAvenuepayMixin from "~/mixins/paymentMethod/ccAvenuepay.js";
export default {
  name: "PlaceOrderbtn",
  props: ["textBtn", "methods"],
  mixins: [quote, ccAvenuepayMixin],
  components: {
		CcavenuepayForm
	},
  methods: {
    async placeOrderBtnclick() {
      let that = this
      // Place Order
      await this.placeOrder();
      if(this.cart.selected_payment_method.code === 'ccavenuepay') {
         // CcAvenuepay
        await this.getCcAvenuepayPostData()
        setTimeout(function(){
          document.getElementById('ccavenuepay-form').submit()
        }, 500)
      }else{
        // Bank Transfer
        await this.emptyCart()
        // Get New Cart
        await this.getCart()
        // Thank you page
        await this.thankyouStepShow()
      }
    }
  }
};
</script>
