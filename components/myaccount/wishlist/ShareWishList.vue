<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
	<div class="open_support-right-section myac-right-section">
    <span class="error-bg" v-if="wishlistErrors!=null">
      {{wishlistErrors}}
    </span>
    <span class="success-bg" v-if="wishlistSuccess!=null">
      {{wishlistSuccess}}
    </span>

		<div class="page-title-wrapper">
			<h1 class="page-title">
        <span>Wish List Sharing</span>
      </h1>
		</div>
		<div class="Wish_share_container">
			<div class="share-info-subtitle block-title">
				<span class="title">Sharing Information</span>
			</div>
			<form class="Wishlist_sharing-form">
				<div class="form-control_wishlistshare">
					<div class="input-group textarea-group">
						<label for="text" class="label">Email addresses, separated by commas</label>
						<div class="control">
							<span>
                <textarea id="title" class="input-text input-textarea" v-model="emails">
                </textarea>
              </span>
              <span class="error" v-if="emailsError!=null">
                {{emailsError}}
              </span>
						</div>
					</div>
					<div class="input-group textarea-group">
						<label for="text" class="label">Message</label>
						<div class="control">
							<span>
                <textarea id="title" class="input-text input-textarea" v-model="message">
                </textarea>
              </span>
						</div>
					</div>

					<div class="form-action share-wishlist-action ">
						<button type="button" class="back" @click="backToWishlistPage()">Back</button>
						<button type="button" class="submit" @click="shareWishlistBtn()">Share</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import wishlistMixin from "~/mixins/customer/wishlist.js";
export default {
  name: "ShareWishList",
  mixins: [wishlistMixin],
  data() {
    return {
      emails: '',
      message: '',

      emailsError: null
    }
  },
  methods: {
    async backToWishlistPage() {
      await this.$router.push({ path: "/wishlist" })
    },

    resetWishlisterrorErrors() {
      this.emailsError = null
    },

    async shareWishlistBtn() {
      if(this.checkValidationForSharewishlist()){

        let payload = {
          emails: this.emails,
          message: this.message
        }
        await this.shareWishlist(payload)
      }
    },

    checkValidationForSharewishlist() {
      this.resetWishlisterrorErrors()
      let validation = true

      if(this.emails == '') {
        validation = false
        this.emailsError = 'Emails is required.';
      }

      return validation
    }
  }
};
</script>
