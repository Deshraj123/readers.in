<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="loader_wrapper" v-if="loading">
    <div class="loader loader-one">
      <img
        class="loader-img"
        src="~/assets/images/logo/readers-logo-white-min.png"
        alt="Reader"
        width="48"
        height="14"
      />
    </div>
  </div>
</template>

<script>
import loaderMixin from "~/mixins/others/loading.js";
export default {
  name: "Loader",
  mixins: [loaderMixin]
};
</script>
