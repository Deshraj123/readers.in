<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
<div class="footer-copyrights-content"  v-interpolation v-html="footerCopyrights.content" />
</template>
<script>
import blocksMixin from "~/mixins/cms/blocks.js";
export default {
	name: "FooterCopyright",
	mixins: [blocksMixin],
		data(){
			return {
			block: {
				identifiers: [
				"pwa-footer-copyrights"
				],
			}
			}
		},
		async fetch() {
			await this.getBlocks(this.block)
		},
};
</script>
