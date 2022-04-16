<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="main myaccount-page">
    <div class="myaccount-wrapper">
      <div class="container">
        <div class="myaccount-container-main">
          <MyAccountSidebar />
          <OpenSupport />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyAccountSidebar from "~/components/myaccount/MyAccountSidebar.vue";
import OpenSupport from "~/components/myaccount/OpenSupport.vue";
import openSupportMixin from "~/mixins/others/openSupport.js";
import headMixin from "~/mixins/others/head.js";
import pagesMixin from "~/mixins/cms/pages.js";
export default {
  name: "OpenSupportPage",
  middleware: ['authenticated', 'customer'],
  mixins: [openSupportMixin, headMixin, pagesMixin],
  components: {
    MyAccountSidebar,
    OpenSupport
  },
  data(){
    return {
      currentPage: 1,
      pageSize: 5,
       page: {
          identifier: "pwa-open-support"
        },
        title: "",
        meta: [],
        seoData: {}
    }
  },
   head() {
      return {
        title: this.title,
        meta: this.meta
      };
    }, 
  async fetch() {
    await this.getOpenSupports({
      currentPage: this.currentPage,
      pageSize: this.pageSize
    });
    await this.getOpenSupportTopicOptions();
     await this.getPage(this.page);
      this.seoData = JSON.parse(JSON.stringify(this.openSupport));
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
