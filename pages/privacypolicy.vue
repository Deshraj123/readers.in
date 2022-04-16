<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="main privacy-policy-page">
    <div class="privacy-policy-section">
      <div class="breadcrumbs">
        <div class="container">
          <Breadcrumb :label="privacyPolicy.meta_title"/>
        </div>
      </div>
      <div class="container">
        <MainfooterPrivacyPolicy />
      </div>
    </div>
  </div>
</template>

<script>
import headMixin from "~/mixins/others/head.js";
import pagesMixin from "~/mixins/cms/pages.js";
import Breadcrumb from "~/components/partials/Breadcrumb.vue";
export default {
  name: "privacypolicy",
  mixins: [headMixin, pagesMixin],
  components: {
    Breadcrumb
  },
  data() {
    return {
      page: {
        identifier: "privacyPolicy"
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
      this.seoData = JSON.parse(JSON.stringify(this.privacyPolicy));
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
