<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="main myaccount-page">
    <div class="myaccount-wrapper">
      <div class="container">
        <div class="myaccount-container-main">
          <MyAccountSidebar />
          <AccountInformation />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyAccountSidebar from "~/components/myaccount/MyAccountSidebar.vue";
import AccountInformation from "~/components/myaccount/AccountInformation.vue";
import headMixin from "~/mixins/others/head.js";
import pagesMixin from "~/mixins/cms/pages.js";
export default {
  name: "CustomerAccountEdit",
  middleware: ['authenticated', 'customer'],
  components: {
    MyAccountSidebar,
    AccountInformation
  },
    mixins: [headMixin, pagesMixin],
      data() {
        return {
          page: {
            identifier: "account-information"
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
      this.seoData = JSON.parse(JSON.stringify(this.accountInformation));
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
