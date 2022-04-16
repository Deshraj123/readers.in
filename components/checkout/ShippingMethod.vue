<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
	<div class="shipping-method" id="opc-shipping_method">
		<div class="shipping-method-col d-flex justify-content-between w-100 align-items-center">
			<h3 class="step-title">Shipping Methods</h3>
			<div class="policy-link">
				<a href="/shippingpolicy" title="Shipping Policy" target="_blank">
          See our shipping policy
				</a>
			</div>
		</div>
		<div id="checkout-step-shipping_method" class="step-content" v-if="availableShippingMethods.length > 0">
      <span class="error" v-if="errors!=null">{{errors}}</span>
			<form class="form methods-shipping">
				<div id="checkout-shipping-method-load" class="checkout-shipping-method-load">
					<table class="table-checkout-shipping-method table" style="width:100%">
						<tbody>
							<tr
                class="row"
                v-for="(method, index) in availableShippingMethods"
                :key="index"
                @click="selectShippingMethod(method)"
              >
								<td class="col col-methods">
									<div class="method">
										<input
                      type="radio"
                      :id="method.carrier_code"
                      name="shipping-method"
                      class="input-radio"
                      :checked="method.carrier_code === selectedShippingMethod.carrier_code"
                    />
										<label :for="method.carrier_code" class="price-text">
                      {{ setFormatPrice(method.amount.value) }}
                    </label>
									</div>
								</td>
								<td class="col col-method">{{ method.method_title }}</td>
								<td class="col col-carrier">{{ method.carrier_title }}</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div class="primary text-right">
					<button type="button" class="action checkout-next" @click="next()">Next</button>
				</div>
			</form>
		</div>
    <NotFoundData v-else text="Sorry, no quotes are available for this order at this time."/>
	</div>
</template>
<script>
import NotFoundData from "~/components/partials/NotFoundData.vue";
import quote from "~/mixins/quote.js";
export default {
  name: "ShippingMethod",
  mixins: [quote],
  props: ['errors'],
  components: {
    NotFoundData
  },
  data(){
    return {
      selectedShippingMethod: {
        carrier_code: null
      }
    }
  },
  mounted() {
    let that = this
    let _cart = JSON.parse(JSON.stringify(that.cart));
    if(_cart.shipping_addresses.length > 0) {
      _cart.shipping_addresses.forEach(function(address){
        if(address.selected_shipping_method != null){
          that.$emit('selectShippingMethod', address.selected_shipping_method)
          that.selectedShippingMethod = address.selected_shipping_method
        }
      })
    }
  },
  methods: {
    next() {
      this.$emit('nextStep', {})
    },
    selectShippingMethod(method){
      this.$emit('selectShippingMethod', method)
    }
  }
};
</script>
