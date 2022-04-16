<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
<div class="checkstep-shipping-sect">
    <div class="field addresses" id="field-container">
                <h3 class="step-title">Shipping Address</h3>
        <div class="shipping-address-items">
            <div class="shipping-address-item active">
               <div class="check-mark"><i class="fal fa-check-circle"></i></div>
                 Johan Donald
                <br>Admedabad, No 2
                <br>Ahmedabad, Gujarat 123456
                <br>India
                <br>
                <a data-bind="attr: {'href': 'tel:' + currentBillingAddress().telephone}, text: currentBillingAddress().telephone" href="tel:1234567890">1234567890</a>

                <div class="action-toolbar d-flex justify-content-between align-items-center button-section">
                    <button type="button" class="action edit-address-link" data-bind="" v-b-modal.modal-scrollable>
                        <span data-bind="">Edit</span>
                    </button>
                    <button type="button" id="toggle" class="action  select-shipping-item" data-bind="">
                        <span data-bind="">Ship Here</span>
                    </button>
                </div>
            </div>
             <div class="shipping-address-item">
               <div class="check-mark"><i class="fal fa-check-circle"></i></div>
                 Johan Donald
                <br>Admedabad, No 2
                <br>Ahmedabad, Gujarat 123456
                <br>India
                <br>
                <a data-bind="attr: {'href': 'tel:' + currentBillingAddress().telephone}, text: currentBillingAddress().telephone" href="tel:1234567890">1234567890</a>

                <div class="action-toolbar d-flex justify-content-between align-items-center button-section">
                    <button type="button" class="action edit-address-link" data-bind="" v-b-modal.modal-scrollable>
                        <span data-bind="">Edit</span>
                    </button>
                    <button type="button" id="toggle" class="action  select-shipping-item" data-bind="">
                        <span data-bind="">Ship Here</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="action-toolbar add-new-address-btn">
             <button type="button" id="toggle" class="action  action-show-popup" data-bind="" v-b-modal.modal-1>
               <span>+</span> New Address
              </button>
        </div>

    </div>
        <b-modal id="modal-1" title="Shipping address">
            <div class="checkout-wrapper opc-wrapper checkout-modal">
                <ShippingAddress />
                <div class="filter-item address-book">
                    <input type="checkbox" class="check-input">
                    <span class="label check-label">Save in address book</span>
                </div>
            </div>
            <div class="form-btn-container">
                <div class="modal-btn-group">
                    <div class="text-cancel">
                        <button type="button" class="action checkout-cancel">Cancel</button>
                    </div>
                    <div class="primary text-save">
                        <button type="button" class="action checkout-save">Save Address</button>
                    </div>
                </div>
            </div>
        </b-modal>

    </div>
</template>
<script>
import ShippingAddress from "~/components/checkout/ShippingAddress.vue";
export default {
name: 'CheckoutStepShipping',
	components: {
        ShippingAddress,
	}
}
</script>
