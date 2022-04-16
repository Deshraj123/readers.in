<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="searchform-section" id="searchform-section">
    <div class="hbtm-searchform">
      <div class="field-searchbar">
        <label for="main_search" class="searchbar-label hide-element">Search</label>
        <div class="mysearch-bar">
          <input
            type="text"
            id="main_search"
            class="search"
            placeholder="Search product here..."
            @keyup="searchProduct($event)"
          />
        </div>
        <div class="action">
          <button class="search-icon" aria-label="Search">
            <span class="hide-element">Search</span>
            <i class="fal fa-search search-i"></i>
          </button>
        </div>
      </div>
      <div class="search_result_dropdown" v-if="searchProductsShow && searchProducts.length > 0">
        <div class="search_result_list">
          <div v-for="(product, index) in searchProducts" :key="index"  :class="searchResultItem(index)">
             <div class="searchresult-item-img-desc-col">
            <div class="searchresult-item-image">
              <nuxt-link :to="'/'+product.url_key" class="searchresult-image" @click.native="manageSearchProductShow(false)">
                <!--<img
                  :src="getCloudinaryUrl(removeCacheUrl(product.image.url), 100, 100)"
                  :alt="product.image.label"
                  width="100"
                  height="100"
                /> -->
                <img
                  :src="product.image.url"
                  :alt="product.image.label"
                  width="100"
                  height="100"
                />
              </nuxt-link>
            </div>
            <div class="searchresult-item-detail">
              <nuxt-link :to="'/'+product.url_key" class="searchresult-name" @click.native="manageSearchProductShow(false)">
                {{ product.name }}
              </nuxt-link>
              <div class="price-box">
                <div class="special-price price">{{ setFormatPrice(product.price.minimalPrice.amount.value) }}</div>
                <div class="old-price price" v-if="product.special_price != null">{{ setFormatPrice(product.price.regularPrice.amount.value) }}</div>
              </div>
            </div>
             </div>
            <div class="searchresult-item-action" v-if=" product.stock_status== inStock && product.type_id === simpleCode">
             <label :for="'search-result-qty' + index"  class="hide-element label">search result qty</label>
              <div class="control">
                <input type="text" :id="'search-result-qty' + index" :value="product.qty" class="searchresult-qty" v-on:keyup="checkQtyValidationForSearchProduct(index, $event)" />
              </div>
              <div class="searchresult_btn" v-if="product.qty_error_msg == null">
                <button type="button" class="searchresult-addcart" @click="updateCart(product, product.qty)">
                  <span>Add to cart</span>
                </button>
              </div>
              <span class="error" v-else>{{ product.qty_error_msg }}</span>
            </div>
            <ProductViewButton v-else :product="product" />

          </div>
        </div>
        <div class="search-result-action">
          <nuxt-link :to="'/catalogsearch/'+searchKeyword" class="view-result-link" @click.native="manageSearchProductShow(false)">
            View All Results
          </nuxt-link>
        </div>
      </div>
      <div class="search_result_dropdown" v-else-if="searchProductsShow">
        <div class="search_result_list">
          <div class="pro_not_found">
              <span class="s-notfount-img"><img  src="~/assets/images/empty/product-not-found-min.png" alt="Reader" width="90" height="65"></span>
             Product not found
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProductViewButton from "~/components/partials/ProductViewButton.vue";
import productsMixin from "~/mixins/catalog/products.js";
import globalMixin from "~/mixins/others/global.js";
export default {
  name: "Search",
  mixins: [productsMixin, globalMixin],
  components: {
    ProductViewButton
  },
  data() {
    return {
      searchKeyword: ''
    }
  },
  mounted() {
    let that = this
    let specifiedElement = document.getElementById('searchform-section');
    document.addEventListener('click', function(event) {
      var isClickInside = specifiedElement.contains(event.target);
      if(!isClickInside) {
        that.manageSearchProductShow(false)
      }else{
        if(that.searchKeyword != '') {
          that.manageSearchProductShow(true)
        }
      }
    })
  },
  methods: {
    async searchProduct(event) {
      let searchValue = event.target.value;
      if (searchValue.length > 2) {
        this.searchKeyword = searchValue
        let payload = {
          search: searchValue,
          pageSize: 5
        };
        await this.getSearchProducts(payload);
      }
    },
    manageSearchProductShow(value) {
      this.$store.commit('catalog/products/setSearchProductsShow', value);
    },

    searchResultItem(index) {
      let searchResultItemClass = 'search_result_item';
      if(index === 4) {
        searchResultItemClass += ' last-item'
      }
      return searchResultItemClass
    }
  }
};
</script>
