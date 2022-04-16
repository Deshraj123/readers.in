<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <form :action="postData.post_url" id="ccavenuepay-form" class="ccavenuepay-form" style="display:none;">
    <input type=hidden name=transaction_url :value="postData.transaction_url">
    <input type=hidden name=encrypted_data :value="postData.encrypted_data">
    <input type=hidden name=access_code :value="postData.access_code">
    <button type="submit">Submit form</button>
  </form>
</template>
<script>
import ccAvenuepayMixin from "~/mixins/paymentMethod/ccAvenuepay.js";
export default {
  name: "CcavenuepayForm",
  mixins: [ccAvenuepayMixin],
};
</script>
