<template>
	<div class="layout-wrapper">
		<div class="page-wrapper checkout-page">
			<CheckoutHeader />
			<nuxt />
			<CheckoutFooter />
		</div>
    <Loader />
	</div>
</template>
<script>
import CheckoutHeader from "~/components/checkout/CheckoutHeader.vue";
import CheckoutFooter from "~/components/partials/CheckoutFooter.vue";
export default {
	components: {
		CheckoutHeader,
		CheckoutFooter
	}
};
</script>
