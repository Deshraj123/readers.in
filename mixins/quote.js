import { mapGetters } from "vuex"

import globalMixin from "~/mixins/others/global.js";

export default {
  mixins: [globalMixin],

  computed: {
    ...mapGetters({
      headers: "others/global/getHeaderData",
      config: "others/global/getConfig",
      cart: "quote/getCart",

      countries: "others/directory/getCountries",
      regions: "others/directory/getRegions",
      availableShippingMethods: "quote/getAvailableShippingMethods",
      oldCartId: "quote/getOldCartId",

      // Errors
      addToCartProductError: "quote/getAddToCartProductError",
      updateCartItemQtyError: "quote/getUpdateCartItemQtyError",
      removeItemError: "quote/getRemoveItemError",
      applyCoupanCodeError: "quote/getApplyCoupanCodeError",
      shippingMethodsError: "quote/getShippingMethodsError",
      billingAddressError: "quote/getBillingAddressError",
      paymentMethodError: "quote/getPaymentMethodError",
      placeOrderError: "quote/getPlaceOrderError",

      // Success
      billingAddressSuccess: "quote/getBillingAddressSuccess",

      // Steps
      steps: "quote/getSteps",


    }),
  },

  data(){
    return {
      errorMsg: null,
      coupanCode: '',
      coupanCodeError: null,
      updateItemAddCode: "add",
      updateItemMinusCode: "minus",
    }
  },

  methods: {
    addCardId(params) {
      params['cartId'] = this.$cookies.get("cart_id")
      return params
    },

    async getCart() {
      const payload = {
        variables: this.addCardId({}),
        headers: this.headers,
      }
      await this.$store.dispatch("quote/getCartAction", payload)
    },

    async addSimpleProductToCart(params) {
      const payload = {
        variables: this.addCardId(params),
        headers: this.headers,
      }
      await this.$store.dispatch("quote/addSimpleProductAction", payload)
    },

    async addConfigurationProductToCart(params) {
      const payload = {
        variables: this.addCardId(params),
        headers: this.headers,
      }
      await this.$store.dispatch("quote/addConfigurationProductAction", payload)
    },

    async addBundleProductToCart(params) {
      const payload = {
        variables: this.addCardId(params),
        headers: this.headers
      }
      await this.$store.dispatch("quote/addBundleProductAction", payload)
    },

    async updateCartItem(params) {
      const payload = {
        variables: this.addCardId(params),
        headers: this.headers,
      }
      await this.$store.dispatch("quote/updateCartItemQtyAction", payload)
    },

    async removeItemFromCart(itemId, loading=true) {
      const payload = {
        variables: {
          cartId: this.$cookies.get("cart_id"),
          cartItemId: itemId,
        },
        headers: this.headers,
        loading: loading
      }
      await this.$store.dispatch("quote/removeItemAction", payload)
    },

    async applyCoupanCode(coupanCode) {
      const payload = {
        variables: {
          input: {
            cart_id: this.$cookies.get("cart_id"),
            coupon_code: coupanCode
          }
        },
        headers: this.headers,
      }
      await this.$store.dispatch("quote/setApplyCoupanCodeAction", payload)
    },

    async closeMiniCart() {
      await this.$store.commit('others/header/setMiniCartShow', false)
    },

    resetErrorMsg(){
      this.errorMsg = null
    },

    async updateItemQty(item, updateItemCode) {
      let itemQty = item.quantity
      if(updateItemCode == this.updateItemMinusCode) {
        itemQty-=1
      }else{
        itemQty+=1
      }
      let payload = {
        cartItems:[
          {
            cart_item_id: item.id,
            quantity: itemQty
          }
        ]
      }

      if(itemQty == 0) {
        return
      }

      await this.updateCartItem(payload)
    },

    async checkQtyAndUpdateCart(item, event) {
      let that = this
      that.resetErrorMsg()
      let qtyValue = event.target.value
      if(!that.is_numeric(qtyValue)){
        that.errorMsg = 'Qty is not valid.'
        setTimeout(function(){
          that.resetErrorMsg()
        }, 3000)
        return
      }

      let payload = {
        cartItems:[
          {
            cart_item_id: item.id,
            quantity: qtyValue
          }
        ]
      }

      await that.updateCartItem(payload)
    },

    async getCountries() {
      const payload = {
        variables: {},
        headers: this.headers,
      }
      await this.$store.dispatch("others/directory/getCountriesActions", payload)
    },

    async getRegions() {
      const payload = {
        variables: {},
        headers: this.headers,
      }
      await this.$store.dispatch("others/directory/getRegionsAction", payload)
    },

    async getAvailableShippingMethods() {
      const payload = {
        variables: this.addCardId({}),
        headers: this.headers,
      }
      await this.$store.dispatch("quote/getAvailableShippingMethodsAction", payload)
    },

    async addShippingMethod(shippingMethod) {
      let params = {
        shppingMethods: [
          {
            carrier_code: shippingMethod.carrier_code,
            method_code: shippingMethod.method_code
          }
        ]
      }
      const payload = {
        variables: this.addCardId(params),
        headers: this.headers,
      }
      await this.$store.dispatch("quote/setShippingMethodsAction", payload)
    },

    async addGuestEmail(params) {
      const payload = {
        variables: this.addCardId(params),
        headers: this.headers,
      }
      await this.$store.dispatch("quote/setEmailCartAsGuest", payload)
    },

    getRegionId(regionCode){
      let id = ''
      this.regions.forEach(function(region){
        if(region.code == regionCode){
          id=region.id
        }
      })
      return id
    },

    async addShippingAddress(params) {
      const payload = {
        variables: this.addCardId(params),
        headers: this.headers,
      }
      await this.$store.dispatch("quote/setShippingAddressAction", payload)
    },

    async addBillingAddress(params) {
      const payload = {
        variables: this.addCardId(params),
        headers: this.headers,
      }
      await this.$store.dispatch("quote/setBillingAddressAction", payload)
    },

    async setPaymentMethodOnCart(params) {
      const payload = {
        variables: this.addCardId(params),
        headers: this.headers,
      }
      await this.$store.dispatch("quote/setPaymentMethodAction", payload)
    },

    async showShippingStep() {
      await this.$store.commit("quote/setSteps", {
        shipping: true,
        payment: false,
        thank_you: false
      })
    },

    async paymentStepShow(){
      await this.$store.commit("quote/setSteps", {
        shipping: false,
        payment: true,
        thank_you: false
      })
    },

    async thankyouStepShow(){
      await this.$store.commit("quote/setSteps", {
        shipping: false,
        payment: false,
        thank_you: true
      })
    },

    async applyCodeCoupan() {
      this.coupanCodeError = null
      if(this.coupanCode === '') {
        this.coupanCodeError = 'Coupan code must be required.'
        setTimeout(function(){
          this.coupanCodeError = null
        }, 5000)
        return
      }

      await this.applyCoupanCode(this.coupanCode)
    },

    async placeOrder() {
      const payload = {
        variables: {
          input:{
            cart_id: this.$cookies.get("cart_id")
          }
        },
        headers: this.headers,
      }
      await this.$store.dispatch("quote/placeOrderAction", payload)
    },

    /**
     * mergeCarts
     */
    async mergeCarts() {
      const payloadForMergeCarts = {
        variables: {
          source_cart_id: this.oldCartId,
          destination_cart_id: this.$cookies.get('cart_id')
        },
        headers: this.headers
      };
      await this.$store.dispatch('quote/mergeCartsActions', payloadForMergeCarts)
    },

    /**
     *
     * Empty Cart
     */
    async emptyCart() {
      const payload = {
        variables: {},
        headers: this.headers
      }
      await this.$store.dispatch("quote/getCartId", payload)
    },

    async createCustomerCartId() {
      let token = this.$cookies.get("token")
      await this.$store.commit("others/global/setHeaderTokenData", token)
      await this.emptyCart()
      await this.mergeCarts()
      await this.redirectToMyAccountPage()
    },

    /**
     * RedirectToHomePage
     */
    async redirectToMyAccountPage() {
      await this.$router.push({ path: "/customer/account" })
    },

    /**
     * RedirectToHomePage
     */
    async redirectToHomePage() {
      await this.$router.push({ path: "/" })
    },

    /**
     * RedirectToHomePage
     */
    async redirectToSalesOrderPage() {
      await this.$router.push({ path: "/sale/order" })
    },

    /**
     * ReorderItems
     */
    async reorderItems(orderNumber) {
      const payload = {
        variables: {
          orderNumber:orderNumber
        },
        headers: this.headers
      };
      await this.$store.dispatch('quote/reorderItemsActions', payload)
    },

    checkPlaceOrderForMinimumOrder() {
      if(this.config.sales_config && this.config.sales_config.active){

        // tax_including
        if((this.config.sales_config.tax_including) && (parseFloat(this.cart.prices.subtotal_including_tax.value.toFixed(2)) >= parseFloat(Number(this.config.sales_config.amount).toFixed(2)))) {
          return false
        }

        // include_discount_amount
        if(this.config.sales_config.include_discount_amount && parseFloat(this.cart.prices.subtotal_with_discount_excluding_tax.value.toFixed(2)) >= parseFloat(Number(this.config.sales_config.amount).toFixed(2))) {
          return false
        }

      }

      return true
    }

  },
}
