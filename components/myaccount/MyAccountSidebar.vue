<template>
	<div class="myac-left-section  sidebar-main">
		<div class="collapsible-nav mobile-title-collapse" v-b-toggle.collapse-sidebar>
			<h4 class="collapse-title">My Account</h4>
		</div>
		<b-collapse id="collapse-sidebar">
			<div class="sidebar-nav">
				<div class="row-one navbar-row">
					<div class="link-li"><nuxt-link to="/customer/account" class="sidebar-link">My Account </nuxt-link></div>
					<div class="link-li"><nuxt-link to="/sale/order" class="sidebar-link">My Orders </nuxt-link></div>
					<div class="link-li"><nuxt-link to="/wishlist" class="sidebar-link">My Wish List</nuxt-link></div>
				</div>
				<div class="row-two navbar-row">
					<div class="link-li"><nuxt-link to="/customer/address" class="sidebar-link">Address Book</nuxt-link></div>
					<div class="link-li"><nuxt-link to="/customer/account/edit" class="sidebar-link">Account Information</nuxt-link></div>
				</div>
				<div class="row-three navbar-row">
					<div class="link-li">
                       <nuxt-link to="/review/customer" class="sidebar-link">My Product Reviews </nuxt-link>
                    </div>
					<div class="link-li">
						<nuxt-link to="/newsletter/manage" class="sidebar-link">Newsletter Subscriptions</nuxt-link>
					</div>
					<div class="link-li"><nuxt-link to="/customer/mobile" class="sidebar-link">Update Mobile Number </nuxt-link></div>
					<div class="link-li"><nuxt-link to="/os/customer" class="sidebar-link">Open Support</nuxt-link></div>
					<div class="link-li">
                       <a href="javascript:void(0)" class="sidebar-link" @click="logOutAction()">Log Out</a>
                     </div>
				</div>
			</div>
		</b-collapse>
	</div>
</template>

<script>
import authMixin from "~/mixins/customer/auth.js";
export default {
  name: "MyAccountSidebar",
  mixins: [authMixin],
};
</script>
