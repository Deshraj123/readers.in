<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="main myaccount-page">
    <div class="myaccount-wrapper">
      <div class="container">
        <div class="myaccount-container-main">
          <MyAccountSidebar />
          <MyProductReviews
            v-if="Object.keys(customer).length > 0 &&
            customer.reviews.items.length > 0"
            :reviews="customer.reviews"
          />
          <NotFoundData v-else :text="notFoundText"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyAccountSidebar from "~/components/myaccount/MyAccountSidebar.vue";
import MyProductReviews from "~/components/myaccount/MyProductReviews.vue";
import NotFoundData from "~/components/partials/NotFoundData.vue";
import customerMixin from "~/mixins/customer/index.js";
import pagesMixin from "~/mixins/cms/pages.js";
import headMixin from "~/mixins/others/head.js";
export default {
  name: "ReviewCustomerIndex",
  mixins: [customerMixin, headMixin, pagesMixin],
  middleware: ['authenticated'],
  components: {
    MyAccountSidebar,
    MyProductReviews,
    NotFoundData
  },
  data(){
    return {
      notFoundText: "You have submitted no reviews.",
       page: {
          identifier: "pwa-my-product-reviews"
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
    await this.getCustomer({
      reviewsCurrentPage: 1,
      reviewsPageSize: 10
    }),
    await this.getPage(this.page);
      this.seoData = JSON.parse(JSON.stringify(this.productReview));
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
