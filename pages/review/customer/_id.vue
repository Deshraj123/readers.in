<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="main myaccount-page">
    <div class="myaccount-wrapper">
      <div class="container">
        <div class="myaccount-container-main">
          <MyAccountSidebar />
          <ReviewDetails
            v-if="Object.keys(selectedReview).length > 0"
            :selectedReview="selectedReview"
          />
          <NotFoundData v-else :text="notFoundText"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyAccountSidebar from "~/components/myaccount/MyAccountSidebar.vue";
import ReviewDetails from "~/components/myaccount/ReviewDetails.vue";
import NotFoundData from "~/components/partials/NotFoundData.vue";
import customerMixin from "~/mixins/customer/index.js";
import headMixin from "~/mixins/others/head.js";
import pagesMixin from "~/mixins/cms/pages.js";
export default {
  name: "ReviewCustomerView",
  middleware: ['authenticated','customer'],
  mixins: [customerMixin, headMixin, pagesMixin],
  components: {
    MyAccountSidebar,
    ReviewDetails,
    NotFoundData
  },
  data(){
    return {
      selectedReview: {},
      selectedReviewId: '',
      notFoundText: "We havn't found any review.",
       page: {
          identifier: "pwa-review-details"
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
    this.selectedReviewId = this.$route.params.id
    await this.addSelectedReview(),
    await this.getPage(this.page);
      this.seoData = JSON.parse(JSON.stringify(this.reviewDetails));
      this.manageHead()

  },
  methods:{
    addSelectedReview() {
      let that = this
      if(that.customer.reviews.items.length > 0){
        that.customer.reviews.items.forEach(function(item){
          if(item.review_id == that.selectedReviewId){
            that.selectedReview = item
          }
        })
      }
    },
     manageHead(){
        this.title = this.setTitle(this.seoData);
        this.meta = this.setHead(this.seoData);
      },
  }
};
</script>
