<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div v-interpolation v-html="returnPolicy.content" />
</template>

<script>
import blocksMixin from "~/mixins/cms/blocks.js";
export default {
  name: 'ReturnPolicy',
  mixins: [blocksMixin],
		data(){
			return {
			block: {
				identifiers: [
				"pwa-return-policy"
				],
			}
			}
		},
		async fetch() {
			await this.getBlocks(this.block)
		},
};
</script>
