<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="main">
    <div class="faq-section">
      <div class="breadcrumbs">
        <div class="container">
          <Breadcrumb :label="faqPage.meta_title"/>
        </div>
      </div>
      <div class="container">
        <MainfooterFaq />
      </div>
    </div>
  </div>
</template>

<script>
import headMixin from "~/mixins/others/head.js";
import pagesMixin from "~/mixins/cms/pages.js";
import Breadcrumb from "~/components/partials/Breadcrumb.vue";
export default {
  name: "faq-page",
  components: {
    Breadcrumb
  },
   mixins: [headMixin, pagesMixin],
     data() {
      return {
        page: {
          identifier: "faq-page"
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
      this.seoData = JSON.parse(JSON.stringify(this.faqPage));
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
