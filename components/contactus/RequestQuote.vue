<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="request-quote-container">
    <div class="request-quotation">
      <div class="page-title-wrapper">
        <h1 class="page-title">Request for quote</h1>
      </div>
      <div class="request-msg">
      <span class="error-bg" v-if="requestQuoteError!= null">
        {{requestQuoteError}}
      </span>
      <span class="success-bg" v-if="requestQuoteSuccess!= null">
        {{requestQuoteSuccess}}
      </span>
      </div>
      <div class="quotetion-form">
        <!-- <div class="input-fields-form"> -->
          <div class="left-right-section-main">
        <div class="left-section-form">
          <div class="input-group input-group-cname">
            <label for="cname" class="label cname-label"> Company Name</label>
            <div class="control">
              <input
                type="text"
                class="input-text input-cname"
                id="cname"
                name="cname"
                v-model="companyName"
              />
              <span class="error" v-if="companyNameError!=null">{{companyNameError}}</span>
            </div>
          </div>
          <div class="input-group input-group-email">
            <label :for="'quotation-Email'" class="label email-label">Email</label>
            <div class="control">
              <input
                type="email"
                class="input-text input-email"
                :id="'quotation-Email'"
                name="quotation-Email"
                v-model="email"
              />
              <span class="error" v-if="emailError!=null">{{emailError}}</span>
            </div>
          </div>
          <div class="product-details" v-if="productDetails.length > 0">
            <div class="input-group input-group-prodetails">
              <label class="label">Product Details </label>
              <div class="control prodetail-input pro-input-one" v-for="(detail, index) in productDetails" :key="index">

                <div class="prodetail-input pro-input-one">
                  <input
                    :id="'product-detail-name' + index"
                    type="text"
                    class="input-text input-email"
                    v-model="detail.name"
                    :placeholder="detail.placeholder.name"
                    @keyup="searchProduct($event, index)"
                  />
                  <div class="searchresult-item-detail" v-if="searchRequestQuoteProductsShow && currentSearchInputKey == index">
                    <div class="searchresult-items" v-if="searchRequestQuoteProducts.length > 0">
                      <div class="items" v-for="(pvalue, pindex) in searchRequestQuoteProducts" :key="pindex" @click="selectCurrentProduct(pvalue.name, index)">
                        {{ pvalue.name }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="prodetail-input pro-input-one pro-input-qty">
                  <label :for="'proddetail-qty' + index" class="hide-element lebel">pro-input-qty</label>
                  <input
                    :id="'proddetail-qty' + index"
                    type="number"
                    class="input-text input-email"
                    v-model="detail.qty"
                    :placeholder="detail.placeholder.qty"
                  />
                </div>
                <div class="prodetail-btn">
                  <span>
                    <button type="button" class="add-btn" @click="addNewProductDetails()" v-if="(index+1) === productDetails.length">
                      <i class="fal fa-plus"></i><span class="hide-element">add-btn</span>
                    </button>
                    <button type="button" class="minus-btn" @click="removeProductDetails(index)" v-else>
                      <i class="fal fa-minus"></i><span class="hide-element">minus-btn</span>
                    </button>
                  </span>
                </div>
              </div>
              <span class="error" v-if="productDetailsError!=null">
                {{productDetailsError}}
              </span>
            </div>
          </div>
          <div class="input-group input-group-reqment">
            <label for="requirment" class="abt-reqmnt">
              About your requirement
            </label>
            <div class="control">
              <textarea  id="requirment" class="abt-reqtxt" v-model="additionalInfo"></textarea>
            </div>
          </div>
          <div class="more-info">
            <span>
              20+ Employees? Interested in Readers Business Corporate
              Account?
            </span>
            <div class="moreinfo-checkbox check-input">
              <input
                type="checkbox"
                id="checkbox"
                class="info-checkbox check-input"
                v-model="budget"
              />
              <label for="checkbox" class="label check-label">Yes</label><nuxt-link to="/createaccount" class="more-info-link">more information</nuxt-link>
            </div>
          </div>
        </div>
        <div class="right-section-form">
          <div class="input-group input-group-cname">
            <label for="cname" class="label contact-name-label">
              Contact Name
            </label>
            <div class="control">
              <input
                type="text"
                class="input-text input-cname"
                id="cname"
                name="cname"
                v-model="contactName"
              />
              <span class="error" v-if="contactNameError!=null">{{contactNameError}}</span>
            </div>
          </div>
          <div class="input-group input-group-cnumber">
            <label for="cnumber" class="label">Phone Number</label>
            <div class="control">
              <input
                type="text"
                class="input-text input-number"
                id="cnumber"
                name="cnumber"
                v-model="telephone"
              />
              <span class="error" v-if="telephoneError!=null">{{telephoneError}}</span>
            </div>
          </div>
          <div class="fupload-section">
            <div class="input-group input-group-fileupload">
              <label for="fupload" class="label">
                Upload document:
                  <span v-if="Object.keys(file).length > 0">
                    {{ file.name }}
                  </span>
              </label>
              <div class="control">
                <div class="dropzone-wrapper">
                  <div class="file-drop">
                    <div class="dropzone-file-img">
                      <i class="fal fa-long-arrow-up"></i>
                      <img src="~/assets/images/upload_u_img.png" width="36" height="38" alt="drop-img" />
                      <p>Drag and Drop file or</p>
                    </div>
                    <div class="control file-control">
                      <input
                        id="file"
                        type="file"
                        name="file"
                        class="file-upld inputfile"
                        ref="file"
                        v-on:change="handleFileUpload()"
                        accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, text/plain"
                      />
                      <label for="file">Browser</label>
                    </div>
                    <span class="files-format">Allowed formats .csv, .xlx, .xlxs, .txt only, not to exceed more than 20kb each.</span>
                  </div>
                </div>
              </div>
              <span class="error" v-if="fileError != null">
                {{ fileError }}
              </span>
            </div>
          </div>
        </div>
          </div>
        <div class="form-action for-desktp-submit">
          <button type="button" class="submit" @click="sendQuoteRequest()">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import requestQuoteMixin from "~/mixins/others/requestQuote.js";
export default {
  name: "RequestQuote",
  mixins: [requestQuoteMixin],
  data(){
    return {
      companyName: "",
      contactName: "",
      email: "",
      telephone: "",
      productDetails: [],
      additionalInfo: "",
      budget: false,
      maximumFileSize: 20480,
      file:{},
      currentSearchInputKey: 0,

      companyNameError: null,
      contactNameError: null,
      emailError: null,
      telephoneError: null,
      productDetailsError: null,
      fileError: null
    }
  },

  mounted() {
    this.addNewProductDetails()
  },

  methods:{

    addNewProductDetails() {
      this.productDetails.push({
        name: "",
        qty: "",
        placeholder: {
          name: "Product name",
          qty: "Qty"
        }
      })
    },

    removeProductDetails(index) {
      this.productDetails.splice(index, 1);
    },

    handleFileUpload(){
      let that = this
      that.file = {}
      that.fileError = null
      let file = that.$refs.file.files[0]
      if(that.maximumFileSize >= file.size) {
        that.file['name'] = file.name
        const reader = new FileReader();
        reader.addEventListener("load", function () {
          // convert image file to base64 string
          that.file['base64_encoded_file'] = reader.result
        }, false);
        reader.readAsDataURL(file);
      }else{
        that.fileError = 'File size is exceed.'
      }
    },

    async sendQuoteRequest() {
      if(this.checkValidation()) {

        let payload = {
          companyName: this.companyName,
          contactName: this.contactName,
          email: this.email,
          telephone: this.telephone,
          message: this.additionalInfo,
          budget: this.budget,
          file: this.file,
          productDetails: this.getProductDetailsData(this.productDetails),
        }

        await this.quoteRequestSubmit(payload)
      }
    },

    getProductDetailsData(data) {
      let products = []
      data.forEach(function(value){
        products.push({
          name: value.name,
          qty: value.qty
        })
      })
      return products
    },

    checkValidation() {
      let that = this
      that.resetError()
      let validation = true
      if(that.companyName == '') {
        validation = false
        that.companyNameError = 'Company name is required.'
      }
      if(that.contactName == '') {
        validation = false
        that.contactNameError = 'Contact name is required.'
      }
      if(that.email == '') {
        validation = false
        that.emailError = 'Email address is required.'
      }else if(!that.validEmail(that.email)){
        validation = false
        that.emailError = 'Email address is not valid.'
      }

      if(that.telephone != '' && !that.isPhoneNumber(that.telephone)) {
        validation = false
        that.telephoneError = 'Phone number is not valid.'
      }

      that.productDetails.forEach(function(value){
        if(value.name != '' && value.qty == '') {
          validation = false
          that.productDetailsError = 'Please enter qty.'
        }
        if(value.name == '' && value.qty != '') {
          validation = false
          that.productDetailsError = 'Please enter product name.'
        }
      })
      return validation
    },

    resetError() {
      this.companyNameError = null
      this.contactNameError = null
      this.emailError = null
      this.telephoneError = null
      this.productDetailsError = null
    },

    async searchProduct(event, key) {
      this.currentSearchInputKey = key
      let searchValue = event.target.value;
      this.searchKeyword = searchValue
      let payload = {
        filter: {
          name: {
            match: searchValue
          }
        },
        pageSize: 5
      };
      await this.getSearchProducts(payload);

      // Add my current seach value
      let items = this.searchRequestQuoteProducts
      if(searchValue!= ""){
        let currentObject = {
          name: searchValue
        }
        await this.$store.commit("others/requestQuote/setRequestQuoteSearchProducts", [currentObject].concat(items));
      }else{
        await this.$store.commit("others/requestQuote/setRequestQuoteSearchProducts", []);
      }
      
    },

    selectCurrentProduct(productName, key) {
      this.productDetails[key].name = productName
      this.$store.commit("others/requestQuote/setRequestQuoteSearchProductsShow", false)
    }
  }
};
</script>
