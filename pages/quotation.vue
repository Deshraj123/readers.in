<!-- eslint-disable-next-line -->
<!-- eslint-disable -->

<template>
  <div class="main  page-request-quote">
    <div class="quotation-wrapper">
      <div class="container">
        <RequestQuote />
      </div>
    </div>
  </div>
</template>
<script>
import RequestQuote from "~/components/contactus/RequestQuote.vue";
import headMixin from "~/mixins/others/head.js";
import pagesMixin from "~/mixins/cms/pages.js";
export default {
  name: "quotation",
  components: {
    RequestQuote
  },
  mixins: [headMixin, pagesMixin],
  data() {
    return {
      page: {
        identifier: "quotation"
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
    this.seoData = JSON.parse(JSON.stringify(this.quotationPage));
    this.manageHead();
  },
  methods: {
    manageHead() {
      this.title = this.setTitle(this.seoData);
      this.meta = this.setHead(this.seoData);
    }
  }
};
</script>
