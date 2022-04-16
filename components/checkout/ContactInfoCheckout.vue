<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div>
    <div class="contact-information">
      <h3 class="step-title">Contact Information</h3>
      <form>
        <fieldset id="customer-email-fieldset" class="fieldset">
          <div class="field required form-group">
            <label for="customer-email" class="hide-element">email address</label>
            <input
              class="input-text"
              type="email"
              name="emailaddress"
              id="customer-email"
              placeholder="Email address *"
              v-model="email"
              @keyup="enterEmailAddress($event)"
            />
            <span class="error" v-if="errors!=null">{{ errors }}</span>
            <span class="polygon-shape"></span>
            <span class="span-txt">
              You can create an account after checkout.
            </span>
        
            <div class="field-tooltip toggle">
              <div class="custom-tooltip">
                <span
                  v-b-tooltip.hover
                  title="We'll send your order confirmation here."
                >
                  <i class="fal fa-question-circle"></i>
                </span>
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
import quote from "~/mixins/quote.js";
export default {
  name: "ContactInfoCheckout",
  props: ['errors'],
  mixins: [quote],
  data(){
    return {
      email: ''
    }
  },
  mounted() {
    let _cart = JSON.parse(JSON.stringify(this.cart));
    this.email = _cart.email
    this.$emit('updateContactInfo', this.email)
  },
  methods:{
    enterEmailAddress(event) {
      let email = event.target.value
      this.$emit('updateContactInfo', email)
    }
  }

};
</script>
