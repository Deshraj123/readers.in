<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
	<div class="minicart-container">
    <div class="message-notice" v-if="checkPlaceOrderForMinimumOrder()">
      {{ config.sales_config.description }}
    </div>
		<div class="cart-item-title">
			<span>{{ cart.total_quantity }} items in cart</span>
			<i class="fal fa-times" @click="closeMiniCart()"></i>
		</div>
			<span class="error-bg d-flex" v-if="errorMsg!=null">{{ errorMsg }}</span>
		<div class="minicart-all-list" v-if="cart.items.length > 0">
      <!-- minicart-errors -->
      <span class="error" v-if="updateCartItemQtyError!=null">{{ updateCartItemQtyError }}</span>
      <span class="error" v-if="removeItemError!=null">{{ removeItemError }}</span>
      <!-- minicart-item -->
			<div v-for="(item, index) in cart.items" :key="index" :class="minicartItems(index)">
				<div class="item-img img-col">
					<nuxt-link :to="item.product.url_key">
					<!-- <img
            :src="getCloudinaryUrl(removeCacheUrl(item.product.image.url), 60, 60)"
            :alt="item.product.image.label"
            width="60"
            height="60"
          /> -->
		  <img
            :src="item.product.image.url"
            :alt="item.product.image.label"
            width="60"
            height="60"
          />
				</nuxt-link>
				</div>
				<div class="list-item-info">
					<div class="item-name">
						<nuxt-link :to="item.product.url_key">{{ item.product.name }}</nuxt-link>
					</div>
          <ItemDetails :item="item" :index="index" />
					<div class="minicart-price-box">
						<div class="price-title">Price :</div>
						<div class="price-box">
							<div class="special-price price">{{ setFormatPrice(item.prices.row_total_including_tax.value/item.quantity) }}</div>
						</div>
					</div>
					<div class="item-qty">
						<form class="item-qty-box">
							<div class="qty-section">
							<div class="details-qty qty">
								<label for="qty" class="qty-title">Qty :</label>
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
						</form>
						<div class="edit-delete-item">
							<a href="javascript:void(0)" class="action-link" @click="removeItemFromCart(item.id)">
								<i class="fal fa-trash delete-item"></i><span class="hide-element">delete-icon</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="minicart-footer">
			<div class="subtotal">
				<span class="sub-title">Subtotal</span>
				<span class="sub-price">{{ setFormatPrice(cart.prices.subtotal_including_tax.value) }}</span>
			</div>
			<div class="view-edit">
				<nuxt-link to="/cart" class="view-edit-link" @click.native="closeMiniCart()">View and Edit Cart</nuxt-link>
			</div>
			<div class="checkout" @click.stop="closeMiniCart()">
				<nuxt-link to="/checkout" class="chk-btn" v-if="isLogin && !checkPlaceOrderForMinimumOrder()" @click.native="showShippingStep()">Proceed to Checkout</nuxt-link>
        		<nuxt-link to="/login" class="chk-btn" v-else-if="!isLogin">Login & Proceed to Checkout</nuxt-link>
			</div>
		</div>
	</div>
</template>
<script>
import ItemDetails from "~/components/partials/quote/ItemDetails.vue"
import productsMixin from "~/mixins/catalog/products.js";
export default {
  name: "Minicart",
  components: {
    ItemDetails
  },
  data(){
	return {
		lastElement: 0
	}
  },
  mounted(){
	  if(this.cart.items){
		this.lastElement = this.cart.items.length-1
	  }
  },
  mixins: [productsMixin],
  methods:{
    seeDetails(typeId) {
      if(typeId === this.configurationCode || typeId === this.bundleCode) {
        return true
      }
      return false
    },
    async showDetails(index, value) {
      if(!value) {
        await this.$store.commit('quote/updateShowDetailsOfItem', {index: index, value: true})
        return
      }
      await this.$store.commit('quote/updateShowDetailsOfItem', {index: index, value: false})
    },

	minicartItems(index) {
      let minicartItemsClass = 'minicart-items';
      if(index == this.lastElement) {
        minicartItemsClass += ' last-item'
      }
      return minicartItemsClass
    }
  },
};
</script>
