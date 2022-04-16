import { mapGetters } from "vuex"

import productsMixin from "~/mixins/catalog/products.js";
import categoryMixin from "~/mixins/catalog/category.js";

export default {

  mixins: [productsMixin, categoryMixin],

  computed: {
    ...mapGetters({
      headers: "others/global/getHeaderData",
      searchProducts: "catalog/products/getSearchProducts",
      searchKeyword: "catalog/products/getSearchKeyword",
      searchResultProductsShow: "catalog/products/getSearchResultProductsShow"
    }),
  }
}
