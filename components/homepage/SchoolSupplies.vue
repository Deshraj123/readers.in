<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="home-product-wrapper school-supply-wrapper" v-if="Object.keys(homeSchoolSupplies).length > 0 && homeSchoolSupplies.products.items.length > 0">
    <div class="container">
      <div class="office-supplies-container">
        <div class="supplies-title">
          <h3>Sale on {{ homeSchoolSupplies.name }}</h3>
        </div>
        <div class="product-container products-grid">
          <div class="product-items">
            <div class="product-item" v-for="(product, index) in homeSchoolSupplies.products.items" :key="index">
              <div class="product-item-info">
                <div class="product-img">
                  <nuxt-link class="img-link" :to="'/'+product.url_key">
                    <!--<img
                      :src="getCloudinaryUrl(removeCacheUrl(product.image.url), imageWidth, imageHeight)"
                      :alt="product.image.label"
                      :width="imageWidth"
                      :height="imageHeight"
                    />-->
                    <img
                      :src="product.image.url"
                      :alt="product.image.label"
                      :width="imageWidth"
                      :height="imageHeight"
                    />
                  </nuxt-link>
                  <div class="add-cart" v-if="isLogin">
                    <a href="javascript::void(0)" target="_self" class="wishlist" @click="addWishlist(product, 0)"><i class="fal fa-heart"></i><span class="hide-element">wishlist</span></a>
                  </div>
                  <div class="new-sale-btn" v-if="product.product_label != null">
                    <span class="new-link new-sale-link"><span>{{ getCustomAttributeLabel(productLabelCode, product.product_label)}}</span></span>
                  </div>
                </div>
                <div class="product-item-details">
                  <div class="rating-code">
                    <RatingCode :data="product"/>

                    <div class="product-sku-col">
                      <span class="product-sku">#{{product.sku}} </span>
                    </div>
                  </div>
                  <div class="product-name-col">
                    <nuxt-link :to="'/'+product.url_key" class="product-name">{{product.name}}</nuxt-link>
                  </div>
                  <div class="product-price">
                    <div class="special-price">{{ setFormatPrice(product.price.minimalPrice.amount.value) }}</div>
                    <div class="old-price" v-if="product.special_price != null">{{ setFormatPrice(product.price.regularPrice.amount.value) }}</div>
                  </div>
                  <div class="add-to-cart" v-if=" product.stock_status== inStock && product.type_id === simpleCode">
                    <div class="control-group add-cart-group">
                      <div class="minus">
                        <a href="javascript:void(0)" data-act="-" @click="updateProductQty(index, updateItemMinusCode)">
                          <i class="fal fa-minus"><span class="hide-element">minus-btn</span></i>
                        </a>
                      </div>
                      <span class="input-text">{{ product.qty }}</span>
                      <div class="plus">
                        <a href="javascript:void(0)" data-act="+" @click="updateProductQty(index, updateItemAddCode)">
                          <i class="fal fa-plus"><span class="hide-element">plus-btn</span></i>
                        </a>
                      </div>
                    </div>
                    <div class="addcart-action form-action" v-if="product.qty_error_msg == null">
                      <div class="add-cart-btn">
                        <button type="button" class="submit" @click="addTocart(product)">Add To Cart</button>
                      </div>
                    </div>
                    <span class="error" v-else>{{ product.qty_error_msg }}</span>
                  </div>
                  <ProductViewButton v-else :product="product" />

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductViewButton from "~/components/partials/ProductViewButton.vue";
import RatingCode from "~/components/partials/RatingCode.vue";
import categoryMixin from "~/mixins/catalog/category.js";
import globalMixin from "~/mixins/others/global.js";
import customAttributesMixin from "~/mixins/catalog/customAttributes.js";
import wishlistMixin from "~/mixins/customer/wishlist.js";
export default {
  name: "SchoolSupplies",
  components: {
    RatingCode,
    ProductViewButton
  },
  data(){
    return {
      imageWidth: 255,
      imageHeight: 205
    }
  },
  mixins: [categoryMixin, globalMixin, customAttributesMixin, wishlistMixin],
  async mounted() {
    await this.getCategory("school-supplies", 8, 1, false)
    this.$store.commit("catalog/category/setHomeSchoolSupplies", this.setDefaultQty(JSON.parse(JSON.stringify(this.homeSchoolSupplies))))
  },
  methods:{
    async resetError(productKey){
      let _homeSchoolSupplies = JSON.parse(JSON.stringify(this.homeSchoolSupplies));
      _homeSchoolSupplies.products.items[productKey].qty_error_msg = null
      await this.$store.commit("catalog/category/setHomeSchoolSupplies", _homeSchoolSupplies)
    },
    async updateProductQty(productKey, code) {
      this.resetError(productKey)
      let _homeSchoolSupplies = JSON.parse(JSON.stringify(this.homeSchoolSupplies));
      if(code == this.updateItemMinusCode){
        if(_homeSchoolSupplies.products.items[productKey].qty > 1) {
          _homeSchoolSupplies.products.items[productKey].qty -=1
        }
      }else{
        _homeSchoolSupplies.products.items[productKey].qty +=1
      }
      await this.$store.commit("catalog/category/setHomeSchoolSupplies", _homeSchoolSupplies)
    },
  }
};
</script>
