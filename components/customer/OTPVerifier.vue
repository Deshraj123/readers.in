<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div
    class="login-section otp-login-section"
    v-if="Object.keys(response).length > 0 && !response.error"
  >
    <div class="title">
      <h3>Please check the OTP sent to your mobile or email</h3>
      <span class="otp-label">Enter OTP</span>
    </div>
    <form>
      <div class="user-otp-field">
        <label for="text" class="hide-element">Email Or Mobile No:</label>
        <input
          v-for="(digit, index) in digits"
          :key="index"
          :class="otpInput(index)"
          type="number"
          :id="digit.key"
          :name="digit.key"
          @keyup="autoTab(index, digit.key, 1, digit.next)"
          v-model="digit.value"
        />
        <span class="error" v-if="digitError != null">{{ digitError }}</span>
        <span class="error" v-if="loginError != null">{{ loginError }}</span>
      </div>

      <div
        class="user-mobile-no"
        v-if="Object.keys(loginOrRegDetails).length > 0"
      >
        <span class="m-no" v-if="loginOrRegDetails.key == mobileKey"
          >+91 {{ loginOrRegDetails.value }}</span
        >
        <span class="m-no" v-if="loginOrRegDetails.key == emailKey">{{
          loginOrRegDetails.value
        }}</span>
        <button type="button" @click="changeLoginType()">Change</button>
      </div>
      <div class="resend-otp">
        <a href="javascript:void(0)" target="_self" @click="sendOtp()"
          >Resend OTP</a
        >
      </div>
      <div class="login-btn" v-if="page == loginPage">
        <button type="button" id="user-loginbtn" @click="verifyAndLogin()">
          login
        </button>
      </div>
      <div class="login-btn" v-if="page == regPage">
        <button type="button" id="user-loginbtn" @click="verifyAndSignup()">
          Sign Up
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import authMixin from "~/mixins/customer/auth.js";
import globalMixin from "~/mixins/others/global.js";
export default {
  name: "OTPVerifier",
  mixins: [authMixin, globalMixin],
  props: ["response", "page"],
  data() {
    return {
      loginPage: "login",
      regPage: "reg",

      digits: [
        {
          key: "digit-1",
          value: "",
          next: "digit-2"
        },
        {
          key: "digit-2",
          value: "",
          next: "digit-3"
        },
        {
          key: "digit-3",
          value: "",
          next: "digit-4"
        },
        {
          key: "digit-4",
          value: "",
          next: "digit-5"
        },
        {
          key: "digit-5",
          value: "",
          next: "digit-6"
        },
        {
          key: "digit-6",
          value: "",
          next: ""
        }
      ],

      digitError: null
    };
  },

  methods: {
    async sendOtp() {
      // Mobile
      if (this.is_numeric(this.loginOrRegDetails.value)) {
        let payload = {
          mobile: this.loginOrRegDetails.value
        };

        if (this.page == this.loginPage) {
          await this.sendLoginOtpAction(payload);
        }

        if (this.page == this.regPage) {
          await this.sendOtpForRegister(payload);
        }

        // Email
      } else {
        let payload = {
          mobile: this.loginOrRegDetails.value
        };

        if (this.page == this.loginPage) {
          //await this.sendOtpAction(payload)
        }
      }
    },

    async changeLoginType() {
      await this.$store.commit("customer/auth/setLoginOtpResponse", {});
    },

    getOtpValues() {
      let that = this;
      let otp = "";
      let response = {};
      let error = false;
      that.digitError = null;
      that.digits.forEach(function(digit) {
        if (digit.value == "") {
          that.digitError = "OTP must be filed and number.";
          error = true;
        } else {
          otp += digit.value;
        }
      });

      response = {
        error: error,
        otp: otp
      };

      return response;
    },

    async verifyAndLogin() {
      let response = this.getOtpValues();

      if (!response.error) {
        let payload = {
          mobile: this.loginOrRegDetails.value,
          otp: response.otp
        };
        await this.verifyAndCreateToken(payload);
      }
    },

    getStringByPosition(string, position = 0) {
      const chars = string.split("");
      return chars[position];
    },

    removeFirstPositionFromString(string) {
      let chars = string.split("");
      delete chars[0];
      return chars.join("");
    },

    autoTab(index, field1, len, field2) {
      let that = this;

      // Copy Paste Start
      let digitValue = "";
      let copypaste = false;
      that.digits.forEach(function(dvalue, dindex) {
        if (dvalue.value.length > 1 || digitValue.length > 0) {
          copypaste = true;
          digitValue += dvalue.value;
          that.digits[dindex].value = that.getStringByPosition(digitValue);
          digitValue = that.removeFirstPositionFromString(digitValue);
          if (dvalue.next != "") {
            document.getElementById(dvalue.next).focus();
          }else if(document.getElementById('user-loginbtn')){
            document.getElementById('user-loginbtn').click()
          }
        }
      });

      if (copypaste) {
        return;
      }
      // Copy Paste End

      let currentValueLength = document.getElementById(field1).value.length;
      if (currentValueLength == len || currentValueLength > len) {
        if (field2 != "") {
          document.getElementById(field2).focus();
        }
      }

      if (
        this.digits[index].key == field1 &&
        this.digits[index].value.length > 1
      ) {
        this.digits[index].value = this.digits[index].value.slice(
          0,
          -(this.digits[index].value.length - 1)
        );
        return false;
      }
    },

    async verifyAndSignup() {
      let response = this.getOtpValues();
      if (!response.error) {
        let payload = {
          mobile: this.regDetails.mobile,
          name: this.regDetails.firstName,
          last: this.regDetails.lastName,
          email: this.regDetails.email,
          otp: response.otp
        };
        await this.verifyAndCreateAndGenerateToken(payload);
      }
    },

    otpInput(index) {
      let otpInputClass = "input-otp";
      if (index === 5) {
        otpInputClass += " last-item";
      }
      return otpInputClass;
    }
  }
};
</script>
