<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div v-interpolation v-html="paymentInformation.content" />
</template>

<script>
import blocksMixin from "~/mixins/cms/blocks.js";
export default {
  name: 'PaymentInformation',
   mixins: [blocksMixin],
		data(){
			return {
			block: {
				identifiers: [
				"pwa-payment-information"
				],
			}
			}
		},
		async fetch() {
			await this.getBlocks(this.block)
		},
};
</script>
