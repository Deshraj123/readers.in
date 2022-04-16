
<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
<form>
        <div class="flex-box">
            <div class="input-box f-box">
                <input class="input-text" type="text" name="f-name" id="" placeholder="first name *">
            </div>
            <div class="input-box l-box">
                <input class="input-text" type="text" name="l-name" id="" placeholder="last name *">
            </div>
        </div>
        <div class="checkout-address-box">
            <div class="input-box">
                <input class="input-text" type="text" name="street-add" id="" placeholder="street address *">
            </div>
            <div class="input-box space-box">
                <input class="input-text" type="text" name="street-add1" id="" placeholder="street address">
            </div>
        </div>
        <div class="checkout-region flex-box">
            <div class="input-box f-box">
                <input class="input-text" type="text" name="f-name" id="" placeholder="city *">
            </div>
            <div class="list-items">
                <select class="items">
                    <option value="">please select  a region , state or provin</option> 
                    <option value="">East india</option> 
                    <option value="">North india</option> 
                    <option value="">South india</option> 
                    <option value="">West india</option>
                </select>
            </div>
        </div>
        <div class="checkout-region flex-box">
            <div class="input-box f-box">
                <input class="input-text postal-code" type="text" name="postal-code" id="" placeholder="zop/postal code *">
            </div>
            <div class="list-items">
                <select class="items">
                    <option value="">India</option> 
                    <option value="">East india</option> 
                    <option value="">North india</option> 
                    <option value="">South india</option> 
                    <option value="">West india</option>
                </select>
            </div>
        </div>
            <div class="checkout-contact-no">
            <div class="input-box">
                <input class="input-text" type="number" name="conta-no" id="" placeholder="phone number *">
            </div>
        </div>
        <div class="actions-toolbar d-flex justify-content-between align-items-center">
            <div class="primary-btn">
                <button class="action action-cancel" type="button" data-bind="">
                    <span data-bind="">Cancel</span>
                </button>
            </div>
            <div class="primary-btn">
                <button class="action action-update" type="button" data-bind="">
                    <span data-bind="">Update</span>
                </button>
            </div>
        </div>
</form>
</template>
<script>
export default {
name: 'CheckoutForm'
}
</script>