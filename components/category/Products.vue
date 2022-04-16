<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
	<div class="sub-category">
			<CategoryFilter />

		<div class="sub-category-list" v-if="products.total_count > 0">
			<CategoryName :is_brand_data="is_brand_data"/>
			<div class="top-toolbar">
				<Toolbar />
			</div>
			<div class="main-subcategory">
				<div class="product-container products-grid">
          <div class="product-items">
            <div class="product-item" v-for="(product, index) in products.items" :key="index">
              <div class="product-item-info">
                <div class="product-img">
                  <nuxt-link class="img-link" :to="'/'+product.url_key">
                    <!--<img
                      :src="getCloudinaryUrl(removeCacheUrl(product.image.url), imageWidth, imageHeight)"
                      :alt="product.image.label"
                      :width="imageWidth"
                      :height="imageHeight"
                    /> -->
                    <img
                      :src="product.image.url"
                      :alt="product.image.label"
                      :width="imageWidth"
                      :height="imageHeight"
                    />
                  </nuxt-link>
                  <div class="add-cart" v-if="isLogin">
                    <nuxt-link to="#" target="_self" class="wishlist" @click.native="addWishlist(product, 0)"><i class="fal fa-heart">
                      </i><span class="hide-element">wishlist</span></nuxt-link>
                  </div>
                  <div class="new-sale-btn" v-if="product.product_label != null">
                    <span class="new-link new-sale-link"><span>{{ getCustomAttributeLabel(productLabelCode, product.product_label)}}</span></span>
                  </div>
                </div>
                <div class="product-item-details">
                  <div class="rating-code">

                    <RatingCode :data="product" />

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
                      <a href="javascript:void(0)" data-act="-" @click="checkQtyValidation(index, updateItemMinusCode)">
                        <span class="icon-remove">-</span>
                      </a>
                      <div class="qty-text">
                      {{ product.qty }}
                      </div>
                      <a href="javascript:void(0)" data-act="+" @click="checkQtyValidation(index, updateItemAddCode)">
                        <span class="icon-add">+</span>
                      </a>
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
			<div class="bottom-toolbar">
				<Toolbar />
			</div>
		</div>
    <div class="sub-category" v-else-if="!loadinProducts">
      <div class="pro_not_found">
         <span class="not-found-text">We can’t find products matching the selection.</span>
      </div>
    </div>
	</div>

</template>
<script>
import ProductViewButton from "~/components/partials/ProductViewButton.vue";
import CategoryFilter from "~/components/category/CategoryFilter.vue";
import CategoryName from "~/components/category/CategoryName.vue";
import Toolbar from "~/components/category/Toolbar.vue";
import RatingCode from "~/components/partials/RatingCode.vue";
import categoryMixin from "~/mixins/catalog/category.js";
import productsMixin from "~/mixins/catalog/products.js";
import globalMixin from "~/mixins/others/global.js";
import customAttributesMixin from "~/mixins/catalog/customAttributes.js";
import wishlistMixin from "~/mixins/customer/wishlist.js";
export default {
  name: "Products",
  mixins: [categoryMixin, productsMixin, globalMixin, customAttributesMixin, wishlistMixin],
  props: ['is_brand_data'],
	components: {
    CategoryFilter,
    CategoryName,
    Toolbar,
    RatingCode,
    ProductViewButton
  },
  data(){
    return {
      imageWidth: 200,
      imageHeight: 200
    }
  }
};
</script>
