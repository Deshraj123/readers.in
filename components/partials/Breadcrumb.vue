<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="breadcrumbs-wrapper">
    <ul class="items">
      <li class="item home">
        <nuxt-link to="/" class="item-link">Home</nuxt-link>
      </li>
      <li class="item product active">{{ label }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb",
  props: [ 'label' ]
};
</script>
