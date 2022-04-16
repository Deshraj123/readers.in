<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="main  myaccount-page">
    <div class="myaccount-wrapper">
      <div class="container">
        <div class="myaccount-container-main">
          <MyAccountSidebar />
          <ShareWishList />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyAccountSidebar from "~/components/myaccount/MyAccountSidebar.vue";
import ShareWishList from "~/components/myaccount/wishlist/ShareWishList.vue";
import headMixin from "~/mixins/others/head.js";
import pagesMixin from "~/mixins/cms/pages.js";
export default {
  name: "WishlistSharePage",
  middleware: ['authenticated','customer'],
  components: {
    MyAccountSidebar,
    ShareWishList
  },
  mixins: [headMixin, pagesMixin],
     data() {
      return {
        page: {
          identifier: "pwa-wish-list-sharing"
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
