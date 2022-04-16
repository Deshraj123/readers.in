<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="main myaccount-page">
    <div class="myaccount-wrapper">
      <div class="container">
        <div class="myaccount-container-main">
          <MyAccountSidebar />
          <div class="product_review-right-section myac-right-section">
            <div class="page-title-wrapper">
              <h1 class="page-title">
                <span> Mobile Number Update</span>
              </h1>
            </div>
            <span class="success-bg" v-if="customerMobileNumberSuccess!=null">
              {{customerMobileNumberSuccess}}
            </span>
            <span class="error-bg" v-if="customerMobileNumberError!=null">
              {{customerMobileNumberError}}
            </span>
            <div class="update_mobileno-container">
              <div class="input-group mno-input-group">
                <label for="mobile-no" class="label">Mobile Number</label>
                <div class="control">
                  <input
                    id="mobile-no"
                    type="number"
                    name="number"
                    class="input-text input-number"
                    v-model="mobile"
                  />
                  <span class="error" v-if="mobileError!=null">
                    {{ mobileError }}
                  </span>
                </div>
                <span class="mno_update-txt">
                  You will get all the sms on this number
                </span>
              </div>
              <div class="form-action mobileno_update_btn">
                <nuxt-link to="/customer/account" class="back">Back</nuxt-link>
                <button type="button" class="submit" @click="updateMobileNumber()">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyAccountSidebar from "~/components/myaccount/MyAccountSidebar.vue";
import customerMixin from "~/mixins/customer/index.js";
import globalMixin from "~/mixins/others/global.js";
import headMixin from "~/mixins/others/head.js";
import pagesMixin from "~/mixins/cms/pages.js";
export default {
  name: "MobileUpdate",
  middleware: ['customer'],
  mixins: [customerMixin, globalMixin, headMixin, pagesMixin],
  components: {
    MyAccountSidebar
  },
  data() {
    return {
      mobile: '', 
      // Errors
      mobileError: null,
       page: {
          identifier: "pwa-update-mobile-number"
        },
        title: "",
        meta: [],
        seoData: {}
    };
  },
    head() {
        return {
          title: this.title,
          meta: this.meta
        };
      }, 
  mounted() {
    this.mobile = this.customer.mobile
  },
  methods:{
    async updateMobileNumber() { 
      if(this.checkValidation()) {
        let payload = {
          mobile: this.mobile
        }
        await this.updateCustomerMobileNumber(payload)
      }
    }, 

    checkValidation() {
      this.mobileError = null
      let validation = true
      if(this.mobile === ""){
        this.mobileError = 'Phone number must be required.'
        validation =  false
      }else if(!this.isPhoneNumber(this.mobile)){
        this.mobileError = 'Phone number is not valid.'
        validation =  false
      }
      return validation
    },
      manageHead(){
        this.title = this.setTitle(this.seoData);
        this.meta = this.setHead(this.seoData);
      }
  },
   async fetch() {
      await this.getPage(this.page);
      this.seoData = JSON.parse(JSON.stringify(this.mobilenoUpdate));
      this.manageHead()
    }
};
</script>
