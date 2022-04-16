<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="main myaccount-page">
    <div class="myaccount-wrapper">
      <div class="container">
        <div class="myaccount-container-main">
          <MyAccountSidebar />
          <MyOrder v-if="orders.items.length > 0" :orders="orders"/>
          <NotFoundData v-else :text="notFoundText"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import MyAccountSidebar from "~/components/myaccount/MyAccountSidebar.vue";
import MyOrder from "~/components/myaccount/MyOrder.vue";
import NotFoundData from "~/components/partials/NotFoundData.vue";
import salesMixin from "~/mixins/sales.js";
import customerMixin from "~/mixins/customer/index.js";
import headMixin from "~/mixins/others/head.js";
import pagesMixin from "~/mixins/cms/pages.js";
export default {
  name: "SaleOrderPage",
  middleware: ['authenticated','customer'],
  components: {
    MyAccountSidebar,
    MyOrder,
    NotFoundData
  },
  mixins: [salesMixin, customerMixin, headMixin, pagesMixin],
  data(){
    return {
      notFoundText: " You have placed no orders. ",
      page: {
          identifier: "myorder"
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
    await this.getCustomer({
      orderCurrentPage: 1,
      orderPageSize: 10
    }),
     await this.getPage(this.page);
      this.seoData = JSON.parse(JSON.stringify(this.myOrders));
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
