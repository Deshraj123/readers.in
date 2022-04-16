<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="myac-right-section">
    <div class="page-title-wrapper">
      <h1 class="page-title"><span>My Account</span></h1>
    </div>
    <div class="account-info block-dashboard-info">
      <div class="sub-title-row">
        <h2 class="sub-title"><span>Account Information</span></h2>
      </div>
      <div class="contactinfo-newslatter-container">
        <div class="contact-info-col  column">
          <h3 class="sub-heading"><span>Contact Information</span></h3>
          <div class="contact-info">
            <span class="text">{{
              customer.firstname + " " + customer.lastname
            }}</span>
            <span class="text">{{ customer.email }}</span>
          </div>
          <div class="action-control">
            <span class="edit-action mt-2 d-inline-block">
              <nuxt-link to="/customer/account/edit" class="link-edit link"
                >Edit</nuxt-link
              >
            </span>
          </div>
        </div>
        <div class="newsletter-col column">
          <h3 class="sub-heading"><span>Newsletters</span></h3>
          <div class="newslatter-action">
            <span class="text" v-if="customer.is_subscribed">
              You are subscribed to "General Subscription"
            </span>
            <span class="text" v-else>
              You aren't subscribed to our newsletter.
            </span>
            <div class="action-control mt-2">
              <span class="edit-action">
                <nuxt-link to="/newsletter/manage" class="link-edit link">
                  Edit
                </nuxt-link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="Address-Book-row block-dashboard-addresses ">
      <div class="sub-title-row  action-control">
        <h2 class="sub-title"><span>Address Book</span></h2>
        <span class="manage-add"
          ><nuxt-link to="/customer/address" class="link-mngadd link"
            >Manage Addresses</nuxt-link
          ></span
        >
      </div>
      <div class="addbook-shipp-container add-row">
        <div class="add-book-col column">
          <h3 class="sub-heading"><span>Default Billing Address </span></h3>
          <div class="action-control" v-if="customer.default_billing == null">
            <span class="text"
              >You have not set a default billing address.</span
            >
          </div>
          <div class="action-control" v-else>
            <span class="text" v-html="getBillingAddress()" />
            <span class="mail mt-2">
              <nuxt-link
                :to="'/customer/address/' + customer.default_billing"
                class="mail-link link"
              >
                Edit Address
              </nuxt-link>
            </span>
          </div>
        </div>
        <div class="shipping-add-col column">
          <h3 class="sub-heading"><span>Default Shipping Address</span></h3>
          <div class="action-control" v-if="customer.default_shipping == null">
            <span class="text">
              You have not set a default shipping address.
            </span>
          </div>
          <div class="action-control" v-else>
            <span class="text" v-html="getShippingAddress()" />
            <span class="mail mt-2">
              <nuxt-link
                :to="'/customer/address/' + customer.default_shipping"
                class="mail-link link"
              >
                Edit Address
              </nuxt-link>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import customerMixin from "~/mixins/customer/index.js";
import globalMixin from "~/mixins/others/global.js";
export default {
  name: "MyAccount",
  mixins: [customerMixin, globalMixin],
  async mounted() {
    await this.$store.commit("customer/setIsChangePassword", false);
    await this.$store.commit("customer/setIsChangeEmail", false);
  },
  methods: {
    getBillingAddress() {
      let that = this;
      let address = {};
      if (that.customer.addresses.length > 0) {
        that.customer.addresses.forEach(function(customerAddress) {
          if (customerAddress.id === parseInt(that.customer.default_billing)) {
            address = customerAddress;
          }
        });
      }

      if (Object.keys(address).length > 0) {
        return that.getAddressAsHtml(address);
      }

      return;
    },
    getShippingAddress() {
      let that = this;
      let address = {};
      if (that.customer.addresses.length > 0) {
        that.customer.addresses.forEach(function(customerAddress) {
          if (customerAddress.id === parseInt(that.customer.default_shipping)) {
            address = customerAddress;
          }
        });
      }

      if (Object.keys(address).length > 0) {
        return that.getAddressAsHtml(address);
      }

      return;
    },

    async changePassword() {
      await this.$store.commit("customer/setIsChangePassword", true);
    }
  }
};
</script>
