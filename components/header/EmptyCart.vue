<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="emptycart-container">
    <div class="empty-card">
      <div class="list-item-info">
        <div class="close-icon" @click="closeMiniCart()">
          <i class="fal fa-times cls-icon"></i>
        </div>
        <div class="item-name">
          <span>You have no items in your shopping cart.</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import quoteMixin from "~/mixins/quote.js";
export default {
  name: "EmptyCart",
  mixins: [quoteMixin]
};
</script>
