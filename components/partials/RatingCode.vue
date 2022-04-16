<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="rating-summary" v-if="data.review_count > 0">
    <span class="label hide-element"><span>Rating:</span></span>
    <div class="rating-result rating-col" :title="reviewCount+'%'">
      <span
        class="rating-review"
        :style="getProductReviewRating(data.reviews)"
      >
        <span class="rating_value">
          <span class="ratingval" itemprop="ratingValue">0</span>% of
          <span class="best_rating" itemprop="bestRating">100</span>
        </span>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "RatingCode",
  props: ['data'],
  data(){
    return {
      reviewCount: 0
    }
  },
  methods: {
    async getProductReviewRating(reviews) {
      let that = this
      let total = 0;
      if (reviews.items && reviews.items.length > 0) {
        reviews.items.forEach(function(value, index) {
          total += value.average_rating;
        });
        that.reviewCount= total / reviews.items.length
      }

      let response = "width:" + (total / reviews.items.length) + "%";
      return response;
    }
  }
};
</script>
