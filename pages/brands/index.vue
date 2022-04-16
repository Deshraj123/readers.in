<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="main feature-brand-page brand-page">
    <div class="featured-brand-wrapper">
      <div class="container">
        <div class="featured-Brands-container">
          <BrandSlider />
        </div>
      </div>
    </div>
    <div class="featured-brand-pagination">
      <div class="Brands-pagination-container">
        <BrandPagination />
      </div>
    </div>
  </div>
</template>

<script>
import BrandSlider from "~/components/brand/BrandSlider.vue";
import BrandPagination from "~/components/brand/BrandPagination.vue";
import pagesMixin from "~/mixins/cms/pages.js";
import headMixin from "~/mixins/others/head.js";
import brandsMixin from "~/mixins/others/brands.js";
export default {
  name: "brand",
  components: {
    BrandSlider,
    BrandPagination
  },
  mixins: [pagesMixin, headMixin, brandsMixin],
  data() {
    return {
      page: {
        identifier: "brand"
      },
      title: "",
      meta: [],
      seoData: {}
    };
  },
  async fetch() {
     await this.getPage(this.page);
      this.seoData = JSON.parse(JSON.stringify(this.brand));
      this.manageHead()
    await this.getBrands()
  },
  head() {
    return {
      title: this.title,
      meta: this.meta
    };
  },
    methods:{
      manageHead(){
        this.title = this.setTitle(this.seoData);
        this.meta = this.setHead(this.seoData);
      },
    }
};
</script>
