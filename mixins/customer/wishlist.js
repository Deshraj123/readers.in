import { mapGetters } from "vuex"

import quoteMixin from "~/mixins/quote.js";
import categoryMixin from "~/mixins/catalog/category.js";

export default {
  mixins: [categoryMixin, quoteMixin],
  computed: {
    ...mapGetters({
      headers: "others/global/getHeaderData",
      wishlist: "customer/wishlist/getWishlist",
      wishlistErrors: "customer/wishlist/getWishlistErrors",
      wishlistSuccess: "customer/wishlist/getWishlistSuccess"
    }),
  },

  methods: {
    async addWishlist(product, wishlistId) {
      const payload = {
        variables: {
          wishlistId: wishlistId,
          wishlistItems: [
            {
              quantity: 1,
              sku: product.sku
            }
          ]
        },
        headers: this.headers,
      }
      await this.$store.dispatch("customer/wishlist/addProductsToWishlistAction", payload)
    },

    async resetErrorForWishlistProduct(productKey){
      let _wishlist = JSON.parse(JSON.stringify(this.wishlist));
      _wishlist.items[productKey].qty_error_msg = null
      await this.$store.commit("customer/wishlist/updateWishlist", _wishlist)
    },

    async checkQtyValidationForWishlistProduct(productKey, code) {
      await this.resetErrorForWishlistProduct(productKey)
      let _wishlist = JSON.parse(JSON.stringify(this.wishlist));
      if(code == this.updateItemMinusCode){
        if(_wishlist.items[productKey].qty > 1) {
          _wishlist.items[productKey].qty -=1
        }

      }else{
        _wishlist.items[productKey].qty +=1
      }

      await this.$store.commit("customer/wishlist/updateWishlist", _wishlist)

    },

    async updateDescriptionOfWishlistProduct(productKey, event) {
      let _wishlist = JSON.parse(JSON.stringify(this.wishlist));
      let desVal = event.target.value

      _wishlist.items[productKey].description = desVal
      await this.$store.commit("customer/wishlist/updateWishlist", _wishlist)
    },

    async removeWishlistItem(item) {
      let payload = {
        wishlistId: this.wishlist.id,
        wishlistItemsIds: [
          item.id
        ]
      }
      await this.removeProductsFromWishlist(payload)
    },

    async removeProductsFromWishlist(params) {
      const payload = {
        variables: params,
        headers: this.headers,
      }
      await this.$store.dispatch("customer/wishlist/removeProductsFromWishlistAction", payload)
    },

    async updateDescription() {
      let wishlistItems = []

      this.wishlist.items.forEach(function(item){
        if(item.description != null){
          wishlistItems.push({
            wishlist_item_id: item.id,
            description: item.description
          })
        }

      })

      let payload = {
        wishlistId: this.wishlist.id,
        wishlistItems: wishlistItems
      }
      await this.updateWishList(payload)
    },

    async updateWishList(params) {

      const payload = {
        variables: params,
        headers: this.headers,
      }
      await this.$store.dispatch("customer/wishlist/updateProductsInWishlistAction", payload)
    },

    async addAllWishListProductToCart() {
      let that = this
      let items = []
      this.wishlist.items.forEach(function(item){
        if(item.product.type_id === that.simpleCode){
          items.push({
            data:{
              quantity: item.qty,
              sku: item.product.sku
            }
          })
        }
      })

      let payload = {
        cartItems: items
      }

      await this.addSimpleProductToCart(payload)
    },

    async shareWishlist(params) {
      const payload = {
        variables: params,
        headers: this.headers,
      }
      await this.$store.dispatch("customer/wishlist/shareWishlistAction", payload)
    }


  },


}
