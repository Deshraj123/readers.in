<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="main myaccount-page">
    <div class="myaccount-wrapper">
      <div class="container">
        <div class="myaccount-container-main">
          <MyAccountSidebar />
          <AddressBook :addresses="customer.addresses"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyAccountSidebar from "~/components/myaccount/MyAccountSidebar.vue";
import NotFoundData from "~/components/partials/NotFoundData.vue";
import AddressBook from "~/components/myaccount/AddressBook.vue";
import customerMixin from "~/mixins/customer/index.js";
import headMixin from "~/mixins/others/head.js";
import pagesMixin from "~/mixins/cms/pages.js";
export default {
  name: "CustomerAddress",
  middleware: ['authenticated','customer'],
  mixins: [customerMixin, headMixin, pagesMixin],
  components: {
    MyAccountSidebar,
    AddressBook,
    NotFoundData
  },
  data(){
    return {
      notFoundText: " You have no addresses.",
      page: {
          identifier: "address-book"
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
      await this.getPage(this.page);
      this.seoData = JSON.parse(JSON.stringify(this.addressBook));
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
