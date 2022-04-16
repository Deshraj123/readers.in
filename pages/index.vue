<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
    <div class="main home-page">
      <HomepageMainSlider />
      <LazyHomepageOurBrands />
      <div class="shopcategory-wrapper">
        <LazyHomepageShopCategory />
      </div>

      <LazyHomepageSchoolSupplies />
      <LazyHomepageArtsAndCrafts />
      <LazyHomepageOfficeSupplies />

      <div class="newslettar-main-wrapper ">
        <div class="container">
          <LazyNewsletterSubscribeNewsletter />
        </div>
      </div>
    </div>
</template>
<script>
import pagesMixin from "~/mixins/cms/pages.js";
import headMixin from "~/mixins/others/head.js";
import categoryMixin from "~/mixins/catalog/category.js";
import customAttributesMixin from "~/mixins/catalog/customAttributes.js";
export default {
  name: "Homepage",
  mixins: [pagesMixin, headMixin, categoryMixin, customAttributesMixin],
   data() {
    return {
      page: {
        identifier: "index"
      },
      title: "",
      meta: [],
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
    await this.getPage(this.page);
    await this.getCustomAttributes()
    this.seoData = JSON.parse(JSON.stringify(this.homepage));
    this.manageHead()
  },
  methods:{
    manageHead(){
      this.title = this.setTitle(this.seoData);
      this.meta = this.setHead(this.seoData);
    },
  }
};
</script>
