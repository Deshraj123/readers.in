<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="container" v-interpolation v-html="homeFeaturecate.content" />
</template>

<script>
import blocksMixin from "~/mixins/cms/blocks.js";
export default {
  name: "ShopCategory",
  mixins: [blocksMixin],
  data() {
    return {
      block: {
        identifiers: ["pwa-home-featurecate"]
      }
    };
  },
  mounted(){
    this.getBlocks(this.block);
  }
};
</script>
