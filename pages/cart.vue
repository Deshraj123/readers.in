<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="main cart-page">
    <div class="cart-wrapper">
      <div class="container">
        <Cart v-if="cart.total_quantity > 0"/>
        <div class="item-not-found" v-else>
          <span class="not-found-text">
             You have no items in your shopping cart.
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cart from "~/components/quote/Cart.vue";
import quote from "~/mixins/quote.js";
export default {
  name: "cart",
  components: {
    Cart
  },
  mixins: [quote],
  async fetch(){
    await this.getCountries()
    //await this.getAvailableShippingMethods()
  }
};
</script>
