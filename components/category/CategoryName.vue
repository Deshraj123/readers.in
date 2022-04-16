<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
<div class="page-title-wrapper">
  <h1 class="page-title" v-if="searchResultProductsShow">Search Result For : '{{ searchKeyword }}'</h1>
  <h1 class="page-title" v-else-if="is_brand_data">{{ is_brand_data.label }}</h1>
  <h1 class="page-title" v-else>{{ category.name }}</h1>
</div>
</template>

<script>
import categoryMixin from "~/mixins/catalog/category.js";
import searchMixin from "~/mixins/catalog/search.js";
export default {
  name: "CategoryName",
  mixins: [categoryMixin, searchMixin],
  props: ['is_brand_data']
};
</script>
