<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="category-main-wrapper">
    <div class="category-section">
      <div class="breadcrumbs">
        <div class="container">
          <Breadcrumbs />
        </div>
      </div>
      <div class="container">
        <Products v-if="category.display_mode === displayModeProduct" />
        <Category v-else />
      </div>
    </div>
    <div class="category-bottom-section" v-if="category.description != null">
      <div class="category-description-section">
        <div class="container">
          <CategoryDescription />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Category from "~/components/category/Category.vue";
import Products from "~/components/category/Products.vue";
import CategoryDescription from "~/components/category/CategoryDescription.vue";
import Breadcrumbs from "~/components/category/Breadcrumbs.vue";
import categoryMixin from "~/mixins/catalog/category.js";
export default {
  name: "Index",
  components: {
    Category,
    Products,
    CategoryDescription,
    Breadcrumbs
  },
  mixins: [categoryMixin]
};
</script>
