<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="main page-login">
    <div class="login-main-wrapper">
      <div class="container">
        <Login />
      </div>
    </div>
  </div>
</template>

<script>
import headMixin from "~/mixins/others/head.js";
import pagesMixin from "~/mixins/cms/pages.js";
import Login from "~/components/customer/Login.vue";

export default {
  name: "login",
  middleware: ['authenticated'],
  components: {
    Login
  },
   mixins: [headMixin, pagesMixin],
     data() {
      return {
        page: {
          identifier: "login"
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
      this.seoData = JSON.parse(JSON.stringify(this.logIn));
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
