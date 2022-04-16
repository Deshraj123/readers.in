<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="customer-login-container customer-createac-container ">
    <div class="left-img-content">
      <span class="hide-element">background image</span>
    </div>
    <div class="right-login-content">
      <OTPVerifier :response="regOtpResponse" page="reg" />
      <div class="login-section signup-section" v-if="Object.keys(regOtpResponse).length == 0 || regOtpResponse.error">
        <h1 class="title">Create New Customer Account</h1>
        <div class="login-icon signup-icon">
          <i class="fal fa-user-circle"></i>
        </div>
        <form>  
          <div class="user-email user-ragistrac">
            <div class="message-gap">
              <span v-if="registerError != null" class="error">
                  {{ $t(registerError) }}
                </span>
                <span v-if="isEmailAvailabelError != null" class="error">
                  {{ $t(isEmailAvailabelError) }}
                </span>
                <span v-if="isMobileAvailabelError != null" class="error">
                  {{ $t(isMobileAvailabelError) }}
                </span>
            </div>
            <label for="mobile-number" class="hide-element">Mobile Number</label>
            <div class="control input-control">
              <input
                type="number"
                class="input-number ragister-input"
                :class="{ error: this.mobileNumberError != null }"
                id="mobile-number"
                name="number"
                placeholder="Mobile Number (10-digit)"
                v-model="mobileNumber"
              />
              <span v-if="mobileNumberError != ''" class="error">
                {{ $t(mobileNumberError) }}
              </span>
            </div>
            <label for="first-name" class="hide-element">Name</label>
            <div class="control input-control">
              <input
                type="text"
                class="input-name ragister-input"
                :class="{ error: this.firstNameError != null }"
                id="first-name"
                name="text"
                placeholder="First Name"
                v-model="firstName"
              />
              <span v-if="firstNameError != ''" class="error">
                {{ $t(firstNameError) }}
              </span>
            </div>
            <label for="last-name" class="hide-element">Last Name</label>
            <div class="control input-control">
              <input
                type="text"
                class="input-lname ragister-input"
                :class="{ error: this.lastNameError != null }"
                id="last-name"
                name="text"
                placeholder="Last Name"
                v-model="lastName"
              />
              <span v-if="lastNameError != ''" class="error">
                {{ $t(lastNameError) }}
              </span>
            </div>
            <label for="email" class="hide-element">Email</label>
            <div class="control input-control last-item">
              <input
                type="Email"
                class="input-email ragister-input"
                :class="{ error: this.emailError != null }"
                id="email"
                name="text"
                placeholder="Email"
                v-model="email"
              />
              <span v-if="emailError != ''" class="error">
                {{ $t(emailError) }}
              </span>
            </div>
          </div>
          <div class="login-btn signup-btn">
            <button type="button" id="user-signup" @click="sendOtpForReg()">
              Signup Using OTP
            </button>
          </div>
          <div class="ragister-link">
            <nuxt-link to="/login" target="_self" class="ragister">
              If you already Registered ? Login here
            </nuxt-link>
          </div>
        </form>
      </div>
      <!-- signin-successfull start -->
      <div class="login-section signup-section signup-successfully">
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
  name: "CreateAc",
  mixins: [authMixin, globalMixin],
  components: {
    OTPVerifier
  },
  data() {
    return {
      mobileNumber: "",
      firstName: "",
      lastName: "",
      email: "",

      mobileNumberError: null,
      firstNameError: null,
      lastNameError: null,
      emailError: null
    };
  },
  methods: {
    async resetAllError() {
      this.mobileNumberError = null;
      this.firstNameError = null;
      this.lastNameError = null;
      this.emailError = null;

      await this.$store.commit("customer/auth/setIsEmailAvailabelError", null);
    },

    async sendOtpForReg() {
      if (!this.checkSingUpValidation()) {
        await this.checkEmailIsAvailable({ email: this.email });
        await this.checkMobileIsAvailable({ mobile: this.mobileNumber });
        if (this.isEmailAvailabelError == null && this.isMobileAvailabelError == null) {


          await this.$store.commit("customer/auth/setLoginOrRegDetails", {
            key: this.mobileKey,
            value: this.mobileNumber
          })

          // Create payload for register
          let payload = {
            mobile: this.mobileNumber
          };

          await this.$store.commit("customer/auth/setRegDetails", {
            mobile: this.mobileNumber,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email
          })

          await this.sendOtpForRegister(payload)
        }
      }
    },

    async singup() {
      if (!this.checkSingUpValidation()) {
        await this.checkEmailIsAvailable({ email: this.email });
        if (this.isEmailAvailabelError == null) {
          // Create payload for register
          let payload = {
            mobile_number: this.mobileNumber,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email
          };

          await this.register(payload)
        }
      }
    },

    checkSingUpValidation() {
      this.resetAllError();

      let validation = false;

      if (this.mobileNumber == "") {
        validation = true;
        this.mobileNumberError = "Please enter mobile number.";
      } else if (!this.isPhoneNumber(this.mobileNumber)) {
        validation = true;
        this.mobileNumberError = "Mobile number is not valid.";
      }

      if (this.firstName == "") {
        validation = true;
        this.firstNameError = "Please enter first name.";
      }

      if (this.lastName == "") {
        validation = true;
        this.lastNameError = "Please enter last name.";
      }

      if (this.email == "") {
        validation = true;
        this.emailError = "Please enter email address.";
      } else if (!this.validEmail(this.email)) {
        validation = true;
        this.emailError = "Email address is not valid.";
      }

      return validation;
    }
  }
};
</script>
