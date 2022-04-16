<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="main payment-info-page">
    <div class="payment-info-section">
      <div class="breadcrumbs">
        <div class="container">
          <Breadcrumb :label="paymentInformation.meta_title"/>
        </div>
      </div>
      <div class="container">
        <MainFooterPaymentInfo />
      </div>
    </div>
  </div>
</template>
<script>
import headMixin from "~/mixins/others/head.js";
import pagesMixin from "~/mixins/cms/pages.js";
import Breadcrumb from "~/components/partials/Breadcrumb.vue";
export default {
  name: "paymentinformation",
  components: {
    Breadcrumb
    },
   mixins: [headMixin, pagesMixin],
    data() {
      return {
        page: {
          identifier: "paymentinformation"
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
      this.seoData = JSON.parse(JSON.stringify(this.paymentInformation));
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
