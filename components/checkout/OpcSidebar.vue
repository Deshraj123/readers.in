<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
	<div class="block-summary" v-if="!steps.thank_you">
		<div class="summry-heading heading">
			<a v-b-toggle href="#sidebar-collapse" @click.prevent> <h3 class="checkout-title title">Summary</h3></a>
		</div>
		<b-collapse id="sidebar-collapse">
			<div>
				<div class="block items-in-cart">
					<div class="content minicart-items" v-if="cart.items.length > 0">
						<div class="product-items" v-for="(item, index) in cart.items" :key="index">
							<div class="product-image-container">
								<span>
                  <nuxt-link :to="'/'+item.product.url_key">
										<!-- <img
                      :src="getCloudinaryUrl(removeCacheUrl(item.product.image.url), 100, 100)"
                      :alt="item.product.image.label"
                      :width="100"
                      :height="100"
                    /> -->
					<img
                      :src="item.product.image.url"
                      :alt="item.product.image.label"
                      :width="100"
                      :height="100"
                    />
                  </nuxt-link>
                </span>
							</div>
							<div class="product-item-details">
								<div class="product-item-inner">
									<div class="product-item-name">
										<span class="product-name">{{ item.product.name }}</span>
									</div>
									<div class="product options opc-product-details" v-if="item.show_details">
										<div v-b-toggle.opc-pro-detail class="option-title">
											See details
											<i class="fal fa-chevron-down drop-arrow"></i>
										</div>
										<b-collapse class="pro-option-contents" id="opc-pro-detail">
											<table>
												<tbody>
													<tr>
														<td class="label">Color:</td>
														<td class="values">Yellow</td>
													</tr>
													<tr>
														<td class="label">Size:</td>
														<td class="values">Small</td>
													</tr>
													<tr>
														<td class="label">Case:</td>
														<td class="values">Apsara , Staedtler</td>
													</tr>
													<tr>
														<td class="label">Options:</td>
														<td class="values">Modern</td>
													</tr>
												</tbody>
											</table>
										</b-collapse>
									</div>
									<div class="item-detail">
										<div class="product-price">
											<label class="item-label">Price:</label>
											<span class="price">{{ setFormatPrice(item.prices.row_total_including_tax.value) }}</span>
										</div>
										<div class="product-quantity">
											<label class="item-label">Qty:</label>
											<span class="qty">{{ item.quantity }}</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<table class="items-information items-totals  border-line">
						<tbody>
							<tr class="subtotal-tr">
								<th class="subtotal">
									<span class="product-label">Subtotal</span>
								</th>
								<td class="amount item-price">
									<span class="price">{{ setFormatPrice(cart.prices.subtotal_including_tax.value) }}</span>
								</td>
							</tr>
							<tr
                class="pro-shipping-tr"
                v-if="cart.shipping_addresses.length > 0
                && cart.shipping_addresses[0].selected_shipping_method != null"
              >
								<th class="pro-shipping-th">
									<div class="product-shipping">
										<span class="product-label shipping-txt">Shipping</span>
										<span class="shipping-carrier">
                      {{ cart.shipping_addresses[0].selected_shipping_method.carrier_title}}
                      -
                      {{ cart.shipping_addresses[0].selected_shipping_method.method_title}}
                    </span>
									</div>
								</th>
								<td class="amount item-price">
									<span class="price">{{ setFormatPrice(cart.shipping_addresses[0].selected_shipping_method.amount.value) }}</span>
								</td>
							</tr>
							<tr class="tax-tr" v-if="cart.prices.applied_taxes.length > 0">
								<th class="tax-th">
									<span class="product-label tax-label">Tax</span>
								</th>
								<td class="tax-price item-price">
									<span class="price tax-price">{{ setFormatPrice(cart.prices.applied_taxes[0].amount.value) }}</span>
								</td>
							</tr>
						</tbody>
					</table>
					<div class="product-modify-cart border-line product-row">
						<nuxt-link :to="'/cart'" class="modify-cart">
							<span class="product-label">Modify Cart</span>
						</nuxt-link>
						<div class="product-meta-info">
							<span class="info-text">* prices are inclusive of all taxes</span>
						</div>
					</div>
					<div class="opc-payment-additional">
						<div class="payment-option-title field choice">
							<div class="action action-toggle" v-b-toggle.discount-collapse>
								<span class="sub-title d-block">Apply Discount Code</span>
							</div>
						</div>
						<!-- <b-collapse id="discount-collapse"> -->
							<div class="payment-option-content">
								<div class="messages" data-role="checkout-messages"></div>
								<form class="form form-discount" id="discount-form">
									<div class="payment-option-inner">
										<b-collapse id="discount-collapse">
										<div class="field form-group">
											<label for="discount-code" class="hide-element">Enter discount code</label>
											<div class="control input-control w-100">
												<input
													type="text"
													name="discount_code"
													id="discount-code"
													class="input-text"
													placeholder="Enter discount code" v-model="coupanCode"/>
											</div>
										  <div class="primary">
											 <button type="button" class="action  discount-apply" @click="applyCodeCoupan()">Apply</button>
											</div>
										</div>
										</b-collapse>

										<div class="error-bg" v-if="coupanCodeError!=null">
										{{ coupanCodeError }}
										</div>
										<div class="error-bg" v-if="applyCoupanCodeError!=null">
										{{ applyCoupanCodeError }}
										</div>
									</div>
								</form>
							</div>
						<!-- </b-collapse> -->
					</div>
					<div class="product-order-total product-row">
						<div class="oreder-label">
							<span class="order-text">Order Total</span>
						</div>
						<div class="order-amount">
							<span class="price">{{ setFormatPrice(cart.prices.grand_total.value) }}</span>
						</div>
					</div>
					<div class="block-shipping-information">
						<div class="shipping-information">
							<div class="ship-to" v-if="cart.shipping_addresses.length > 0">
								<div class="top-content d-flex justify-content-between">
									<h3 class="step-title">Ship To:</h3>
									<button type="button" class="action action-edit" @click="showShippingStep()">
                    <i class="fal fa-cog cog-icon"></i><span class="hide-element">cog-icon</span>
                  </button>
								</div>
								<div class="billing-address-details">
									<p class="desc" v-html="getShippingAddressAsHtml()"></p>
									<a :href="'tel:'+cart.shipping_addresses[0].telephone" class="link mno-link">
                    <span>{{ cart.shipping_addresses[0].telephone }}</span>
                  </a>
								</div>
							</div>
							<div
                class="ship-via"
                v-if="cart.shipping_addresses.length > 0
                && cart.shipping_addresses[0].selected_shipping_method != null"
              >
								<div class="top-content d-flex justify-content-between">
									<h3 class="step-title">Shipping Method:</h3>
									<button type="button" class="action action-edit" @click="showShippingStep()">
                    <i class="fal fa-cog cog-icon"></i><span class="hide-element">cog-icon</span>
                  </button>
								</div>
								<div class="billing-details-content">
									<p class="desc">
                    {{ cart.shipping_addresses[0].selected_shipping_method.carrier_title}}
                      -
                    {{ cart.shipping_addresses[0].selected_shipping_method.method_title}}
                  </p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</b-collapse>
	</div>
</template>
<script>
import quote from "~/mixins/quote.js";
export default {
  name: "OpcSidebar",
  mixins: [quote],
  methods:{
    getShippingAddressAsHtml() {
      let that = this
      let address = ''
      let html = ''
      let _cart = JSON.parse(JSON.stringify(that.cart));
      if(_cart.shipping_addresses.length > 0) {
        _cart.shipping_addresses.forEach(function(data){
          address = data
        })

        html+=address.firstname+' '+address.lastname+'<br/>'
        address.street.forEach(function(street){
          html+=street+', '
        })
        html+='<br/>'+address.city+', '+address.postcode+'<br/>'

        html+=address.region.label+', '+address.country.label+'<br/>'
      }

      return html
    }
  }
};
</script>
