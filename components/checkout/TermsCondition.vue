<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
		<div class="termcond-modal-content" v-interpolation v-html="termsConditions.content" />
</template>
<script>
import blocksMixin from "~/mixins/cms/blocks.js";
export default {
	name: "TermsCondition",
	mixins: [blocksMixin],
	data() {
		return {
			modalShow: true,
			block: {
				identifiers: [
					"terms-and-conditions",
				],
			}
		};
	},
	 async fetch() {
		await this.getBlocks(this.block)
	},
};
</script>
