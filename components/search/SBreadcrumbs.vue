<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="breadcrumbs-wrapper">
    <ul class="items">
      <li class="item home">
        <nuxt-link to="/" class="item-link">Home</nuxt-link>
      </li>
      <li class="item product active">Search result for: '{{ searchKeyword }}'</li>
    </ul>
  </div>
</template>

<script>
import searchMixin from "~/mixins/catalog/search.js";
export default {
  name: "SearchBreadcrumbs",
  mixins: [searchMixin]
};
</script>
