<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="main myaccount-page">
    <div class="myaccount-wrapper">
      <div class="container">
        <div class="myaccount-container-main">
          <MyAccountSidebar />
          <MyWishlist v-if="Object.keys(wishlist).length > 0 && wishlist.items_count > 0"/>
          <NotFoundData v-else :text="notFoundText"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyAccountSidebar from "~/components/myaccount/MyAccountSidebar.vue";
import MyWishlist from "~/components/myaccount/wishlist/MyWishlist.vue";
import NotFoundData from "~/components/partials/NotFoundData.vue";
import wishlistMixin from "~/mixins/customer/wishlist.js";
import headMixin from "~/mixins/others/head.js";
import pagesMixin from "~/mixins/cms/pages.js";
export default {
  name: "WishlistPage",
  middleware: ['authenticated','customer'],
  components: {
    MyAccountSidebar,
    MyWishlist,
    NotFoundData
  },
  mixins: [wishlistMixin, headMixin, pagesMixin],
     data() {
      return {
         notFoundText: 'You have no items in your wish list.',
        page: {
          identifier: "mywishlist"
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
    this.seoData = JSON.parse(JSON.stringify(this.myWishlist));
    this.manageHead()
  },
  methods:{
    manageHead(){
      this.title = this.setTitle(this.seoData);
      this.meta = this.setHead(this.seoData);
    },
  },
};
</script>
