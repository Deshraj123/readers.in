<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="breadcrumbs-wrapper">
    <ul class="items">
      <li class="item home">
        <nuxt-link to="/" class="item-link">Home</nuxt-link>
      </li>
      <li class="item" v-if="!data && category.breadcrumbs != null" v-for="(value, index) in category.breadcrumbs" :key="index">
        <nuxt-link :to="value.category_url_key" class="item-link">{{ value.category_name }}</nuxt-link>
      </li>
      <li class="item product active" v-if="!data">{{ category.name }}</li>
      <li class="item product active" v-else>{{ data.label }}</li>
    </ul>
  </div>
</template>

<script>
import categoryMixin from "~/mixins/catalog/category.js";
export default {
  name: "Breadcrumbs",
  mixins: [categoryMixin],
  props: [ 'data' ]
};
</script>