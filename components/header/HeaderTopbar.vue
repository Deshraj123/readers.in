<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
	<div class="header-topbar" v-interpolation v-html="headerTopbar.content" /> 
</template>
<script>
import blocksMixin from "~/mixins/cms/blocks.js";
export default {
  name: "HeaderTopbar",
  mixins: [blocksMixin],
  data(){
    return {
      block: {
        identifiers: [
          "pwa-header-topbar"
        ],
      }
    }
  },
  async fetch() {
    await this.getBlocks(this.block)
  },
};
</script>
