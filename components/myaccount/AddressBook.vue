<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="myaddbook-right-section myac-right-section">
    <div class="page-title-wrapper">
      <h1 class="page-title"><span>Address Book</span></h1>
    </div>
    <div class="myaddbook-container">
      <div class="myaddbook-block-title" v-if="addresses && addresses.length > 0">
        <span class="title">Default Addresses</span>
      </div>
      <div class="block-content myaddbook-block-content" v-if="addresses && addresses.length > 0">
        <div
          class="billing-add-col"
          v-for="(address, index) in addresses"
          :key="index"
          v-if="address.default_billing || address.default_shipping"
        >
          <div class="box-title">
            <h2 class="sub-heading">
              <span v-if="address.default_billing && address.default_shipping">
                Default Billing && Shipping Address
              </span>
              <span v-else-if="address.default_billing">
                Default Billing Address
              </span>
              <span v-else-if="address.default_shipping">
                Default Shipping Address
              </span>
            </h2>
          </div>
          <div class="address-billing address">
            <span v-html="getAddressAsHtml(address)"></span>
          </div>
          <div class="telno-billing telephone">
            <a :href="'tel:+' + address.telephone" class="t-number">
              <span>Tel : </span>
              <span>{{ formatPhoneNumber(address.telephone) }}</span>
            </a>
          </div>
          <div class="change-billing-add change-address">
            <nuxt-link
              :to="'/customer/address/'+address.id"
              class="billing-add-link change-add-link "
            >
              <span>Change Address</span>
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="block-addresses-list">
        <div class="block-title d-flex justify-content-between flex-wrap flex-sm-nowrap">
           <span>Additional Address Entries</span>
          <div class="add-adreess form-action">
            <nuxt-link to="/customer/address/new" class="add-address-link">
              Add New Address
            </nuxt-link>
          </div>
        </div>
        <div class="content myaddbook-block-content flex-wrap m-0" v-if="addresses && addresses.length > 0">
          <div class="shipping-add-col"
            v-for="(address, index) in addresses"
            :key="index"
            v-if="!address.default_billing && !address.default_shipping">
            <div class="address-shipping address">
              <span v-html="getAddressAsHtml(address)"></span>
            </div>
            <div class="telno-shipping telephone">
              <a :href="'tel:+' + address.telephone" class="t-number">
                <span>Tel : </span>
                <span>{{ formatPhoneNumber(address.telephone) }}</span>
              </a>
            </div>
            <div class="change-billing-add change-address">
              <nuxt-link :to="'/customer/address/'+address.id" class="billing-add-link change-add-link ">
                <span>Change Address</span>
              </nuxt-link>
              <a
                href="javascript:void(0)"
                class="billing-add-link change-add-link delete-address"
                v-b-modal="'delete-address-'+index"
              >
                <span>Delete Address</span>
              </a>
              <div>
              <b-modal :id="'delete-address-'+index" title="Delete Address">
                <p class="mt-2">Are you sure you want to delete this address?</p>
                <button @click="removeCustomer(address.id)" class="p-0"><span class="delete-yes">Yes</span></button>
              </b-modal>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import globalMixin from "~/mixins/others/global.js";
import indexMixin from "~/mixins/customer/index.js";
export default {
  name: "AddressBook",
  props: ["addresses"],
  mixins: [globalMixin, indexMixin],
  methods:{
    async removeCustomer(addressId) {
      document.querySelector('.modal-header button').click()
      await this.removeCustomerAddress(addressId)
      await this.getCustomer()
    }
  }
};
</script>
