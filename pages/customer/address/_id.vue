<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="main myaccount-page">
    <div class="myaccount-wrapper">
      <div class="container">
        <div class="myaccount-container-main">
          <MyAccountSidebar />
          <Address
            v-if="Object.keys(selectedAddress).length > 0"
            :selectedAddress="selectedAddress"
          />
          <NotFoundData v-else :text="notFoundText"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NotFoundData from "~/components/partials/NotFoundData.vue";
import MyAccountSidebar from "~/components/myaccount/MyAccountSidebar.vue";
import Address from "~/components/myaccount/Address.vue";
import customerMixin from "~/mixins/customer/index.js";
import quoteMixin from "~/mixins/quote.js";
import headMixin from "~/mixins/others/head.js";
import pagesMixin from "~/mixins/cms/pages.js";
export default {
  name: "CustomerAddressEdit",
  middleware: ['authenticated','customer'],
  mixins: [customerMixin, quoteMixin, headMixin, pagesMixin],
  components: {
    MyAccountSidebar,
    Address,
    NotFoundData
  },
  data() {
    return {
      selectedAddress: {},
      selectedAddressId: '',
      notFoundText: "We can't found any kind of address details.",
      page: {
          identifier: "pwa-edit-address"
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
    let that = this
    await that.getCountries()
    that.selectedAddressId = that.$route.params.id
    if(that.customer.addresses.length > 0) {
      that.customer.addresses.forEach(function(address){
        if(address.id == that.selectedAddressId) {
          that.selectedAddress = address
        }
      })
    }
     await this.getPage(this.page);
      this.seoData = JSON.parse(JSON.stringify(this.editAddress));
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
