<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
	<div class="header-middlebar">
		<div class="hmid-left-content" v-interpolation v-html="headerMiddleleft.content" />
		<div class="hmid-right-content">
			<div class="hmid-rightlinks">
				<ul class="hmid-links">
					<li class="cont-number" v-interpolation v-html="headerPhonenumber.content" />
					<li class="login" v-if="!isLogin">
						<nuxt-link to="/login"><i class="far fa-user-alt"></i>
						  Login
						</nuxt-link>
					</li>
					<li class="signup" v-if="!isLogin">
						<nuxt-link to="/createaccount">Sign Up</nuxt-link>
					</li>
					<li class="login user-loggedin" v-if="isLogin">
						<nuxt-link to="/customer/account" class="user-name">
						<i class="far fa-user-alt"></i>
						{{ customer.firstname }}
						</nuxt-link>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>

// import LocationForm from "~/components/header/LocationForm.vue";
import blocksMixin from "~/mixins/cms/blocks.js";
import authMixin from "~/mixins/customer/auth.js";
import customerIndexMixin from "~/mixins/customer/index.js";

export default {
	name: "HeaderMiddlebar",
	components: {
		// LocationForm
	},
	mixins: [blocksMixin, authMixin, customerIndexMixin],
	data(){
		return {
		block: {
			identifiers: [
			"pwa-hmiddle-left",
			"pwa-header-phonenumber"
			],
		}
		}
	},
	async fetch() {
		await this.getBlocks(this.block)
	},
};
</script>
