<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="cart-right-section">
    <form class="cart-summary-form">
      <div class="cart-summary-container">
        <div class="cart-summ-title">
          <span class="title">Summary</span>
        </div>
        <div class="table-wrapper">
          <table class="total-wrapper">
            <tbody class="total-body">
              <tr class="subtotal-tr">
                <th class="subttl_th">
                  <span class="subttl_title">Subtotal</span>
                </th>
                <td class="subttl_td">
                  <span class="sbuttl_price"> {{ setFormatPrice(cart.prices.subtotal_including_tax.value) }} </span>
                </td>
              </tr>
              <tr class="ship-tr">
                <th class="ship_th">
                  <span class="ship_title"> Shipping</span>
                </th>
                <td class="ship_td">
                  <span class="ship_price">{{ setFormatPrice(getShippingPrice()) }}</span>
                </td>
              </tr>
              <tr class="total-order-tr">
                <th class="total_th">
                  <span class="total_title">Order Total</span>
                </th>
                <td class="total_td">
                  <span class="total_price">{{ setFormatPrice(cart.prices.grand_total.value) }}</span>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- ----------------------------- discount code main start---------------------------------------------->
          <div class="discount-code-main">
            <div class="discount-code-wrapper" v-b-toggle.discount-code-collapse>
              <div class="title">
                <span>Apply Discount Code</span>
              </div>
              <div class="arrow-up-down">
                <a href="javascript:void(0)">
                  <i class="fal fa-angle-down"></i><span class="hide-element">arrow-icon</span>
                </a>
              </div>
            </div>
            <!--discout code toggle -->
            <b-collapse class="discount-code-toggle" id="discount-code-collapse">
              <div class="input-group input-group-dcode">
                <label for="discount-code" class="label discount-label hide-element">
                  discount code
                </label>
                <div class="control discount-control">
                  <input type="text" id="cname" name="text" class="input-text input-dcode"
                    placeholder="Enter discount code" v-model="coupanCode" />
                  <div class="checkout-action discount-code-btn form-action">
                    <button type="button" class="submit" @click="applyCodeCoupan()">Apply</button>
                  </div>
                </div>
              </div>
              <div class="error-bg" v-if="coupanCodeError!=null">
                {{ coupanCodeError }}
              </div>
              <div class="error-bg" v-if="applyCoupanCodeError!=null">
                {{ applyCoupanCodeError }}
              </div>
            </b-collapse>
          </div>
          <!------------------------------------- discount code main end--------------------------------------------- -->
          <div class="all_texes_link">
            <span>Prices are inclusive of all taxes*</span>
          </div>
          <div class="checkout-action form-action">
            <nuxt-link to="/checkout" class="submit" v-if="isLogin && !checkPlaceOrderForMinimumOrder()" @click.native="showShippingStep()">Proceed to Checkout</nuxt-link>
            <span class="message-notice" v-else-if="isLogin && checkPlaceOrderForMinimumOrder()">{{ config.sales_config.description }}</span>
            <nuxt-link to="/login" class="submit" v-else-if="!isLogin">Login & Proceed to Checkout</nuxt-link>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
  import globalMixin from "~/mixins/others/global.js";
  import quote from "~/mixins/quote.js";
  import authMixin from "~/mixins/customer/auth.js";
  export default {
    name: "Summary",
    mixins: [globalMixin, quote, authMixin],
    data() {
      return {
        coupanCode: '',
        selectedCountry: '',
        selectedState: '',
        zipcode: '',

        coupanCodeError: null
      }
    },
    methods: {
      changeCountry() {
        let that = this
        that.$store.commit('others/directory/setRegions', [])

        if (that.selectedCountry != '' && that.countries.length > 0) {
          that.countries.forEach(function (country) {
            if (country.id === that.selectedCountry) {
              that.$store.commit('others/directory/setRegions', country.available_regions)
            }
          })
        }
      },

      getShippingPrice() {
        let price = 0
        if(this.cart.shipping_addresses.length > 0) {
          if(this.cart.shipping_addresses[0].selected_shipping_method) {
            price = this.cart.shipping_addresses[0].selected_shipping_method.amount.value
          }
        }
        return price
      }
    }
  };
</script>
