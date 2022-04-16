<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div v-interpolation v-html="privacyPolicy.content" />
</template>

<script>
import blocksMixin from "~/mixins/cms/blocks.js";
export default {
  name: 'PrivacyPolicy',
   mixins: [blocksMixin],
		data(){
			return {
			block: {
				identifiers: [
				"pwa-privacy-policy"
				],
			}
			}
		},
		async fetch() {
			await this.getBlocks(this.block)
		},
};
</script>
