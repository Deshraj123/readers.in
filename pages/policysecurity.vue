<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="main policies-sec-page">
    <div class="policies-security-section">
      <div class="breadcrumbs">
        <div class="container">
          <Breadcrumb :label="policySecurity.meta_title"/>
        </div>
      </div>
      <div class="container">
        <MainfooterPoliciesAndSec />
      </div>
    </div>
  </div>
</template>
<script>
import headMixin from "~/mixins/others/head.js";
import pagesMixin from "~/mixins/cms/pages.js";
import Breadcrumb from "~/components/partials/Breadcrumb.vue";
export default {
  name: "policiesandsec",
  components: {
    Breadcrumb
  },
   mixins: [headMixin, pagesMixin],
     data() {
      return {
        page: {
          identifier: "policysecurity"
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
      this.seoData = JSON.parse(JSON.stringify(this.policySecurity));
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
