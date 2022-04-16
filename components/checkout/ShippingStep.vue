<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div id="checkoutSteps" class="opc">
    <div class="checkout-shipping-address" id="shipping">
      <ContactInfoCheckout v-if="!isLogin" :errors="emailError" @updateContactInfo="changeContactInfo" />
      <ShippingAddress :errors="shippingInfoError" @updateShippingAddressInfo="chnageShippingAddressInfo" @submitShippingAddress="submitShippingAddress"
      @submitShippingAddressById="submitShippingAddressById" />
    </div>
    <ShippingMethod :errors="shippingMethodError" @nextStep="nextStep" @selectShippingMethod="selectShippingMethod" />
  </div>
</template>
<script>
import ShippingMethod from "~/components/checkout/ShippingMethod.vue";
import ShippingAddress from "~/components/checkout/ShippingAddress.vue";
import ContactInfoCheckout from "~/components/checkout/ContactInfoCheckout.vue";

import quote from "~/mixins/quote.js";
import customerAuth from "~/mixins/customer/auth.js";

export default {
  name: "ShippingStep",
  mixins: [quote, customerAuth],
  components: {
    ShippingMethod,
    ShippingAddress,
    ContactInfoCheckout
  },
  data(){
    return {
      // Contact Info
      email: '',
      emailError: null,

      // Shipping Info
      shippingInfo :{
        firstname: '',
        lastname: '',
        street1: '',
        street2: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phoneNumber: ''
      },

      shippingInfoError: {
        firstname: null,
        lastname: null,
        street1: null,
        city: null,
        zipcode: null,
        phoneNumber: null
      },

      shippingMethod :{},
      shippingMethodError: null
    }
  },

  methods:{
    changeContactInfo(data) {
      this.email = data
    },

    chnageShippingAddressInfo(data) {
      this.shippingInfo =data
    },

    selectShippingMethod(data) {
      this.shippingMethod = data
    },

    async submitShippingAddressById(addressId){
      await this.addShippingAddress({
          shippingAddresses:[
            {
              customer_address_id: addressId
            }
          ]
        })
    },

    async submitShippingAddress() {
      if(this.checkShippingAddressValidation()){
        await this.addShippingAddress({
          shippingAddresses:[
            {
              address:{
                firstname: this.shippingInfo.firstname,
                lastname: this.shippingInfo.lastname,
                street: [
                  this.shippingInfo.street1,
                  this.shippingInfo.street2
                ],
                postcode: this.shippingInfo.zipcode,
                city: this.shippingInfo.city,
                region: this.shippingInfo.state,
                region_id: this.getRegionId(this.shippingInfo.state),
                telephone: this.shippingInfo.phoneNumber,
                country_code: this.shippingInfo.country,
                save_in_address_book: true
              }
            }
          ]
        })
      }
    },

    async nextStep() {
      let self = this

      if(this.checkShippingMethodValidation()){
        await this.addShippingMethod(this.shippingMethod)
        await this.paymentStepShow()
      }
    },

    validationShippingStep() {
      this.resetError()
      let validation = false

      if(this.checkEmailValidation()
        && this.checkShippingAddressValidation()
        && this.checkShippingMethodValidation()
      ){
        validation = true
      }
      return validation
    },

    checkEmailValidation() {
      this.emailError =null
      let validation = true

      if(!this.isLogin) {
        if(this.email == ""){
          this.emailError = 'Email address must be required.'
          validation =  false
        }else if(!this.validEmail(this.email)){
          this.emailError = 'Email address is not valid.'
          validation =  false
        }
      }

      return validation
    },

    checkShippingAddressValidation() {
      this.shippingInfoError={
        firstname: null,
        lastname: null,
        street1: null,
        city: null,
        zipcode: null,
        phoneNumber: null
      }
      let validation = true

      if(this.shippingInfo.firstname === ""){
        this.shippingInfoError.firstname = 'Firstname must be required.'
        validation =  false
      }

      if(this.shippingInfo.lastname === ""){
        this.shippingInfoError.lastname = 'Lastname must be required.'
        validation =  false
      }

      if(this.shippingInfo.street1 === ""){
        this.shippingInfoError.street1 = 'Street must be required.'
        validation =  false
      }

      if(this.shippingInfo.city === ""){
        this.shippingInfoError.city = 'City must be required.'
        validation =  false
      }

      if(this.shippingInfo.zipcode === ""){
        this.shippingInfoError.zipcode = 'Zipcode must be required.'
        validation =  false
      }else if(!this.is_numeric(this.shippingInfo.zipcode)){
        this.shippingInfoError.zipcode = 'Zipcode is not valid.'
        validation =  false
      }

      if(this.shippingInfo.phoneNumber === ""){
        this.shippingInfoError.phoneNumber = 'Phone number must be required.'
        validation =  false
      }else if(!this.isPhoneNumber(this.shippingInfo.phoneNumber)){
        this.shippingInfoError.phoneNumber = 'Phone number is not valid.'
        validation =  false
      }

      return validation
    },

    checkShippingMethodValidation() {
      this.shippingMethodError= null
      let validation = true
      if(Object.keys(this.shippingMethod).length < 1){
        this.shippingMethodError = 'Shipping method must be select.'
        validation =  false
      }
      return validation
    }
  }
};
</script>
