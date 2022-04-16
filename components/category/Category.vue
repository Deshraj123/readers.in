<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="main-category">
    <div class="page-title-wrapper">
      <h1 class="page-title">{{ category.name }}</h1>
    </div>
    <div class="bottom-section" v-if="category.children.length > 0">
      <div class="category-list" v-for="(value, index) in category.children" :key="index">
        <div class="category-col1">
          <div class="category-img">
            <nuxt-link :to="'/'+value.url_key" target="_self">
              <img
                src="~/assets/images/category/coming-soon.png"
                :alt="value.name"
                width="179"
                height="183"
              />
              <span class="hide-element">category-img</span>
            </nuxt-link>
          </div>
          <div class="category-details">
            <div class="category-title">
              <nuxt-link :to="'/'+value.url_key">{{ value.name }}</nuxt-link>
            </div>
            <div class="category-links" v-if="value.children.length > 0">
              <ul class="link-list">
                <li v-for="(_value, _index) in value.children" :key="_index">
                  <nuxt-link :to="'/'+_value.url_key">{{ _value.name }}</nuxt-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import categoryMixin from "~/mixins/catalog/category.js";
import productsMixin from "~/mixins/catalog/products.js";
import globalMixin from "~/mixins/others/global.js";
import customAttributesMixin from "~/mixins/catalog/customAttributes.js";
export default {
  name: "Category",
  mixins: [categoryMixin, productsMixin, globalMixin, customAttributesMixin]
};
</script>
