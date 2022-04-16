<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="bundle-product-page">
    <div class="customize-items">
      <div class="list-items">
        <div class="product-price-range">
          <div class="p-range-wrapper">
            <div class="from-range">
              <span class="label d-block">From</span> 
              <span class="price">{{
          setFormatPrice(product.price_range.minimum_price.final_price.value)
        }}</span>
            </div> 
            <div class="to-range">
              <span class="label d-block">To</span> 
              <span class="price">{{
          setFormatPrice(product.price_range.maximum_price.final_price.value)
        }}</span>
            </div> 
          </div> 
        </div>
        <div class="customize-list custo-btn" @click="updateBundleProductCustomizeShow()" href="#bundle-customization-product">
          customize product
          <i class="fal fa-chevron-down angle"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import productsMixin from "~/mixins/catalog/products.js";
export default {
  name: "BundleProduct",
  mixins: [productsMixin],
  methods:{
    updateBundleProductCustomizeShow() {
      if(this.bundleProductCustomizeShow) {
        this.$store.commit('catalog/products/setBundleProductCustomizeShow', false)
        return
      }
      this.$store.commit('catalog/products/setBundleProductCustomizeShow', true)
    }
  }
};
</script>
