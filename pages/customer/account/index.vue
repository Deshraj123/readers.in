<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="main myaccount-page">
    <div class="myaccount-wrapper">
      <div class="container">
        <Msg />
        <div class="myaccount-container-main">
          <MyAccountSidebar />
          <MyAccount />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MyAccount from "~/components/myaccount/MyAccount.vue";
import MyAccountSidebar from "~/components/myaccount/MyAccountSidebar.vue";
import Msg from "~/components/message/Msg.vue";
import headMixin from "~/mixins/others/head.js";
import pagesMixin from "~/mixins/cms/pages.js";
export default {
  name: "CustomerAccount",
  components: {
    MyAccount,
    MyAccountSidebar,
    Msg
  },
  middleware: ['authenticated','customer'],
  mixins: [headMixin, pagesMixin],
     data() {
      return {
        page: {
          identifier: "myaccount"
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
      this.seoData = JSON.parse(JSON.stringify(this.myAccount));
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
