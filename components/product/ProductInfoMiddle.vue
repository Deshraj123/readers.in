<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="middle-section">
    <div class="product-price" v-if="selectedProduct.type_id !== groupCode && selectedProduct.type_id !== bundleCode">
      <div class="special-price">
        <span class="price">{{
          setFormatPrice(selectedProduct.price.minimalPrice.amount.value)
        }}</span>
      </div>
      <div class="old-price" v-if="selectedProduct.special_price != null">
        <span class="price">{{
          setFormatPrice(selectedProduct.price.regularPrice.amount.value)
        }}</span>
      </div>
    </div>
    <form
      class="cart"
      @submit.prevent="updateCart(product, qty)"
      v-if="selectedProduct.stock_status === 'IN_STOCK'
      && selectedProduct.type_id !== bundleCode"
    >
      <div class="button-group">
        <div class="qunty" v-if="selectedProduct.type_id !== groupCode">
          <div class="minus">
            <a href="javascript:void(0)" @click="manageCart(selectedProduct, 'minus')"
              ><i class="fal fa-minus"><span class="hide-element">minus-btn</span></i></a>
          </div>
          <div class="input-text">
            {{ qty }}
          </div>
          <div class="plus">
            <a href="javascript:void(0)" @click="manageCart(selectedProduct, 'plus')">
              <i class="fal fa-plus"><span class="hide-element">plus-btn</span></i>
            </a>
          </div>
        </div>

        <div class="add-button">
          <button
            type="submit"
            class="action primary tocart"
          >
            <span>Add to cart</span>
          </button>
        </div>
      </div>
      <span class="error product_page_qty_err" v-if="qtyError != null">
        {{ qtyError}}
      </span>
      <span class="error product_page_qty_err" v-if="addToCartProductError != null">
        {{ addToCartProductError }}
      </span>
    </form>

    <div class="social-icons">
      <div class="icon" v-if="isLogin">
        <a
          href="javascript:void(0)"
          class="share-method"
          @click="addWishlist(selectedProduct, 0)"
        >
          <i class="fal fa-heart"></i><span class="hide-element">icon_heart</span>
        </a>
      </div>
      <div class="icon">
        <a href="javascript:void(0)" @click="printProduct()" class="share-method">
          <i class="fal fa-print"></i><span class="hide-element">print_icon</span>
        </a>
      </div>
      <div class="icon" v-b-toggle.social-collapse>
        <a href="#" onclick="return false;" class="share-method">
          <i class="fal fa-share-alt"></i><span class="hide-element">icon_share</span>
        </a>
      </div>
    </div>

    <b-collapse id="social-collapse">
     <div v-interpolation v-html="productpageShareicon.content" />
    </b-collapse>
  </div>
</template>
<script>
import blocksMixin from "~/mixins/cms/blocks.js";
import productsMixin from "~/mixins/catalog/products.js";
import globalMixin from "~/mixins/others/global.js";
import wishlistMixin from "~/mixins/customer/wishlist.js";
export default {
  name: "ProductInfoMiddle",
  mixins: [productsMixin, globalMixin, wishlistMixin, blocksMixin],
  props: ["selectedProduct"],
  data() {
    return {
      qty: 1,
      qtyError: null,
      block: {
        identifiers: ["pwa-productshare-items"]
      },
    };
  },
 async fetch() {
    await this.getBlocks(this.block);
  },
  methods: {
    resetError() {
      this.qtyError = null;
    },

    checkQtyValidation(product) {
      this.resetError();
      let validation = false;
      let qtyVal = event.target.value;
      if (!this.is_numeric(qtyVal)) {
        this.qtyError = "Qty is not valid.";
        validation = true;
        return;
      }
    },

    manageCart(product, code) {
      if (code == "minus") {
        if(this.qty > 1) {
          this.qty--;
        }
      } else if (code == "plus") {
        this.qty++;
      } else {
        this.updateCart(product, this.qty);
      }
    },

    printProduct() {
      this.$htmlToPaper('printMe');
    }
  }
};
</script>
