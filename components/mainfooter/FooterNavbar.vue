<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
	<div class="footer-navbar-container">
		<div class="footer-logo-content" v-interpolation v-html="footerLogocol.content" />  
		<div class="footer-link-col top-categories" v-interpolation v-html="footerTopcatecol.content" />  
		<div class="footer-link-col information" v-interpolation v-html="footerInfocol.content" />  
		<div class="footer-link-col help" v-interpolation v-html="footerHelpcol.content" />    
		<div class="footer-link-col contect-us-footer" v-interpolation v-html="footerContactcol.content" /> 
	</div>
</template>
<script>
import blocksMixin from "~/mixins/cms/blocks.js";
export default {
	name: "FooterNavbar",
	  mixins: [blocksMixin],
		data(){
			return {
			block: {
				identifiers: [
				"pwa-footer-logocol",
				"pwa-footer-topcatecol",
				"pwa-footer-infocol",
				"pwa-footer-helpcol",
				"pwa-footer-contactcol"
				],
			}
			}
		},
		async fetch() {
			await this.getBlocks(this.block)
		},
};
</script>
