<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="checkout-payment-method" id="payment">
    <div class="step-content" id="checkout-step-payment ">
      <form action="" id="co-payment-form" class="form payments">
        <div class="opc-payment" id="checkout-payment-method-load">
          <div class="items payment-methods">
            <div class="payment-group">
              <div class="step-title">Billing Address</div>
              <div class="payment-method">
                <BillingAddress
                  :sameAsShipping="sameAsShippingAddress"
                  :errors="billingInfoError"
                  @updateBillingAddressInfo="updateBillingAddressInfo"
                  @updateBillingAddress="updateBillingAddress"
                  @updateSameAsShipping="updateSameAsShipping"
                />
              </div>
              <div class="step-title">Payment Method</div>
              <PaymentMethods v-if="cart.available_payment_methods.length > 0"/>
              <div v-else>
                We havn't nay payment methods.
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import BillingAddress from "~/components/checkout/BillingAddress.vue";
import PaymentMethods from "~/components/checkout/PaymentMethods.vue";
import quote from "~/mixins/quote.js";
export default {
  name: "PaymentStep",
  mixins: [quote],
  components: {
    BillingAddress,
    PaymentMethods
  },

  data(){
    return {

      sameAsShippingAddress: true,

      // Shipping Info
      billingInfo :{
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

      billingInfoError: {
        firstname: null,
        lastname: null,
        street1: null,
        city: null,
        zipcode: null,
        phoneNumber: null
      },
    }
  },

  methods:{
    updateBillingAddressInfo(data){
      this.billingInfo = data
    },

    updateSameAsShipping(value) {
      this.sameAsShippingAddress = value
      if(value) {
        this.sameAsShipping()
      }
    },

    resetBillingError() {
      this.billingInfoError={
        firstname: null,
        lastname: null,
        street1: null,
        city: null,
        zipcode: null,
        phoneNumber: null
      }
    },

    validationBillingAddress() {
      this.resetBillingError()
      let validation = true

      if(this.billingInfo.firstname === ""){
        this.billingInfoError.firstname = 'Firstname must be required.'
        validation =  false
      }

      if(this.billingInfo.lastname === ""){
        this.billingInfoError.lastname = 'Lastname must be required.'
        validation =  false
      }

      if(this.billingInfo.street1 === ""){
        this.billingInfoError.street1 = 'Street must be required.'
        validation =  false
      }

      if(this.billingInfo.city === ""){
        this.billingInfoError.city = 'City must be required.'
        validation =  false
      }

      if(this.billingInfo.zipcode === ""){
        this.billingInfoError.zipcode = 'Zipcode must be required.'
        validation =  false
      }else if(!this.is_numeric(this.billingInfo.zipcode)){
        this.billingInfoError.zipcode = 'Zipcode is not valid.'
        validation =  false
      }

      if(this.billingInfo.phoneNumber === ""){
        this.billingInfoError.phoneNumber = 'Phone number must be required.'
        validation =  false
      }else if(!this.isPhoneNumber(this.billingInfo.phoneNumber)){
        this.billingInfoError.phoneNumber = 'Phone number is not valid.'
        validation =  false
      }

      return validation
    },

    async updateBillingAddress() {
      if(this.validationBillingAddress()){
        await this.addBillingAddress({
          billingAddresses:{
            address:{
              firstname: this.billingInfo.firstname,
              lastname: this.billingInfo.lastname,
              street: [
                this.billingInfo.street1,
                this.billingInfo.street2
              ],
              postcode: this.billingInfo.zipcode,
              city: this.billingInfo.city,
              region: this.billingInfo.state,
              region_id: this.getRegionId(this.billingInfo.state),
              telephone: this.billingInfo.phoneNumber,
              country_code: this.billingInfo.country,
              save_in_address_book: true
            }
          }
        })
      }
    },

    async sameAsShipping() {
      console.log('sameAsShipping')
      let that = this
      let address = {}
      let street2 = ''
      let _cart = JSON.parse(JSON.stringify(that.cart));
      if(_cart.shipping_addresses.length > 0) {
          _cart.shipping_addresses.forEach(function(data){
            address = data
          })
        }
      if(address.street[1]) {
        street2= address.street[1]
      }

      console.log(address)

      await this.addBillingAddress({
          billingAddresses:{
            address:{
              firstname: address.firstname,
              lastname: address.lastname,
              street: [
                address.street[0],
                street2
              ],
              postcode: address.postcode,
              city: address.city,
              region: address.region.code,
              region_id: parseInt(this.getRegionId(address.region.code)),
              telephone: address.telephone,
              country_code: address.country.code,
              save_in_address_book: true
            }
          }
        })
    }
  }
};
</script>
