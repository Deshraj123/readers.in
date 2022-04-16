<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <form action="" class="form-shipping-address">
    <div class="shipping-address shipping-new-address-form">
      <h3 class="step-title">Shipping Address</h3>
      <div class="shipping-address-content" v-if="!isCustomerAddresses">
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
              v-model="shippingInfo.firstname"
              @keyup="updateShippingAddressInfo()"/>
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
              v-model="shippingInfo.lastname"
              @keyup="updateShippingAddressInfo()"/>
            <span class="error" v-if="errors.lastname!=null">
                {{errors.lastname}}
              </span>
          </div>

        </div>

        <div class="form-group">
          <label for="address1" class="hide-element">address</label>
          <input
            id="address1"
            class="input-text"
            type="text"
            name="address"
            placeholder="Street Address *"
            required
            v-model="shippingInfo.street1"
            @keyup="updateShippingAddressInfo()"/>
          <span class="error" v-if="errors.street1!=null">
            {{errors.street1}}
          </span>
        </div>
        <div class="form-group field additional">
          <label for="address2" class="hide-element">address2</label>
          <input
            id="address2"
            class="input-text"
            type="text"
            name="address"
            placeholder="Street Address"
            v-model="shippingInfo.street2"
            @keyup="updateShippingAddressInfo()"
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
              v-model="shippingInfo.city"
              @keyup="updateShippingAddressInfo()"/>
              <span class="error" v-if="errors.city!=null">
                {{ errors.city }}
              </span>
          </div>


          <div class="form-group select-label last-item" v-if="regions.length > 0">
            <label for="state"  class="hide-element label">state</label>
            <select
              name="state"
              id="state"
              class="input-text"
              v-model="shippingInfo.state"
              @change="updateShippingAddressInfo()"
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
              v-model="shippingInfo.zipcode"
              @keyup="updateShippingAddressInfo()" />
              <span class="error" v-if="errors.zipcode!=null">
                {{ errors.zipcode }}
              </span>
          </div>
          <div class="form-group select-label last-item" v-if="countries.length > 0">
            <label for="country"  class="hide-element label">country</label>
            <select
              name="country"
              id="country"
              class="input-text"
              v-model="shippingInfo.country"
              @change="updateShippingAddressInfo()"
            >
              <option v-for="(country, index) in countries" :key="index" :value="country.id">
                {{ country.full_name_english }}
              </option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label for="telephone"  class="hide-element label">telephone</label>
          <input
            id="telephone"
            class="input-text"
            type="number"
            name="telephone"
            placeholder="Phone Number*"
            required
            v-model="shippingInfo.phoneNumber"
            @keyup="updateShippingAddressInfo()"
          />
          <span class="error" v-if="errors.phoneNumber!=null">
            {{ errors.phoneNumber }}
          </span>

          <div class="field-tooltip toggle">
            <div class="custom-tooltip">
              <span
                v-b-tooltip.hover
                title="We'll send your order confirmation here."
              >
                <i class="fal fa-question-circle"></i><span class="hide-element">question-circle-icon</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="checkout-shipping-address-section" v-if="isCustomerAddresses">
        <div class="field addresses" id="field-container">
          <div class="shipping-address-items">
            <div v-for="(address, index) in customerAddresses" :key="index">
              <div class="shipping-address-item" v-bind:class="{ active:  active_el == index  }" :id="'shipping-address-'+index">
                <div class="check-mark" v-if="active_el == index"><i class="fal fa-check-circle"></i></div>
                {{address.firstname}} {{address.lastname}}<br />
                {{address.street.toString()}}<br />
                {{address.city}}, {{address.region.region}} {{address.postcode}}<br />
                {{address.country_code}}<br />
                <a href="tel:1234567890">{{address.telephone}}</a>
                <div class="action-toolbar d-flex justify-content-between align-items-center button-section">
                  <button type="button" class="action select-shipping-item" @click="clickShipHereBtn(address.id, index)">
                    <span>Ship Here</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="action-toolbar add-new-address-btn">
            <button type="button" class="action action-show-popup" @click="clickAddressFormBtn()">
              <span>+</span> New Address
            </button>
          </div>
        </div>
      </div>

      <div class="primary text-right" v-if="!isCustomerAddresses">
        <button type="button" class="action checkout-next" @click="clickAddressFormBtn()">Close</button>
        <button type="button" class="action checkout-next" @click="submitShippingAddress()">Save And Continue</button>
      </div>
      <div class="primary text-right" v-if="isCustomerAddresses">
        <button type="button" class="action checkout-next" @click="submitShippingAddressById()">Continue</button>
      </div>
    </div>
  </form>
</template>
<script>
import quote from "~/mixins/quote.js";
import customerIndexMixin from "~/mixins/customer/index.js"
export default {
  name: "ShippingAddress",
  props: ['errors'],
  mixins: [quote, customerIndexMixin],
  data(){
    return {
      shippingInfo :{
        firstname: '',
        lastname: '',
        street1: '',
        street2: '',
        city: '',
        state: 'GJ',
        zipcode: '',
        country: 'IN',
        phoneNumber: ''
      },

      customerAddresses: '',
      selectedAddressId: '',
      isCustomerAddresses: false,
      active_el: ''
    }
  },
  mounted(){
    let that = this

    let _customer = JSON.parse(JSON.stringify(that.customer));
    if(_customer.addresses.length > 0){
      that.customerAddresses = _customer.addresses
      that.isCustomerAddresses = true
      let i=0
      _customer.addresses.forEach(function(address){
        if(address.default_shipping){
          that.selectedAddressId = address.id
          that.active_el = i
        }
        i = i + 1
      })
      if(that.selectedAddressId == ''){
        that.selectedAddressId = that.customerAddresses[0].id
        that.active_el = 0
      }
    }


    let _cart = JSON.parse(JSON.stringify(that.cart));
    if(_cart.shipping_addresses.length > 0) {
      _cart.shipping_addresses.forEach(function(address){
        // that.shippingInfo={
        //   firstname: address.firstname,
        //   lastname: address.lastname,
        //   street1: address.street[0],
        //   city: address.city,
        //   state:  address.region.code,
        //   zipcode: address.postcode,
        //   country: address.country.code,
        //   phoneNumber: address.telephone,
        // }
        // if(address.street[1]) {
        //   that.shippingInfo.street2 = address.street[1]
        // }
      })
      
    }
    that.$emit('updateShippingAddressInfo', that.shippingInfo)

    // Set Regions
    that.$store.commit('others/directory/setRegions', [])
    let countryLength = setInterval(function(){
      if(that.countries.length > 0) {
        clearInterval(countryLength);
        that.countries.forEach(function(country){
          if(country.id == that.shippingInfo.country) {
            that.$store.commit('others/directory/setRegions', country.available_regions)
          }
        })
      }
    })
  },
  methods:{
    updateShippingAddressInfo() {
      this.$emit('updateShippingAddressInfo', this.shippingInfo)
    },

    submitShippingAddress() {
      this.$emit('submitShippingAddress', this.shippingInfo)
    },

    clickAddressFormBtn() {
      this.isCustomerAddresses = !this.isCustomerAddresses
    },
    clickShipHereBtn(value, index) {
      this.selectedAddressId = value
      this.active_el = index;
    },
    submitShippingAddressById() {
      this.$emit('submitShippingAddressById', this.selectedAddressId)
    },
  }
};

</script>
