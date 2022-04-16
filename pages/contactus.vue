<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="main page-contactus"> 
    <div class="contactus-wrapper">
      <div class="container">
        <LeaveMsg />
      </div>
    </div>
  </div>
</template>

<script>
import LeaveMsg from "~/components/contactus/LeaveMsg.vue";  
import headMixin from "~/mixins/others/head.js";
import pagesMixin from "~/mixins/cms/pages.js";
export default {
  name: "contactus",
  components: {
    LeaveMsg, 
  },
  mixins: [headMixin, pagesMixin],
  data() {
    return {
      page: {
        identifier: "contactus"
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
    this.seoData = JSON.parse(JSON.stringify(this.contactusPage));
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
