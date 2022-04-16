<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="myaddbook-right-section myac-right-section">
    <div class="page-title-wrapper">
      <h1 class="page-title">
        <span>Edit Address</span>
      </h1>
    </div>
    <div class="myaddbook-container">
      <form class="add_new_add-form quotetion-form">
        <span class="success-bg" v-if="addressSuccess!=null">{{ addressSuccess }}</span>
        <span class="error-bg" v-if="addressError!=null">{{ addressError }}</span>
      <div class="edit-add-main left-right-section-main">
        <div class="left-section-form contactinfo-left-section">
          <div class="contact-block-title">
            <span class="title">Contact Information</span>
          </div>
          <div class="input-group input-group-fname">
            <label for="fname" class="label fname-label">First Name</label>
            <div class="control">
              <input
                type="text"
                class="input-text input-fname"
                id="fname"
                name="text"
                v-model="firstname"
              />
              <span class="error" v-if="errors.firstname!=null">
                {{errors.firstname}}
              </span>
            </div>
          </div>
          <div class="input-group input-group-lname">
            <label for="lname" class="label lname-label">Last Name</label>
            <div class="control">
              <input
                type="text"
                class="input-text input-lname"
                id="lname"
                name="lname"
                v-model="lastname"
              />
              <span class="error" v-if="errors.lastname!=null">
                {{errors.lastname}}
              </span>
            </div>
          </div>
          <div class="input-group input-group-phone">
            <label for="tnumber" class="label tnumber-label">
              Phone Number
            </label>
            <div class="control">
              <input
                type="text"
                class="input-text input-tnumber"
                id="tnumber"
                name="tnumber"
                v-model="phoneNumber"
              />
              <span class="error" v-if="errors.phoneNumber!=null">
                {{errors.phoneNumber}}
              </span>
            </div>
          </div>
          <div class="State-province-dropdown dropdown-box">
            <label for="state" class="country-label label">Default Shipping </label>
            <div class="dropdown-control">
              <select name="regions" class="select-dropdown" v-model="defaultShipping" @change="onChangeDefaultShipping">
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
          </div>
           <div class="State-province-dropdown dropdown-box">
            <label for="state" class="country-label label"> Default Billing </label>
            <div class="dropdown-control">
              <select name="regions" class="select-dropdown" v-model="defaultBilling" @change="onChangeDefaultBilling">
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
          </div>
        </div>
        <div class="right-section-form address-right-section">
          <div class="add-block-title">
            <span class="title">Address</span>
          </div>
          <div class="input-group input-group-add">
            <label for="address" class="label add-label">Street 1</label>
            <div class="control address-control">
              <input
                type="text"
                class="input-text input-add"
                id="address1"
                name="text"
                v-model="street1"
              />
              <span class="error" v-if="errors.street1!=null">
                {{errors.street1}}
              </span>
            </div>
          </div>
          <div class="input-group input-group-add">
            <label for="address" class="label add-label">Street 2</label>
            <div class="control address-control">
              <input
                type="text"
                class="input-text input-add"
                id="address2"
                name="text"
                v-model="street2"
              />
            </div>
          </div>
          <div class="input-group input-group-add">
            <label for="city" class="label add-label">City</label>
            <div class="control address-control">
              <input
                id="city"
                class="input-text"
                type="text"
                name="city"
                placeholder="City *"
                required
                v-model="city"
              />
              <span class="error" v-if="errors.city!=null">
                {{errors.city}}
              </span>
            </div>
          </div>
          <div class="country-dropdown dropdown-box" v-if="countries.length > 0">
            <label for="country" class="country-label label">Country</label>
            <div class="dropdown-control">
              <select
                id="country"
                name="country"
                class="select-dropdown"
                v-model="country"
              >
                <option v-for="(country, index) in countries" :key="index" :value="country.id">
                  {{ country.full_name_english }}
                </option>
              </select>
            </div>
          </div>
          <div class="State-province-dropdown dropdown-box" v-if="regions.length > 0">
            <label for="state" class="country-label label"> State/Province </label>
            <div class="dropdown-control">
              <select name="regions" class="select-dropdown" v-model="state" id="state" @change="onChangeState">
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
          <div class="input-group input-group-zip-code">
            <label for="zcode" class="label zcode-label">Zip/Postal Code</label>
            <div class="control">
              <input
                type="text"
                class="input-text input-zcode"
                id="zcode"
                name="zipcode"
                v-model="zipcode"
              />
              <span class="error" v-if="errors.zipcode!=null">
                {{errors.zipcode}}
              </span>
            </div>
          </div>
        </div>
      </div>
        <div class="form-action editadd-submit ">
         <nuxt-link to="/customer/address"  class="back">Back</nuxt-link>
          <button type="button" class="submit" @click="saveAddress()">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import quoteMixin from "~/mixins/quote.js";
import customerMixin from "~/mixins/customer/index.js";
export default {
  name: "EditAddress",
  props: ['selectedAddress'],
  mixins: [quoteMixin, customerMixin],
  data(){
    return {
      firstname: '',
      lastname: '',
      street1: '',
      street2: '',
      city: '',
      state: 'GJ',
      zipcode: '',
      country: 'IN',
      phoneNumber: '',
      defaultBilling: '1',
      defaultShipping: '1',

      errors:{
        firstname: null,
        lastname: null,
        street1: null,
        city: null,
        zipcode: null,
        phoneNumber: null
      }
    }
  },
  async mounted() {
    let that = this

    if(Object.keys(that.selectedAddress).length > 0){
      that.firstname = that.selectedAddress.firstname
      that.lastname = that.selectedAddress.lastname
      that.street1 = that.selectedAddress.street[0]
      that.city = that.selectedAddress.city
      that.state = that.selectedAddress.region.region_code
      that.zipcode = that.selectedAddress.postcode
      that.country = that.selectedAddress.country_code
      that.phoneNumber = that.selectedAddress.telephone

      that.defaultShipping = '0'
      if(that.selectedAddress.default_shipping){
        that.defaultShipping = '1'
      }

      that.defaultBilling = '0'
      if(that.selectedAddress.default_billing){
        that.defaultBilling = '1'
      }

      if(that.selectedAddress.street[1]) {
        that.street2 = that.selectedAddress.street[1]
      }
    }

    let countryLength = setInterval(function(){
      if(that.countries.length > 0) {
        clearInterval(countryLength);
        that.setRegions()
      }
    }, 3000);
  },

  methods:{
    setRegions() {
      let that = this
      that.$store.commit('others/directory/setRegions', [])
      if(that.countries.length > 0) {
        that.countries.forEach(function(country){
          if(country.id == that.country) {
            that.$store.commit('others/directory/setRegions', country.available_regions)
          }
        })
      }
    },

    resetErrors() {
      this.errors={
        firstname: null,
        lastname: null,
        street1: null,
        city: null,
        zipcode: null,
        phoneNumber: null
      }
    },

    checkValidation() {
      this.resetErrors()
      let validation = true

      if(this.firstname === ""){
        this.errors.firstname = 'Firstname must be required.'
        validation =  false
      }

      if(this.lastname === ""){
        this.errors.lastname = 'Lastname must be required.'
        validation =  false
      }

      if(this.street1 === ""){
        this.errors.street1 = 'Street must be required.'
        validation =  false
      }

      if(this.city === ""){
        this.errors.city = 'City must be required.'
        validation =  false
      }

      if(this.zipcode === ""){
        this.errors.zipcode = 'Zipcode must be required.'
        validation =  false
      }else if(!this.is_numeric(this.zipcode)){
        this.errors.zipcode = 'Zipcode is not valid.'
        validation =  false
      }

      if(this.phoneNumber === ""){
        this.errors.phoneNumber = 'Phone number must be required.'
        validation =  false
      }else if(!this.isPhoneNumber(this.phoneNumber)){
        this.errors.phoneNumber = 'Phone number is not valid.'
        validation =  false
      }

      return validation
    },

    async saveAddress() {
      if(this.checkValidation()){
        if(Object.keys(this.selectedAddress).length > 0) {
          await this.updateAddress()
        }else{
          await this.createAddress()
        }
        await this.$router.push({ path: "/customer/address" })
      }
    },

    async createAddress() {

      let defaultBilling = true
      let defaultShipping = true
      if(this.defaultBilling == '0'){ defaultBilling = false }
      if(this.defaultShipping == '0'){ defaultShipping = false }

      let payload= {
        customerAddressInput: {
          firstname: this.firstname,
          lastname: this.lastname,
          street: [
            this.street1,
            this.street2
          ],
          postcode: this.zipcode,
          city: this.city,
          region: {
            region_code: this.state,
            region_id: this.getRegionId(this.state),
          },
          telephone: this.phoneNumber,
          country_code: this.country,
          default_billing:defaultBilling,
          default_shipping:defaultShipping
        }
      }

      await this.createCustomerAddress(payload)
    },

    async updateAddress() {

      let defaultBilling = true
      let defaultShipping = true
      if(this.defaultBilling == '0'){ defaultBilling = false }
      if(this.defaultShipping == '0'){ defaultShipping = false }

      let payload = {
        id: this.selectedAddress.id,
        customerAddressInput: {
          firstname: this.firstname,
          lastname: this.lastname,
          street: [
            this.street1,
            this.street2
          ],
          postcode: this.zipcode,
          city: this.city,
          region: {
            region_code: this.state,
            region_id: this.getRegionId(this.state),
          },
          telephone: this.phoneNumber,
          country_code: this.country,
          default_billing:defaultBilling,
          default_shipping:defaultShipping
        }
      }
      await this.updateCustomerAddress(payload)
    },

    onChangeDefaultShipping(event) {
      this.defaultShipping = event.target.value
    },
    onChangeDefaultBilling(event) {
      this.defaultBilling = event.target.value
    },
    onChangeState(event) {
      this.state = event.target.value
    }
  }
};
</script>
