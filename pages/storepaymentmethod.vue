<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="main myaccount-page">
    <div class="myaccount-wrapper">
      <div class="container">
        <div class="myaccount-container-main">
          <MyAccountSidebar />
          <StorePaymentMethod />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyAccountSidebar from "~/components/myaccount/MyAccountSidebar.vue";
import StorePaymentMethod from "~/components/myaccount/StorePaymentMethod.vue";
export default {
  name: "myaccount",
  components: {
    MyAccountSidebar,
    StorePaymentMethod
  }
};
</script>
