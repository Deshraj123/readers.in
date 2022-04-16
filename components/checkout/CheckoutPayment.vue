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
                                 <!-- <BillingAddress /> -->
                           </div> 
                         <div class="step-title">Payment Method</div> 
                         <!--DebitCard Transfer Payment method -->
                         <div class="payment-method debit-card-method">
                             <div class="payment-method-title field choice">
                                 <input type="radio" name="payment[method]" id="ccavenuepay" value="ccavenuepay">
                                 <label for="ccavenuepay" class="label debit-card">Credit/Debit Card, GPay, Paytm, Internet Banking </label>
                                 <img  class="card-img-group" src="~/assets/images/checkout/payment-min.png" alt="card" width="200" height="30">  
                             </div>
                             <div class="payment-method-card">
                                 <ul class="list-unstyled">
                                     <li>
                                         <span class="mb-2 d-inline-block">You will be redirected to CCAvenue website when you place an order.</span>
                                         <div class="ccavenuepay_frontend_logo">
                                             <img  class="ccavenuepay-img-group" src="~/assets/images/checkout/ccavenuue-min.png" alt="card" width="340" height="85"> 
                                         </div>
                                     </li>
                                 </ul>
                             </div> 
                               
                         </div> 
                     <!--  Bank Transfer Payment method -->
                         <div class="payment-method bank-method">
                             <div class="payment-method-title field choice">
                                 <input type="radio" name="payment[method]" id="banktransfer" value="banktransfer" class="radio">
                                 <label for="banktransfer" class="label">Bank Transfer Payment</label>
                             </div> 
                            
                            <div class="payment-method-content ">
                                <BankDetail />
                            </div>
                            
                          
                         </div>
                    <!-- Paypal Transfer Payment method-->
                        <div class="payment-method paypal-method">
                             <div class="payment-method-title field choice">
                                 <input type="radio" name="payment[method]" id="paypal" value="paypal" class="radio"> 
                                 <label for="paypal" class="label mr-2">PayPal Express Checkout  <a href="https://www.paypal.com/us/cgi-bin/webscr?cmd=xpt/Marketing/popup/OLCWhatIsPayPal-outside" target="_blank" title="Paypal">What is PayPal?</a></label>
                                  <img  class="paypal-img " src="~/assets/images/checkout/paypal-min.png" alt="card" width="68" height="44"> 
                             </div> 
                              <div class="payment-method-content">
                                <div class="messages" data-role="checkout-messages"></div> 
                                <!-- billing new address input feild call here --> 
                                <div class="payment-content-bottom d-flex justify-content-between align-items-center">
                                    <div class="checkout-agreements-block">
                                        <a href="#" target="_self" title="Terms and Conditions" v-b-modal.terms-conditions-model class="conditions-model"
                                            >Terms and Conditions</a
                                        >
                                        <b-modal id="terms-conditions-model"
                                            >By Clicking this You agree to the terms and Condition of this website. The Images Are for representation purpose
                                            only, the Real product image may Differ from time to time as per product upgradations or other reason. PLease Make
                                            sure you choose the product on the basis of its Name and Descriptions</b-modal
                                        >
                                    </div>
                                    <div class="actions-toolbar">
                                        <div class="primary">
                                            <button type="submit" class="action primary checkout" title="Continue to paypal">
                                              Continue to paypal
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
import BankDetail from "~/components/checkout/BankDetail.vue";
 
export default {
name: 'CheckoutPayment',
components: { 
    BillingAddress, 
    BankDetail,
	}
}
</script>