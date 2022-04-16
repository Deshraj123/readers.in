<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="main shipping-policy-page sitmap">
    <div class="policies-security-section">
      <div class="breadcrumbs">
        <div class="container">
          <Breadcrumb label="Sitemap"/>
          <div class="sitemap-wrapper">
            <h1 class="coming_soon">Coming Soon</h1>
            <p class="working-txt">We're currently working on this page</p>
            <nuxt-link class="home-link link" to="/">Home</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headMixin from "~/mixins/others/head.js";
import pagesMixin from "~/mixins/cms/pages.js";
import NotFound404 from "~/components/page404/NotFound404.vue";
import Breadcrumb from "~/components/partials/Breadcrumb.vue";
export default {
  name: "sitemap",
  components: {
    Breadcrumb,
  },
     mixins: [headMixin, pagesMixin],
     data() {
      return {
        page: {
          identifier: "sitemap"
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
      this.seoData = JSON.parse(JSON.stringify(this.sitemap));
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
