<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="category-description-wrapper">
    <div class="catgry-detail" v-interpolation v-html="category.description" />
  </div>
</template>
<script>
import categoryMixin from "~/mixins/catalog/category.js";
export default {
  name: "CategoryDescription",
  mixins: [categoryMixin]
};
</script>
