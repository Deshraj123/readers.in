<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="customer-container customer-login-container">
    <div class="left-img-content">
      <span class="hide-element">background image</span>
    </div>
    <div class="right-login-content">
      <div class="log-in-msg" v-if="Object.keys(loginOtpResponse).length > 0 && loginOtpResponse.error">
        <div class="msg">
          {{ $t(loginOtpResponse.message) }}
        </div>
      </div>
      <OTPVerifier :response="loginOtpResponse" page="login" />
      <div class="login-section customer-login" v-if="Object.keys(loginOtpResponse).length == 0 || loginOtpResponse.error">
        <h1 class="title">
          Customer Login
        </h1>
        <div class="login-icon">
          <i class="fal fa-user-circle"></i>
        </div>
        <form @submit.prevent="sendOtp()">
          <div class="user-email">
            <label for="email" class="hide-element">Email Or Mobile No:</label>
            <div class="control input-control">
              <input
                type="text"
                class="input-email"
                :class="{ error: this.emailOrMobileError != null }"
                id="email"
                name="email"
                v-model="emailOrMobile"
                placeholder="Mobile Number (10-digit) / Email Address"
                 required
              />
              <span v-if="emailOrMobileError != ''" class="error">
                {{ $t(emailOrMobileError) }}
              </span>
            </div>
          </div>

          <div class="login-btn">
            <button type="button" id="user-signup" @click="sendOtp()">
              Login Using OTP
            </button>
          </div>

          <div class="ragister-link">
            <nuxt-link to="/createaccount" class="ragister">
              New to Readers? Register here
            </nuxt-link>
          </div>
        </form>
      </div>
      <!-- log-in-successfull start -->
      <div class="login-section login-successfully">
        <div class="success-icon">
          <i class="fal fa-check-circle"></i>
        </div>
        <div class="success-msg">
          <span>your account has been Loged In successfully</span>
        </div>
        <div class="succ-user-name">
          <span>Wel come , Jhon</span>
        </div>
        <div class="continue-btn login-btn">
          <button type="button" id="cnt-shopping">continue shopping</button>
        </div>
      </div>
      <!-- successfull end-->
    </div>
  </div>
</template>

<script>
import OTPVerifier from "~/components/customer/OTPVerifier.vue";
import authMixin from "~/mixins/customer/auth.js";
import globalMixin from "~/mixins/others/global.js";
export default {
  name: "Login",
  mixins: [authMixin, globalMixin],
  components: {
    OTPVerifier
  },
  data() {
    return {

      emailOrMobile: "",

      emailOrMobileError: null,
    };
  },
  methods: {
    async resetAllError() {
      this.emailOrMobileError = null;
    },

    async sendOtp() {
      if (!this.checkLoginValidation()) {
        // Mobile
        if (this.is_numeric(this.emailOrMobile)) {
          await this.$store.commit("customer/auth/setLoginOrRegDetails", {
            key: this.mobileKey,
            value: this.emailOrMobile
          })

          // Email
        } else {
          await this.$store.commit("customer/auth/setLoginOrRegDetails", {
            key: this.emailKey,
            value: this.emailOrMobile
          })
        }

        let payload = {
          mobile: this.emailOrMobile
        };
        await this.sendLoginOtpAction(payload);
      }
    },
    checkLoginValidation() {
      this.resetAllError();
      let validation = false;

      if (this.emailOrMobile == "") {
        validation = true;
        this.emailOrMobileError =
          "Please enter mobile number or email address.";
      } else {
        if (this.is_numeric(this.emailOrMobile)) {
          if (!this.isPhoneNumber(this.emailOrMobile)) {
            validation = true;
            this.emailOrMobileError = "Mobile number is not valid.";
          }
        } else if (!this.validEmail(this.emailOrMobile)) {
          validation = true;
          this.emailOrMobileError = "Email address is not valid.";
        }
      }

      return validation;
    },
  }
};
</script>
