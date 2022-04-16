<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="category">
    <div class="category-section">
      <div class="breadcrumbs">
        <div class="container">
          <Breadcrumbs />
        </div>
      </div>
      <div class="container">
        <Products v-if="Object.keys(products).length > 0"/>
      </div>
    </div>
  </div>
</template>
<script>
import Products from "~/components/category/Products.vue";
import Breadcrumbs from "~/components/search/SBreadcrumbs.vue";
import searchMixin from "~/mixins/catalog/search.js";
import productsMixin from "~/mixins/catalog/products.js";
import pagesMixin from "~/mixins/cms/pages.js";
export default {
  name: "SearchPage",
  mixins: [searchMixin, productsMixin, pagesMixin],
  components: {
    Products,
    Breadcrumbs
  },
  data() {
    return {
      page: {
        identifier: "pwa-search-page"
      },
      title: "",
      meta: {},
      seoData: {}
    };
  },
  head() {
    return {
      title: this.title,
      meta: this.meta
    };
  },
  async fetch() {

    // Seo thinks
    await this.getPage(this.page);
    let _searchResultPage = JSON.parse(JSON.stringify(this.searchResultPage));
    _searchResultPage.meta_title+=" '"+this.$route.params.urlkey+"'"
    this.seoData = _searchResultPage
    this.manageHead()

    await this.$store.commit('catalog/products/setSearchKeyword', this.$route.params.urlkey)
    await this.$store.commit('others/brands/setBrandProductShow', false)
    await this.$store.commit('catalog/products/setSearchResultProductsShow', true)
    await this.$store.commit('catalog/products/updateProducts', [])
    await this.$store.commit('catalog/products/setAggregations', [])
    await this.getProducts(this.manageProductFilters())
    await this.managePaginations()
  },
  methods:{
    manageHead(){
      this.title = this.setTitle(this.seoData);
      this.meta = this.setHead(this.seoData);
    },
  }
};
</script>
