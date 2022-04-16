<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div >
    <span v-interpolation v-html="bankDetails.content"/>
  </div>
</template>
<script>
import blocksMixin from "~/mixins/cms/blocks.js";
export default {
  name: "BankDetail",
  mixins: [blocksMixin],
  data(){
    return {
      block: {
        identifiers: [
         "pwa-bank-detail"
        ],
      }
    }
  },
  async fetch() {
    await this.getBlocks(this.block)
  },
};
</script>
