<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="rating-review-container">
    <div class="rating-summary">
      <span class="label hide-element"><span>Rating:</span></span>
      <div class="rating-result rating-col" :title="data+'%'">
        <span class="rating-review" :style="'width:'+data+'%'">
          <span class="rating_value">
            <span class="ratingval" itemprop="ratingValue">{{ data }}</span>% of
            <span class="best_rating" itemprop="bestRating">100</span>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Rating",
  props: ['data']
};
</script>
