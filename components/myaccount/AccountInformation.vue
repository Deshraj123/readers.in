<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="account_info-right-section myac-right-section">
    <div class="page-title-wrapper">
      <h1 class="page-title">
        <span>Edit Account Information</span>
      </h1>
    </div>

    <span class="error-bg" v-if="updateCustomerError!=null">{{ updateCustomerError }}</span>
    <span class="success-bg" v-if="updateCustomerSuccess!=null">{{ updateCustomerSuccess }}</span>

    <div class="account-info-container">
      <form class="account-info-form quotetion-form">
        <div class="account-info-main left-right-section-main">
          <div class="left-section-form account-info-left-section">
            <div class="acc-info-title block-title">
              <span class="title">Account Information</span>
            </div>


            <div class="input-group input-group-fname">
              <label for="fname" class="label fname-label">First Name</label>
              <div class="control">
                <input
                  type="text"
                  class="input-text input-fname"
                  id="fname"
                  name="text"
                  v-model="firstname"
                />
                <span class="error" v-if="firstnameError!=null">
                  {{ firstnameError }}
                </span>
              </div>
            </div>
            <div class="input-group input-group-lname">
              <label for="lname" class="label lname-label">Last Name</label>
              <div class="control">
                <input
                  type="text"
                  class="input-text input-lname"
                  id="lname"
                  name="lname"
                  v-model="lastname"
                />
                <span class="error" v-if="lastnameError!=null">
                  {{ lastnameError }}
                </span>
              </div>
            </div>
            <div class="input-group input-group-email">
              <label for="email" class="label email-label">Email</label>
              <div class="control">
                <input
                  type="text"
                  class="input-text input-email"
                  id="email"
                  name="text"
                  v-model="email"
                />
                <span class="error" v-if="emailError!=null">
                  {{ emailError }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="account-info-discription w-100">
          <div class="form-action accountinfo-submit ">
            <button type="button" class="back" @click="redirectToMyAccountPage()">Back</button>
            <button type="button" class="submit" @click="saveInformation()">Save</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import customerMixin from "~/mixins/customer/index.js";
import quoteMixin from "~/mixins/quote.js";
export default {
  name: "AccountInformation",
  mixins: [customerMixin, quoteMixin],
  data() {
    return {
      firstname: '',
      lastname: '',
      email: '',
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      changePassword: false,
      changeEmail: false,

      // Errors
      firstnameError: null,
      lastnameError: null,
      emailError: null,
      currentPasswordError: null,
      newPasswordError: null,
      confirmNewPasswordError: null
    }
  },
  mounted() {
    let _customer = JSON.parse(JSON.stringify(this.customer));
    this.firstname = _customer.firstname
    this.lastname = _customer.lastname
    this.email = _customer.email
    this.changePassword = this.isChangePassword
    this.changeEmail = this.isChangeEmail
  },

  methods:{
    async saveInformation() {

      if(this.checkValation()){
        let payload = {
          input:{
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email
          }
        }

        await this.updateCustomerInformation(payload)
      }
    },

    checkValation() {
      this.resetErrors()
      let validation = true
      if(this.firstname == '') {
        validation = false
        this.firstnameError = 'Firstname is required.'
      }
      if(this.lastname == '') {
        validation = false
        this.lastnameError = 'Lastname is required.'
      }
      if(this.email == '') {
        validation = false
        this.emailError = 'Email is required.'
      }else if(!this.validEmail(this.email)){
        validation = false
        this.emailError = 'Email is invalid.'
      }

      return validation
    },
    resetErrors() {
      this.firstnameError = null
      this.lastnameError = null
      this.emailError = null
      this.currentPasswordError = null
      this.newPasswordError = null
      this.confirmNewPasswordError = null
    }
  }
};
</script>
