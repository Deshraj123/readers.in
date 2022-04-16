<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
	<footer>
		<div class="footer-container">
			<div class="reders-footer">
				<div class="container">
					<MainfooterFooterNavbar />
				</div>
			</div>
			<div class="copyright-footer">
				<div class="container">
					<MainfooterFooterCopyright />
				</div>
			</div>
		</div>
    <Loader />
	</footer>
</template>
<script>
import Loader from "~/components/loader/Loader.vue";
export default {
	name: "Footer",
	components: {
        Loader
	}
};
</script>
