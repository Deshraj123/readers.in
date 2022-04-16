<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="breadcrumbs">
    <div class="container">
      <div class="breadcrumbs-wrapper">
        <ul class="items">
          <li class="item home">
            <nuxt-link to="/" class="item-link">Home</nuxt-link>
          </li>
          <li class="item product active">{{ product.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Breadcrumbs",
  props: ["product"],
};
</script>
