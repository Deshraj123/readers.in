<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="subscribe-newslettar-container">
    <h3 class="newslettar-title">
      Sign up for Giveaways Coupons and Promotions!
    </h3>
    <div class="newslettar-form" >
      
      <div class="newslettar-email">
        <label class="label hide-element" for="newslettaremail">Email</label>
        <div class="control">
          <input
            class="input-email"
            :class="{error: emailError != null}"
            type="email"
            id="newslettaremail"
            name="newsletteremail"
            placeholder="Enter Your Email..."
            v-model="email"
          />
          <span class="subscribe-error" v-if="newsletterError!=null">{{newsletterError}}</span>
          <span class="email-err" v-if="emailError != null">{{ emailError }}</span>
        </div>
        <button class="subscribe-btn" @click="subscribe()">Subscribe</button>
      </div>
    </div>
    <div
      class="socialicon-wrapper"
      v-interpolation
      v-html="footerSocialicons.content"
    />
  </div>
</template>

<script>
import blocksMixin from "~/mixins/cms/blocks.js";
import globalMixin from "~/mixins/others/global.js";
import newsletterMixin from "~/mixins/others/newsletter.js";
export default {
  name: "SubscribeNewsletter",
  mixins: [blocksMixin, globalMixin, newsletterMixin],
  data() {
    return {
      block: {
        identifiers: ["pwa-footer-socialicons"]
      },

      email: "",
      emailError: null
    };
  },
  async fetch() {
    await this.getBlocks(this.block);
  },
  methods:{
    async subscribe(){
      if(!this.checkSubscribeValidation()){
        await this.subscribeEmailToNewsletter(this.email)
      }
    },
    checkSubscribeValidation() {
      this.resetErrors()
      let validation = false
      if(this.email == ''){
        validation = true
        this.emailError = 'Email address must be filled.'
      }else if(!this.validEmail(this.email)){
        validation = true
        this.emailError = 'Invalid email address.'
      }
      return validation
    },
    resetErrors() {
      this.emailError = null
    }
  }
};
</script>
