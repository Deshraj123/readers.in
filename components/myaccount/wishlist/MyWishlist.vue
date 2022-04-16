<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="mywishlist-right-section myac-right-section">
    <div class="page-title-wrapper">
      <h1 class="page-title"><span>My Wish List</span></h1>
    </div>
    <div class="mywishlist-container">
      <!-- Three button row start here -->
       <div class="wishlist-control-button wishlist-action-toolbar">
        <div class="wishlist-btn">
          <a
            href="javascript:void(0)"
            title="Update Wish List"
            class="wishlist-update action-btn"
            @click="updateDescription()"
          >
            <span>Update Wish List</span>
          </a>
          <nuxt-link
            to="/wishlist/share"
            name="save_and_share"
            title="Share Wish List"
            class="wishlist-share action-btn">
            <span>Share Wish List</span>
          </nuxt-link>
          <a
            href="javascript:void(0)"
            data-role="all-tocart"
            title="Add All to Cart"
            class="wishlist-addcart action-btn"
            @click="addAllWishListProductToCart()"
          >
            <span>Add All to Cart</span>
          </a>
        </div>
      </div>
      <!-- Three button row end here -->
      <div class="wishlist-grid products-grid">
        <div class="product-items wishlist-product-items">
          <div
            class="product-item wishlist-product-item"
            v-for="(item, index) in wishlist.items"
            :key="index"
          >
            <div class="product-item-info wishlist-product-item-info">
              <div class="product-img wishlist-product-img">
                <nuxt-link :to="'/' + item.product.url_key" class="img-link">
                  <!--<img
                    :src="getCloudinaryUrl(removeCacheUrl(item.product.image.url),200,200)"
                    :alt="item.product.image.label"
                    width="200"
                    height="200"
                  />-->
                  <img
                    :src="item.product.image.url"
                    :alt="item.product.image.label"
                    width="200"
                    height="200"
                  />
                </nuxt-link>
                <div
                  class="new-sale-btn"
                  v-if="item.product.product_label != null"
                >
                  <span class="new-link new-sale-link">
                    <span>
                      {{getCustomAttributeLabel(productLabelCode,item.product.product_label)}}
                    </span>
                  </span>
                </div>
              </div>
              <div class="product-item-details wishlist-product-item-details">
                <div class="rating-code wishlist-rating-code">
                  <RatingCode :data="item.product" />
                  <div class="product-sku-col">
                    <span class="product-sku">#{{ item.product.sku }} </span>
                  </div>
                </div>
                <div class="product-name-col">
                  <nuxt-link :to="'/'+item.product.url_key" class="product-name">{{item.product.name}}</nuxt-link>
                </div>
                <div class="product-price">
                    <div class="special-price">
                      {{ setFormatPrice(item.product.price.minimalPrice.amount.value) }}
                    </div>
                    <div
                      class="old-price"
                      v-if="item.product.special_price != null"
                    >
                      {{ setFormatPrice(item.product.price.regularPrice.amount.value) }}
                    </div>
                  </div>

                <textarea
                  :id="'product-item-comment-66' + index"
                  placeholder="Comment"
                  name="description[66]"
                  title="Comment"
                  class="product-item-comment"
                  v-model="item.description"
                  v-on:keyup="updateDescriptionOfWishlistProduct(index, $event)"
                ></textarea>

                <div class="add-to-cart" v-if=" item.product.stock_status== inStock && item.product.type_id === simpleCode">
                  <div class="control-group add-cart-group">
                    <a href="javascript:void(0)" data-act="-" @click="checkQtyValidationForWishlistProduct(index, updateItemMinusCode)">
                        <span class="icon-remove">-</span>
                      </a>
                      <div class="qty-text">
                      {{ item.qty }}
                      </div>
                      <a href="javascript:void(0)" data-act="+" @click="checkQtyValidationForWishlistProduct(index, updateItemAddCode)">
                        <span class="icon-add">+</span>
                      </a>
                  </div>
                  <div class="addcart-action form-action" v-if="item.qty_error_msg == null">
                    <div class="add-cart-btn">
                      <button type="button" class="submit" @click="addTocart(item.product)">Add To Cart</button>
                    </div>
                  </div>
                  <span class="error" v-else>{{ item.qty_error_msg }}</span>
                </div>
                <ProductViewButton v-else :product="item.product" />
                <!-- Edit and remove items start here -->
                 <div class="product-item-actions">
                    <nuxt-link class="action edit" :to="'/'+item.product.url_key">
                      <span>Edit</span>
                    </nuxt-link>
                    <a
                      href="javascript:void(0)"
                      title="Remove Item"
                      class="btn-remove action delete"
                      @click="removeWishlistItem(item)"
                    >
                      <span>Remove item</span>
                    </a>
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
import wishlistMixin from "~/mixins/customer/wishlist.js";
export default {
  components: { RatingCode, ProductViewButton },
  name: "MyWishlist",
  mixins: [wishlistMixin],
  data() {
    return {
      description: ''
    }
  }
};
</script>
