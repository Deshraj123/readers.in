<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="thank-you-section">
    <div class="success-icon-div">
      <i class="fal fa-check-circle success-icon"></i>
      <span class="ty-text">Thank you for your purchase!</span>
    </div>
    <p class="your-order m-0" v-if="Object.keys(order).length >0">Your order number is <span>#{{order.order_number}}</span></p>
    <p v-if="Object.keys(updateOrderResponse).length > 0">
      <span class="error-bg" v-if="updateOrderResponse.error">{{updateOrderResponse.message}}</span>
      <span class="success-bg" v-else>{{updateOrderResponse.message}}</span>
    </p>
    <p class="order-desc">
      We'll email you an order confirmation with details and tracking info.
    </p>
    <div class="bottom-descrption">
      <p>
        You can track your order status.
      </p>
      <nuxt-link to="/sale/order" target="_self" class="d-block account-link">
        Go to Order
      </nuxt-link>
    </div>
    <nuxt-link to="/" target="_self" class="continue-shop d-inline-block">
      Continue Shopping
    </nuxt-link>
  </div>
</template>
<script>
import sales from "~/mixins/sales.js";
import ccAvenuepayMixin from "~/mixins/paymentMethod/ccAvenuepay.js";
export default {
  name: "ThankyouStep",
  mixins: [sales, ccAvenuepayMixin]
};
</script>
