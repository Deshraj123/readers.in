<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="searchresult-item-action view-btn-wrapper">
    <div class="searchresult_btn">
      <button class="searchresult-addcart">
        <nuxt-link :to="'/'+product.url_key" class="searchresult-name" @click.native="manageSearchProductShow(false)">
          View
        </nuxt-link>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "ProductViewButton",
  props: ['product'],
  methods: {
    manageSearchProductShow(value) {
      this.$store.commit('catalog/products/setSearchProductsShow', value);
    }
  }
};
</script>
