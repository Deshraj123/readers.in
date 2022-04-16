<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div>
    <div
      class="ourbrands-wrapper"
      v-interpolation
      v-html="homeBrands.content"
    />
  </div>
</template>

<script>
import blocksMixin from "~/mixins/cms/blocks.js";
export default {
  name: "OurBrands",
  mixins: [blocksMixin],
  data() {
    return {
      block: {
        identifiers: ["pwa-home-brands"],
      },
    };
  },
  mounted() {
    this.loadBlock();
  },
  methods: {
    loadBlock() {
      if (!this.homeBrands.content) {
        this.getBlocks(this.block);
      }
    },
  },
};
</script>
