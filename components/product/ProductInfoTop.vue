<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="product-info-top">
    <h1 class="page-title">
      <span>{{ selectedProduct.name }}</span>
    </h1>

    <div class="product-review">
      <div class="product-review-col" v-if="selectedProduct.review_count > 0">
        <div class="rating-star">
          <span v-if="selectedProduct.review_count >0">
            <div class="rating-review-container">
              <RatingCode :data="selectedProduct" />
            </div>
          </span>
        </div>

        <div class="review">
          <span><a hrfe="jabascript:void(0)">{{ selectedProduct.review_count }} Review</a></span>
        </div>
        <div class="add-review">
          <span><a href="#add-new-product-review" @click="showReviewTab()">Add Your Review</a></span>
        </div>
      </div>
      <div class="product-review-empty" v-else>
        <a class="product-review-empty-link" href="#add-new-product-review" @click="showReviewTab()">Be the first to review this product</a>
      </div>
    </div>


    <div class="stock-available">
      <span><strong>Availability :</strong></span>
      <span class="in-stock" v-if="selectedProduct.stock_status == 'IN_STOCK'">{{ getProductStatus(selectedProduct.stock_status) }}</span>
      <span class="in-stock" v-else>{{ getProductStatus(selectedProduct.stock_status) }}</span>
    </div>

    <div class="product-attribute">
      <span><strong>SKU :</strong></span>
      <span class="value">{{ selectedProduct.sku }}</span>
    </div>

    <div class="product-short-desc" v-interpolation v-html="selectedProduct.short_description.html" />
  </div>
</template>
<script>
import RatingCode from "~/components/partials/RatingCode.vue";
export default {
  name: "ProductInfoTop",
  props: ["selectedProduct"],
  components: {
    RatingCode
  },
  methods:{
    getProductStatus(status) {
      if(status === 'IN_STOCK') {
        return 'In Stock'
      }
      return 'Out Of Stock'
    },

    showReviewTab() {
      let reviewId = document.querySelector('.product-review-tab').getAttribute('aria-labelledby')
      document.querySelector('#'+reviewId).click()
    }
  }
};
</script>
