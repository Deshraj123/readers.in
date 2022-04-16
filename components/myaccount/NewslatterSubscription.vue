<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="newssubscription-right-section myac-right-section">
    <div class="page-title-wrapper">
      <h1 class="page-title">
        <span>Newsletter Subscriptions</span>
      </h1>
    </div>
    <div class="Newslatter_subscription-container">

      <span class="success-bg d-flex flex-wrap" v-if="newsletterSuccess!= null">
        {{ newsletterSuccess }}
      </span>
      <span class="error-bg d-flex flex-wrap" v-if="newsletterError!= null">
        {{ newsletterError }}
      </span>

      <h2 class="subscription-title">Subscriptions Option</h2>
      <div class="subscription-checkbox" v-if="customer.is_subscribed">
        You are subscribed to "General Subscription"
      </div>
      <div class="subscription-checkbox " v-else>
        <input
          type="checkbox"
          class="info-checkbox check-input"
          v-model="subscription"
          id="newsletter-check"
        >
        <label for="newsletter-check" class="label">General Subscription</label>
      </div>

      <div class="form-action subscription-action ">
        <nuxt-link to="/customer/account" class="back">Back</nuxt-link>
        <button
          v-if="subscription"
          type="button"
          class="submit"
          @click="subscribeEmailToNewsletter(customer.email)"
        >
          Save
        </button>
      </div>

    </div>
  </div>
</template>

<script>
import customerMixin from "~/mixins/customer/index.js";
import newsletterMixin from "~/mixins/others/newsletter.js";
export default {
  name: "NewslatterSubscription",
  mixins: [customerMixin, newsletterMixin],
  data() {
    return {
      subscription: false
    }
  }
};
</script>
