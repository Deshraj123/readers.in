<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div v-interpolation v-html="policiesAndSecurity.content" />
</template>

<script>
import blocksMixin from "~/mixins/cms/blocks.js";
export default {
  name: 'PoliciesAndSec',
  mixins: [blocksMixin],
		data(){
			return {
			block: {
				identifiers: [
				"pwa-policies-and-security"
				],
			}
			}
		},
		async fetch() {
			await this.getBlocks(this.block)
		},
};
</script>
