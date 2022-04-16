<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div v-interpolation v-html="faQ.content" />
</template>

<script>
import blocksMixin from "~/mixins/cms/blocks.js";
export default {
  name: 'Faq',
  mixins: [blocksMixin],
		data(){
			return {
			block: {
				identifiers: [
				"pwa-faq"
				],
			}
			}
		},
		async fetch() {
			await this.getBlocks(this.block)
		},
};
</script>
