<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="main page-create-ac">
    <div class="createac-main-wrapper login-main-wrapper">
      <div class="container">
        <CreateAc />
      </div>
    </div>
  </div>
</template>

<script>
import headMixin from "~/mixins/others/head.js";
import pagesMixin from "~/mixins/cms/pages.js";
import CreateAc from "~/components/customer/CreateAc.vue";

export default {
  name: "createaccount",
  middleware: ['authenticated'],
  components: {
    CreateAc
  },
   mixins: [headMixin, pagesMixin],
     data() {
      return {
        page: {
          identifier: "pwa-signup"
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
      this.seoData = JSON.parse(JSON.stringify(this.signUp));
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
