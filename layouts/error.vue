<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div>
    <div class="main not-found-404-page" v-if="error.statusCode === 404">
      <div class="notfoundpage-404-wrapper">
        <div class="container">
          <NotFound404 />
        </div>
      </div>
    </div>
    <div class="main not-found-404-page" v-else>
      <div class="notfoundpage-404-wrapper">
        <div class="container">
          <h1>An error occurred</h1>
          <NuxtLink to="/">Home page</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headMixin from "~/mixins/others/head.js";
import pagesMixin from "~/mixins/cms/pages.js";
import NotFound404 from "~/components/page404/NotFound404.vue";

export default {
  props: ["error"],
  layout: "error", // you can set a custom layout for the error page
  components: {
    NotFound404,
  },
  mixins: [headMixin, pagesMixin],
  data() {
    return {
      page: {
        identifier: "404notfound",
      },
      title: "",
      meta: [],
      seoData: {},
    };
  },
  head() {
    return {
      title: this.title,
      meta: this.meta,
    };
  },
  async fetch() {
    await this.getPage(this.page);
    this.seoData = JSON.parse(JSON.stringify(this.notFound));
    this.manageHead();
  },
  methods: {
    manageHead() {
      this.title = this.setTitle(this.seoData);
      this.meta = this.setHead(this.seoData);
    },
  },

};
</script>

