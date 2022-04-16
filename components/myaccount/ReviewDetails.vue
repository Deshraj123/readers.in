<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
	<div class="review_details-right-section myac-right-section">
		<div class="page-title-wrapper">
			<h1 class="page-title"><span>Review Details</span></h1>
		</div>
		<div class="review_details-container">
			<form class="review_details_form">
				<div class="Review-item">
          <nuxt-link :to="'/'+selectedReview.product.url_key" class="image-item">
            <!--<img
              :src="getCloudinaryUrl(removeCacheUrl(selectedReview.product.image.url), 200, 200)"
              :alt="selectedReview.product.image.label"
              width="200"
              height="200"
            />-->
			<img
              :src="selectedReview.product.image.url"
              :alt="selectedReview.product.image.label"
              width="200"
              height="200"
            />
          </nuxt-link>
				</div>
				<div class="item-review-details">
					<h2 class="product-name">{{ selectedReview.product.name }}</h2>
					<div class="product-reviews-summary">
						<div class="rating-col">
							<Rating :data="selectedReview.average_rating" />
						</div>
					</div>
				</div>
			</form>
			<div class="block-your-review">
				<div class="block-title">
          <span>Your Review</span>
        </div>
				<div class="content">
					<div
            class="rating-col my-rating"
            v-for="(rating, index) in selectedReview.ratings_breakdown"
            :key="index"
          >
						<span class="Rating">{{ rating.name }}</span>
						<Rating :data="getRatingValue(rating.value)" />
					</div>
					<div class="my-review-title">
						<span>
							{{ selectedReview.summary }}
						</span>
					</div>
					<div class="my-review">
						<span>
							{{ selectedReview.text }}
						</span>
					</div>
					<div class="my-review-date">
						<span class="date">
							Submitted on {{ setFormatDate(selectedReview.created_at) }}
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Rating from "../review/Rating.vue";
import globalMixin from "~/mixins/others/global.js";
export default {
  name: "ReviewDetailsView",
  props: ['selectedReview'],
  mixins: [globalMixin],
  components: { Rating },
  methods:{
    getRatingValue(value) {
      return Number.parseFloat((value*100)/5).toFixed(2)
    }
  }
};
</script>
