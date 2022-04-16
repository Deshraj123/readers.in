<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="main checkout-page">
    <div class="progressbar-wrapper">
      <ProgressBar />
    </div>
    <div class="container">
      <div class="opc-page-content">
        <div class="checkout-wrapper opc-wrapper">
          <CheckoutPayment />
        </div>
        <OpcSidebar />
      </div>
    </div>
  </div>
</template> 
<script>
import ProgressBar from "~/components/checkout/ProgressBar.vue";
import CheckoutPayment from "~/components/checkout/CheckoutPayment.vue";
import OpcSidebar from "~/components/checkout/OpcSidebar.vue";

export default {
  name: "checkout",
  layout: "checkout",
  components: {
    ProgressBar,
    CheckoutPayment,
    OpcSidebar
  }
 

};
</script>
