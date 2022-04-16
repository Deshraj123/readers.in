<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="payment-method-types">
    <span class="error" v-if="paymentMethodError!=null">{{ paymentMethodError }}</span>
    <span class="error" v-if="placeOrderError!=null">{{ placeOrderError }}</span>
    <div v-for="(method, index) in cart.available_payment_methods" :key="index">
      <!--DebitCard Transfer Payment method -->
      <div class="payment-method debit-card-method" v-if="method.code === methods.ccAvenuepay">
        <div class="payment-method-title field choice">
          <input
            type="radio"
            name="payment[method]"
            id="ccavenuepay"
            value="ccavenuepay"
            :checked="method.code === cart.selected_payment_method.code"
            @click="setPaymentMethod(method)"
          />
          <label for="ccavenuepay" class="label debit-card">
            Credit/Debit Card, GPay, Paytm, Internet Banking
          </label>
          <img
            class="card-img-group"
            src="~/assets/images/checkout/payment-min.png"
            alt="card"
            width="200"
            height="30"
          />
        </div>
        <div class="payment-method-card" v-if="method.code === cart.selected_payment_method.code">
          <ul class="list-unstyled">
            <li>
              <span class="mb-2 d-inline-block">
                You will be redirected to CCAvenue website when you place an
                order.
              </span>
              <div class="ccavenuepay_frontend_logo">
                <img
                  class="ccavenuepay-img-group"
                  src="~/assets/images/checkout/ccavenuue-min.png"
                  alt="card"
                  width="340"
                  height="85"
                />
              </div>
            </li>
          </ul>
          <div class="payment-content-bottom d-flex">
              <div class="checkout-agreements-block">
                  <a href="#" target="_self" title="Terms and Conditions" v-b-modal.card-terms-conditions class="conditions-model">Terms and Conditions</a>
                    <b-modal id="card-terms-conditions" title="Terms and Conditions">
                       <TermsCondition />
                    </b-modal>
             </div>
          </div>

          <PlaceOrderbtn textBtn="Place Order" :methods="methods"/>

        </div>

      </div>
      <!--  Bank Transfer Payment method -->
      <div class="payment-method bank-method" v-if="method.code === methods.bankTransfer">
        <div class="payment-method-title field choice">
          <input
            type="radio"
            name="payment[method]"
            id="banktransfer"
            value="banktransfer"
            class="radio"
            :checked="method.code === cart.selected_payment_method.code"
            @click="setPaymentMethod(method)"
          />
          <label for="banktransfer" class="label">
            {{method.title}}
          </label>
        </div>

        <div class="payment-method-content" v-if="method.code === cart.selected_payment_method.code">
          <div class="account-details billing-address-details">

              <BankDetail />

             <div class="payment-content-bottom">
                  <div class="checkout-agreements-block">
                    <a
                      href="javascript:void(0)"
                      target="_self"
                      title="Terms and Conditions"
                      v-b-modal.bankt-terms-conditions
                      class="conditions-model"
                    >
                      Terms and Conditions
                    </a>
                    <b-modal id="bankt-terms-conditions" title="Terms and Conditions">
                      <TermsCondition />
                    </b-modal>
                </div>
              </div>
          </div>
          <PlaceOrderbtn textBtn="Place Order" :methods="methods"/>
        </div>
      </div>
      <!-- Paypal Transfer Payment method-->
      <div class="payment-method paypal-method" v-if="method.code === methods.paypalExpress">
        <div class="payment-method-title field choice">
          <input
            type="radio"
            name="payment[method]"
            id="paypal"
            value="paypal"
            class="radio"
            :checked="method.code === cart.selected_payment_method.code"
            @click="setPaymentMethod(method)"
          />
          <label for="paypal" class="label mr-2">
            PayPal Express Checkout
            <a
              href="https://www.paypal.com/us/cgi-bin/webscr?cmd=xpt/Marketing/popup/OLCWhatIsPayPal-outside"
              target="_blank"
              title="Paypal"
            >
              What is PayPal?
            </a>
          </label>
          <img
            class="paypal-img "
            src="~/assets/images/checkout/paypal-min.png"
            alt="card"
            width="68"
            height="44"
          />
        </div>
        <div class="payment-method-card" v-if="method.code === cart.selected_payment_method.code">
          <div class="payment-content-bottom  flex-wrap">
              <div class="checkout-agreements-block">
                <a
                  href="javascript:void(0)"
                  target="_self"
                  title="Terms and Conditions"
                  v-b-modal.paypal-term-conditions
                  class="conditions-model"
                >
                  Terms and Conditions
                </a>
                <b-modal id="paypal-term-conditions" title="Terms and Conditions">
                  <TermsCondition />
                </b-modal>
            </div>
          </div>
          <PlaceOrderbtn textBtn="Continue to Paypal" :methods="methods"/>
        </div>

      </div>
      <!--  Cash on Delivery Payment method -->
      <div class="payment-method cashondelivery-method" v-if="method.code === methods.cashOnDelivery">
        <div class="payment-method-title field choice">
          <input
            type="radio"
            name="payment[method]"
            id="cashondelivery"
            value="cashondelivery"
            class="radio"
            :checked="method.code === cart.selected_payment_method.code"
            @click="setPaymentMethod(method)"
          />
          <label for="cashondelivery" class="label">
            {{method.title}}
          </label>
        </div>
        <div class="payment-method-content" v-if="method.code === cart.selected_payment_method.code">
          <PlaceOrderbtn textBtn="Place Order" :methods="methods"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PlaceOrderbtn from "~/components/checkout/PlaceOrderbtn.vue";
import BankDetail from "~/components/checkout/BankDetail.vue";
import TermsCondition from "~/components/checkout/TermsCondition.vue";
import quote from "~/mixins/quote.js";
import paypalMixin from "~/mixins/paymentMethod/paypal.js";
export default {
  name: "PaymentMethods",
  mixins: [quote, paypalMixin],
  components: {
		TermsCondition,
    BankDetail,
    PlaceOrderbtn
	},
  data(){
    return {
      methods:{
        ccAvenuepay: 'ccavenuepay',
        bankTransfer: 'banktransfer',
        paypalExpress: 'paypal_express',
        cashOnDelivery: 'cashondelivery'
      }
    }
  },
  mounted() {
    console.log(this.cart) 
    if(this.cart.selected_payment_method.code === this.methods.ccAvenuepay){
      document.querySelector('.debit-card-method').click()
    }
    if(this.cart.selected_payment_method.code === this.methods.bankTransfer){
      document.querySelector('.bank-method').click()
    }
    if(this.cart.selected_payment_method.code === this.methods.paypalExpress){
      document.querySelector('.paypal-method').click()
    }
    if(this.cart.selected_payment_method.code === this.methods.cashOnDelivery){
      document.querySelector('.cashondelivery-method').click()
    }
  },
  methods:{
    async setPaymentMethod(method) {
      // Bank Transfer || Ccavenuepay
      if(method.code === this.methods.bankTransfer || method.code === this.methods.ccAvenuepay || method.code === this.methods.cashOnDelivery) {

        await this.setPaymentMethodOnCart({
          paymentMethod: {
            code: method.code
          }
        })
      }

      // Paypal Express
      if(method.code === this.methods.paypalExpress) {
        this.createPaypalToken()
      }
    }
  }
};
</script>
