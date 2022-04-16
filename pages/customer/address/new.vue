<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="main myaccount-page">
    <div class="myaccount-wrapper ">
      <div class="container">
        <div class="myaccount-container-main">
          <MyAccountSidebar />
          <Address
            :selectedAddress="selectedAddress"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyAccountSidebar from "~/components/myaccount/MyAccountSidebar.vue";
import Address from "~/components/myaccount/Address.vue";
import quoteMixin from "~/mixins/quote.js";
import headMixin from "~/mixins/others/head.js";
import pagesMixin from "~/mixins/cms/pages.js";
export default {
  name: "CreateNewAddress",
  middleware: ['authenticated','customer'],
  mixins: [quoteMixin, headMixin, pagesMixin],
  components: {
    MyAccountSidebar,
    Address
  },
  data() {
    return {
      selectedAddress: {},
       page: {
          identifier: "pwa-add-new-address"
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
    await this.getCountries() ,
    await this.getPage(this.page);
    this.seoData = JSON.parse(JSON.stringify(this.addnewAddress));
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
