<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div v-interpolation v-html="shippingPolicy.content" />
</template>

<script>
import blocksMixin from "~/mixins/cms/blocks.js";
export default {
  name: 'ShippingPolicy',
   mixins: [blocksMixin],
		data(){
			return {
			block: {
				identifiers: [
				"pwa-shipping-policy"
				],
			}
			}
		},
		async fetch() {
			await this.getBlocks(this.block)
		},
};
</script>
