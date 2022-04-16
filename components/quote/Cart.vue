<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="checkout-cart-container">
    <div class="page-title-wrapper">
      <h1 class="page-title">Shopping Bag</h1>
    </div>
    <div class="message-notice" v-if="checkPlaceOrderForMinimumOrder()">
      {{ config.sales_config.description }}
    </div>
    <div class="checkout-cart" v-if="cart.total_quantity > 0">
      <div class="cart-left-section">
        <!-- Error -->
        <span class="error-bg d-flex" v-if="errorMsg != null">
          {{ errorMsg }}
        </span>
        <span class="error-bg d-flex" v-if="updateCartItemQtyError != null">
          {{ updateCartItemQtyError }}
        </span>
        <span class="error-bg d-flex" v-if="removeItemError != null">
          {{ removeItemError }}
        </span>

        <form class="cart_form">
          <table
            id="cart"
            class="table-wrapper table-wrapper-desktop"
            v-if="$device.isDesktop"
          >
            <thead>
              <tr class="row-th">
                <th class="th-item">Item</th>
                <th class="th-price">Price</th>
                <th class="th-qty">Qty</th>
                <th class="th-subtotal">Subtotal</th>
                <th class="th-action">Action</th>
              </tr>
            </thead>
            <tbody class="cart-body item-body">
              <!-- shopping cart contents -->
              <tr
                class="item-info"
                v-for="(item, index) in cart.items"
                :key="index"
              >
                <td class="item-td">
                  <div class="item-wrapper">
                    <div class="item-img">
                      <nuxt-link :to="item.product.url_key">
                        <!--<img
                          :src="
                            getCloudinaryUrl(
                              removeCacheUrl(item.product.image.url),
                              65,
                              67
                            )
                          "
                          :alt="item.product.image.label"
                          width="65"
                          height="67"
                        /> -->
                        <img
                          :src="item.product.image.url"
                          :alt="item.product.image.label"
                          width="65"
                          height="67"
                        />
                      </nuxt-link>
                    </div>
                    <div class="about-item">
                      <span>{{ item.product.name }}</span>
                      <ItemDetails :item="item" :index="index" />
                    </div>
                  </div>
                </td>
                <td class="price-td">
                  <span class="item-price">
                    {{
                      setFormatPrice(
                        item.prices.row_total_including_tax.value /
                          item.quantity
                      )
                    }}
                  </span>
                </td>
                <td class="qty-td">
                  <div class="qty-item-wrapper">
                    <div class="qty-section">
                    <div class="input-qty">
                      <div class="minus">
                        <a href="javascript:void(0)" data-act="-" @click="updateItemQty(item, updateItemMinusCode)">
                          <i class="fal fa-minus"><span class="hide-element">minus-btn</span></i>
                        </a>
                      </div>
                      <div class="input-text">{{ item.quantity }}</div>
                     <div class="plus">
                        <a href="javascript:void(0)" data-act="+" @click="updateItemQty(item, updateItemAddCode)">
                          <i class="fal fa-plus"><span class="hide-element">plus-btn</span></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  </div>
                </td>
                <td class="subtotal-td">
                  <span class="subtotal-item">
                    {{
                      setFormatPrice(item.prices.row_total_including_tax.value)
                    }}
                  </span>
                </td>
                <td class="action-td action-td-desktop">
                  <div class="action-icon">
                    <span class="remove-action">
                      <a href="javascript:void(0)" title="Remove Product">
                      <i  @click="removeItemFromCart(item.id)" class="fal fa-trash delete-item delete-icon"></i>
                      </a>
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- for mobile -->
          <div
            class="mobile-cart-table"
            v-for="(item, index) in cart.items"
            :key="index"
          >
            <table
              id="cart"
              class="table-wrapper table-wrapper-mobile table-one-item"
            >
              <tbody class="cart-body item-body">
                <tr class="item-info item-info-mobile">
                  <td class="item-td item-td-mobile">
                    <div class="item-wrapper">
                      <div class="item-img">
                        <nuxt-link :to="item.product.url_key">
                          <!--<img
                            :src="
                              getCloudinaryUrl(
                                removeCacheUrl(item.product.image.url),
                                65,
                                67
                              )
                            "
                            :alt="item.product.image.label"
                            width="65"
                            heigth="67"
                          />-->
                          <img
                            :src="item.product.image.url"
                            :alt="item.product.image.label"
                            width="65"
                            heigth="67"
                          />
                        </nuxt-link>
                      </div>
                      <div class="about-item">
                        <span>{{ item.product.name }}</span>
                        <ItemDetails :item="item" :index="index" />
                      </div>
                    </div>
                    <div class="action-icon action-icon-mobile">
                      <span class="remove-action">
                        <a href="javascript:void(0)" title="Remove Product">
                         <i  @click="removeItemFromCart(item.id)" class="fal fa-trash delete-item delete-icon"></i>
                        </a>
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              id="cart"
              class="table-wrapper table-wrapper-mobile table-two-pqs"
            >
              <thead class="">
                <tr class="row-th">
                  <th class="th-price">Price</th>
                  <th class="th-qty">Qty</th>
                  <th class="th-subtotal">Subtotal</th>
                </tr>
              </thead>
              <tbody class="cart-body item-body">
                <tr class="for-mobile-tr price-qty-subttl-mobile">
                  <td class="price-td">
                    <span class="item-price">
                      {{
                        setFormatPrice(
                          item.prices.row_total_including_tax.value /
                            item.quantity
                        )
                      }}
                    </span>
                  </td>
                  <td class="qty-td">
                    <div class="qty-item-wrapper">
                      <div class="qty-section">
                      <div class="input-qty">
                        <div class="minus">
                          <a href="javascript:void(0)" data-act="-" @click="updateItemQty(item, updateItemMinusCode)">
                            <i class="fal fa-minus"><span class="hide-element">minus-btn</span></i>
                          </a>
                        </div>
                        <div class="input-text">{{ item.quantity }}</div>
                       <div class="plus">
                          <a href="javascript:void(0)" data-act="+" @click="updateItemQty(item, updateItemAddCode)">
                            <i class="fal fa-plus"><span class="hide-element">plus-btn</span></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    </div>
                  </td>
                  <td class="subtotal-td">
                    <span class="subtotal-item">
                      {{
                        setFormatPrice(
                          item.prices.row_total_including_tax.value
                        )
                      }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!--for mobile-end -->
          <div class="cart-form-action form-action" v-if="$device.isDesktop">
            <div class="continue-shop">
              <button type="button" class="submit" @click="continueShopping()">
                Continue Shopping
              </button>
            </div>
            <div class="clear-shop-cart">
              <button type="button" class="submit" @click="clearShoppingCart()">
                Clear Shopping cart
              </button>
            </div>
          </div>
        </form>
      </div>
      <Summary />
    </div>
    <div class="checkout-cart " v-else>
      <span class="not-found-text">
        You have no items in your shopping cart.
      </span>
    </div>
  </div>
</template>
<script>
import Summary from "~/components/quote/Summary.vue";
import ItemDetails from "~/components/partials/quote/ItemDetails.vue";
import globalMixin from "~/mixins/others/global.js";
import quote from "~/mixins/quote.js";
export default {
  name: "Cart",
  components: {
    Summary,
    ItemDetails
  },
  mixins: [globalMixin, quote],
  methods: {
    continueShopping() {
      this.$router.push({ path: "/" });
    },
    async clearShoppingCart() {
      let that = this;
      if (that.cart.items.length > 0) {
        that.$store.commit("others/loading/setLoading", true)
        that.cart.items.forEach(function(item) {
          that.removeItemFromCart(item.id, false);
        });
        let emptyCart = setInterval(function(){
          if(that.cart.items.length == 0) {
            clearInterval(emptyCart);
            that.$store.commit("others/loading/setLoading", false)
          }
        }, 100)
      }
    }
  }
};
</script>
