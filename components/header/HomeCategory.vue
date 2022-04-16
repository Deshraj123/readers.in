<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
	<div class="home-category-list">
		<div class="main-menu menu-customer" v-if="!isLogin">
			<nuxt-link to="/login" class="login">
        Login
      </nuxt-link>
			<nuxt-link to="/createaccount" class="signup">
        signup
      </nuxt-link>
		</div>
		<div class="main-category">
			<ul class="menu-links">
				<li class="office-icon sub-menu-icons parent">
					<nuxt-link to="/office-supplies" class="cushrefm-cls cate-link">
						<span class="category-icons"></span>Office Supplies
					</nuxt-link>
					<span v-b-toggle.collapse-01 class="arrow-down"></span>
					<b-collapse id="collapse-01" class="megamenu-collapse">
					   <div class="megamenu-links" v-interpolation v-html="officeSubmegamenu.content" />
					</b-collapse>
				</li>
				<li class="school-icon sub-menu-icons parent">
					<nuxt-link to="/school-supplies" class="cate-link">
						<span class="category-icons"></span>School Supplies
					</nuxt-link>
			    	<span v-b-toggle.collapse-02 class="arrow-down"></span>
					<b-collapse id="collapse-02" class="megamenu-collapse">
					    <div class="megamenu-links" v-interpolation v-html="schoolSubmegamenu.content" />
					</b-collapse>
				</li>
				<li class="toy-icon sub-menu-icons">
					<nuxt-link to="/toys-games" class="cate-link"><span class="category-icons"></span>Toys &amp; Games
					</nuxt-link>
					<span v-b-toggle.collapse-03 class="arrow-down"></span>
					<b-collapse id="collapse-03" class="megamenu-collapse">
						<div class="megamenu-links" v-interpolation v-html="toygamesSubmegamenu.content" />
					</b-collapse>
				</li>
				<li class="ink-icon sub-menu-icons">
					<nuxt-link to="/ink-toner" class="cate-link"><span class="category-icons"></span>Ink &amp; Toner
					</nuxt-link>
					<span v-b-toggle.collapse-04 class="arrow-down"></span>
					<b-collapse id="collapse-04" class="megamenu-collapse">
					    <div class="megamenu-links" v-interpolation v-html="inktonerSubmegamenu.content" />
					</b-collapse>
				</li>
				<li class="art-icon sub-menu-icons">
					<nuxt-link to="/art-crafts" class="cate-link">
						<span class="category-icons"></span>Art &amp; Crafts
					</nuxt-link>
			    	<span v-b-toggle.collapse-05 class="arrow-down"></span>
				    <b-collapse id="collapse-05" class="megamenu-collapse">
					    <div class="megamenu-links" v-interpolation v-html="artcraftSubmegamenu.content" />
					</b-collapse>
				</li>
				<li class="corporate-icon sub-menu-icons">
					<nuxt-link to="/corporate-gifts" class="cate-link"><span class="category-icons"></span>Corporate Gifts
					</nuxt-link>
				     <span v-b-toggle.collapse-06 class="arrow-down"></span>
					  <b-collapse id="collapse-06" class="megamenu-collapse">
					    <div class="megamenu-links" v-interpolation v-html="corporategiftsSubmegamenu.content" />
					</b-collapse>
				</li>
				<li class="cleaning-icon sub-menu-icons">
					<nuxt-link to="/cleaning" class="cate-link"><span class="category-icons"></span>Cleaning</nuxt-link>
					<span v-b-toggle.collapse-07 class="arrow-down"></span>
					 <b-collapse id="collapse-07" class="megamenu-collapse">
					     <div class="megamenu-links" v-interpolation v-html="cleaningSubmegamenu.content" />
					</b-collapse>
				</li>
			</ul>
		</div>
		<div class="mobile-menu"  v-interpolation v-html="mobCustommenu.content" />
	</div>
</template>
<script>
import blocksMixin from "~/mixins/cms/blocks.js";
import authMixin from "~/mixins/customer/auth.js";
export default {
	name: "HomeCategory",
		  mixins: [blocksMixin, authMixin],
		data(){
			return {
        block: {
          identifiers: [
          "pwa-office-submegamenu",
          "pwa-school-submegamenu",
          "pwa-toygame-submegamenu",
          "pwa-inktoner-submegamenu",
          "pwa-artcraft-submegamenu",
          "pwa-corporategifts-submegamenu",
          "pwa-cleaning-submegamenu",
          "pwa-mob-custom-menu",

          ],
        }
			}
		},
		async fetch() {
			await this.getBlocks(this.block)
		},
};
</script>
