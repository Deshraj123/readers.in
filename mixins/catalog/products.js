import { mapGetters } from "vuex"

import quoteMixin from "~/mixins/quote.js";
import globalMixin from "~/mixins/others/global.js";
import headMixin from "~/mixins/others/head.js";
import customAttributesMixin from "~/mixins/catalog/customAttributes.js";
import authMixin from "~/mixins/customer/auth.js";

export default {

  mixins: [quoteMixin, globalMixin, headMixin, customAttributesMixin, authMixin],

  data() {
    return {
      inStock: 'IN_STOCK'
    }
  },

  computed: {
    ...mapGetters({
      headers: "others/global/getHeaderData",
      simpleCode: "catalog/products/getSimpleCode",
      configurationCode: "catalog/products/getConfigurationCode",
      bundleCode: "catalog/products/getBundleCode",
      groupCode: "catalog/products/getGroupCode",
      products: "catalog/products/getProducts",
      loadinProducts: "catalog/products/getLoadinProducts",
      aggregations: "catalog/products/getAggregations",
      product: "catalog/products/getProduct",
      searchProducts: "catalog/products/getSearchProducts",
      searchProductsShow: "catalog/products/getSearchProductsShow",
      selectedConfigurationProduct: "catalog/products/getSelectedConfigurationProduct",
      groupProducts: "catalog/products/getGroupProducts",
      bundleProductPrice: "catalog/products/getBundleProductPrice",
      bundleProductCustomizeShow: "catalog/products/getBundleProductCustomizeShow",
      createReviewSuccess: "catalog/products/getCreateReviewSuccess",
      isProduct: "catalog/products/getIsProduct",
    }),
  },

  methods: {
    async getProducts(params) {
      const payload = {
        variables: params,
        headers: this.headers,
      }
      await this.$store.dispatch("catalog/products/getProductsAction", payload)
    },
    async getProduct(params) {
      const payload = {
        variables: params,
        headers: this.headers,
      }
      await this.$store.dispatch("catalog/products/getProductAction", payload)
    },
    async getSearchProducts(params) {
      const payload = {
        variables: params,
        headers: this.headers,
      }
      await this.$store.dispatch("catalog/products/getSearchProductsAction", payload)
    },
    updateCart(product, qty){
      if(product.type_id === this.simpleCode) {
        this.addSimpleProductToCart(this.getPayloadForSimpleProduct(product, qty))
      }else if(product.type_id === this.configurationCode){
        this.addConfigurationProductToCart(this.getPayloadForConfigurationProduct(product, qty))
      }else if(product.type_id === this.groupCode){
        if(this.checkQtyValidationForGroupProduct()) {
          this.addSimpleProductToCart(this.getPayloadForGroupProduct())
        }
      }else if(product.type_id === this.bundleCode){
        this.addBundleProductToCart(this.getPayloadForBundleProduct(product, qty))
      }
      return
    },
    getPayloadForSimpleProduct(product, qty) {
      let payload = {
        cartItems: [
          {
            data:{
              sku: product.sku,
              quantity: qty
            }
          }
        ]
      }
      return payload
    },

    getPayloadForConfigurationProduct(product, qty) {
      let payload = {
        cartItems: [
          {
            data:{
              sku: this.selectedConfigurationProduct.sku,
              quantity: qty
            },
            parent_sku: product.sku,
          }
        ]
      }
      return payload
    },

    getPayloadForGroupProduct() {
      let cartItems =[]
      if(this.groupProducts.length > 0){
        this.groupProducts.forEach(function(item){

          if(item.product){

            cartItems.push({
              data:{
                sku: item.product.sku,
                quantity: item.qty
              }
            })
          }
        })
      }

      let payload = {
        cartItems: cartItems
      }
      return payload
    },
    getPayloadForBundleProduct(product, qty){
      let bundleOptions = []
      let maximumQty = qty
      product.items.forEach(function(item){

        if(item.qty > maximumQty) {
          maximumQty = item.qty
        }

        if(item.options.length > 0){
          let selectedOptions =[]
          item.options.forEach(function(option){
            if(option.selected) {
              selectedOptions.push(option.id)
            }
          })
          bundleOptions.push({
            id: item.option_id,
            quantity: item.qty,
            value: selectedOptions
          })
        }
      })

      let payload = {
        cartItems: [
          {
            bundle_options: bundleOptions,
            data:{
              sku: product.sku,
              quantity: qty
            }
          }
        ]
      }
      return payload
    },

    async resetError(productKey){
      let _products = JSON.parse(JSON.stringify(this.products));
      _products.items[productKey].qty_error_msg = null
      await this.$store.commit("catalog/products/updateProducts", _products)
    },
    async checkQtyValidation(productKey, code) {
      this.resetError(productKey)
      let _products = JSON.parse(JSON.stringify(this.products));

      if(code == this.updateItemMinusCode) {
        if(_products.items[productKey].qty > 1) {
          _products.items[productKey].qty -= 1
        }

      }else{
        _products.items[productKey].qty += 1
      }
      /*let qtyVal = event.target.value
      if(!this.is_numeric(qtyVal)) {
        _products.items[productKey].qty_error_msg = 'Qty is not valid.'
      }else{
        _products.items[productKey].qty = parseInt(qtyVal)
      }*/
      await this.$store.commit("catalog/products/updateProducts", _products)
    },

    async checkQtyValidationForSearchProduct(productKey, event) {
      let _products = JSON.parse(JSON.stringify(this.searchProducts));

      _products[productKey].qty_error_msg = null
      await this.$store.commit("catalog/products/setSearchProductsDirect", _products)

      let qtyVal = event.target.value
      if(!this.is_numeric(qtyVal)) {
        _products[productKey].qty_error_msg = 'Qty is not valid.'
      }else{
        _products[productKey].qty = parseInt(qtyVal)
      }
      await this.$store.commit("catalog/products/setSearchProductsDirect", _products)
    },

    async getProductReviewRating(items) {
      let total = 0;
      if(items.length > 0){
        items.forEach(function(value, index){
          total += value.average_rating
        })
      }
      let response = 'width:'+(total/items.length)+'%'
      return response
    },

    getSelectedConfigurationOptions() {
      let that = this
      let selectedOptions = []
      if(that.product.configurable_options.length > 0) {
        that.product.configurable_options.forEach(function(option){
          if(option.values.length > 0) {
            option.values.forEach(function(optionValue){
              if(optionValue.selected) {
                selectedOptions.push(optionValue.value_index)
              }
            })
          }
        })
      }
      return selectedOptions
    },

    setChildProductForConfiguration(selectedOptions) {
      let that = this
      if(selectedOptions.length > 0 && that.product.variants.length > 0) {

        that.product.variants.forEach(function(variant) {

          let selectedAttributes = 0
          let attributes = variant.attributes.length

          if(variant.attributes.length > 0){
            variant.attributes.forEach(function(attribute) {

              selectedOptions.forEach(function(selectedOption){
                if(attribute.value_index === selectedOption){
                  selectedAttributes+=1
                }
              })
            })
          }
          if(selectedAttributes === attributes) {

            that.$store.commit('catalog/products/setSelectedConfigurationProduct', variant.product)
          }
        })
      }
    },
    checkQtyValidationForGroupProduct() {
      let elight = this
      let validation = true
      elight.groupProducts.forEach(function(item){
        if (!elight.is_numeric(item.qty)) {
          validation = false
        }
      })
      return validation
    },

    async updateBundleProductPrice() {
      let totalPrice = 0
      let _product = JSON.parse(JSON.stringify(this.product));
      if(_product.items.length > 0) {
        _product.items.forEach(function(item){
          if(item.options.length > 0){
            item.options.forEach(function(option, _index){
              if(option.selected){
                totalPrice+=(option.product.price_range.maximum_price.final_price.value)*(item.qty)
              }
            })
          }
        })
      }
      await this.$store.commit('catalog/products/setBundleProductPrice', totalPrice)
    },

    // Reviews
    async setNewProductReview(params) {
      const payload = {
        variables: params,
        headers: this.headers,
      }
      await this.$store.dispatch('catalog/products/createReviewAction', payload)
    }
  }
}
