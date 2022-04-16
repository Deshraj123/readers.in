<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
	<div class="payment-method-content billing-address-content">
		<div class="messages" data-role="checkout-messages"></div>
		<div class="payment-method-billing-address">
      <span class="error" v-if="billingAddressError!=null">{{ billingAddressError }}</span>
      <span class="success-bg d-flex " v-if="billingAddressSuccess!=null">{{ billingAddressSuccess }}</span>
			<div class="billing-address-same-as-shipping-block field choice mt-3">
				<input
					type="checkbox"
					name="billing-address-same-as-shipping"
					id="billing-address-same-as-shipping-banktransfer1"
					value="banktransfer"
					class="checkbox"
          :checked="sameAsShipping"
          @click="updateSameAsShipping($event)"
				/>
				<label for="billing-address-same-as-shipping-banktransfer1" class="label">
          My billing and shipping address are the same
        </label>
			</div>
			<div class="billing-address-details" v-if="sameAsShipping" v-html="getBillingAddressAsHtml()" />
		</div>
		<div class="payment-billing-add pl-30" v-if="!sameAsShipping">
      <div class="input-2-col">
        <div class="form-group">
          <label for="fname" class="hide-element">First Name</label>
          <input
           id="fname"
            class="input-text"
            type="text"
            name="first name"
            placeholder="First Name *"
            required
            v-model="billingInfo.firstname"
            @keyup="updateBillingAddressInfo()"/>
            <span class="error" v-if="errors.firstname!=null">
            {{errors.firstname}}
          </span>
        </div>

        <div class="form-group last-item">
          <label for="lname" class="hide-element">last Name</label>
          <input
            id="lname"
            class="input-text"
            type="text"
            name="first name"
            placeholder="Last Name *"
            required
            v-model="billingInfo.lastname"
            @keyup="updateBillingAddressInfo()" />
            <span class="error" v-if="errors.lastname!=null">
              {{errors.lastname}}
            </span>
        </div>

      </div>

      <div class="form-group">
        <label for="address" class="hide-element">address</label>
        <input
          id="address"
          class="input-text"
          type="text"
          name="add1"
          placeholder="Street Address *"
          required
          v-model="billingInfo.street1"
          @keyup="updateBillingAddressInfo()"/>
          <span class="error" v-if="errors.street1!=null">
            {{errors.street1}}
          </span>
      </div>
      <div class="form-group field additional">
        <label for="add2" class="hide-element">address2</label>
        <input
          id="add2"
          class="input-text"
          type="text"
          name="address"
          placeholder="Street Address"
          v-model="billingInfo.street2"
          @keyup="updateBillingAddressInfo()"
        />
      </div>


      <div class="input-2-col">
        <div class="form-group">
          <label for="city" class="hide-element">city</label>
          <input
            id="city"
            class="input-text"
            type="text"
            name="city"
            placeholder="City *"
            required
            v-model="billingInfo.city"
            @keyup="updateBillingAddressInfo()"/>
           <span class="error" v-if="errors.city!=null">
            {{ errors.city }}
          </span>
        </div>
        <div class="form-group select-label last-item">
          <label for="state"  class="hide-element label">state</label>
          <select
            name="state"
            id="state"
            class="input-text"
            v-if="regions.length > 0"
            v-model="billingInfo.state"
            @change="updateBillingAddressInfo()"
          >
            <option
              v-for="(state, index) in regions"
              :key="index"
              :value="state.code"
            >
              {{ state.name}}
            </option>
          </select>
        </div>
      </div>
      <div class="input-2-col">
        <div class="form-group">
          <label for="zipcode" class="hide-element">Zipcode</label>
          <input
            id="zipcode"
            class="input-text"
            type="text"
            name="postcode"
            placeholder="Zip/Postal Code *"
            required
            v-model="billingInfo.zipcode"
            @keyup="updateBillingAddressInfo()"/>
            <span class="error" v-if="errors.zipcode!=null">
              {{ errors.zipcode }}
            </span>
        </div>
        <div class="form-group select-label last-item">
          <label for="country"  class="hide-element label">country</label>
          <select
            name="country"
            id="country"
            class="input-text"
            v-if="countries.length > 0"
            v-model="billingInfo.country"
            @change="updateBillingAddressInfo()"
          >
            <option v-for="(country, index) in countries" :key="index" :value="country.id">
              {{ country.full_name_english }}
            </option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label for="m-number"  class="hide-element label">phonenumber</label>
        <input
          id="m-number"
          class="input-text"
          type="number"
          name="telephone"
          placeholder="Phone Number*"
          required
          v-model="billingInfo.phoneNumber"
          @keyup="updateBillingAddressInfo()"
        />
        <span class="error" v-if="errors.phoneNumber!=null">
          {{ errors.phoneNumber }}
        </span>
      </div>

			<div class="actions-toolbar billing-add-btns ">
				<div class="primary">
					<button
						class="action action-cancel"
						type="button"
            @click="cancelBillingAddress()"
					>
						<span data-bind="i18n: 'Cancel'">Cancel</span>
					</button>
					<button class="action action-update" type="button" @click="updateBillingAddress()">
						<span data-bind="i18n: 'Update'">Update</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import quote from "~/mixins/quote.js";
export default {
  name: "BillingAddress",
  props: ['errors', 'sameAsShipping'],
  mixins: [quote],
  data(){
    return {

      billingInfo :{
        firstname: '',
        lastname: '',
        street1: '',
        street2: '',
        city: '',
        state: 'GJ',
        zipcode: '',
        country: 'IN',
        phoneNumber: ''
      }
    }
  },

  async mounted(){
    let that = this
    await that.resetBillingValue()
    let _cart = JSON.parse(JSON.stringify(that.cart));
    if(_cart.billing_address != null) {
      that.billingInfo={
        firstname: _cart.billing_address.firstname,
        lastname: _cart.billing_address.lastname,
        street1: _cart.billing_address.street[0],
        city: _cart.billing_address.city,
        state:  _cart.billing_address.region.code,
        zipcode: _cart.billing_address.postcode,
        country: _cart.billing_address.country.code,
        phoneNumber: _cart.billing_address.telephone,
      }

      if(_cart.billing_address.street[1]) {
        that.billingInfo.street2 = _cart.billing_address.street[1]
      }

      let address = {}
      if(_cart.shipping_addresses.length > 0) {
        _cart.shipping_addresses.forEach(function(data){
          address = data
        })
      }
      

      if(
        address.firstname == _cart.billing_address.firstname
        && address.lastname == _cart.billing_address.lastname
        && address.city == _cart.billing_address.city
        && address.zipcode == _cart.billing_address.zipcode
        && address.phoneNumber == _cart.billing_address.phoneNumber
      ){
        this.cancelBillingAddress()
      }else{
        this.$emit('updateSameAsShipping', false)
      }
    }else{
      this.cancelBillingAddress()
    }
  },

  methods:{
    resetBillingValue() {
      this.billingInfo = {
        firstname: '',
        lastname: '',
        street1: '',
        street2: '',
        city: '',
        state: 'GJ',
        zipcode: '',
        country: 'IN',
        phoneNumber: ''
      }
    },
    updateBillingAddressInfo() {
      this.$emit('updateBillingAddressInfo', this.billingInfo)
    },

    updateBillingAddress() {
      this.$emit('updateBillingAddressInfo')
    },

    updateSameAsShipping(event) {
      this.$emit('updateSameAsShipping', event.target.checked)
    },

    cancelBillingAddress() {
      this.resetBillingValue()
      this.$emit('updateSameAsShipping', true)
    },

    updateBillingAddress() {
      this.$emit('updateBillingAddress', {})
    },

    getBillingAddressAsHtml() {
      let that = this
      let address = ''
      let html = ''
      let _cart = JSON.parse(JSON.stringify(that.cart));
      if(_cart.billing_address == null) {
        if(_cart.shipping_addresses.length > 0) {
          _cart.shipping_addresses.forEach(function(data){
            address = data
          })
        }
      }else{
        address = _cart.billing_address
      }

      html+=address.firstname+' '+address.lastname+'<br/>'
      address.street.forEach(function(street){
        html+=street+', '
      })
      html+='<br/>'+address.city+', '+address.postcode+'<br/>'

      html+=address.region.label+', '+address.country.label+'<br/>'

      html+=address.telephone

      return html
    }
  }
};
</script>
