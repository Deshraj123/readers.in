<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>

    <div class="product-info-detailed" id="product-info-detail">
      <div class="container">
        <div class="product-data">
          <b-card no-body>
            <b-tabs card>
              <b-tab title="Product Details" active v-if="selectedProduct.description.html != ''">
                <b-card-text v-interpolation v-html="selectedProduct.description.html" />
              </b-tab>
              <b-tab title="Specifications">
                <b-card-text>
                  <table class="table table-striped specificaton-wrapper">
                    <tbody>
                      <tr v-if="selectedProduct.hsn_code != null">
                        <td class="title">HSN code</td>
                        <td class="value">{{ selectedProduct.hsn_code}}</td>
                      </tr>
                      <tr v-if="selectedProduct.pkg_dtl != null">
                        <td class="title">Package Information</td>
                        <td class="value">{{ selectedProduct.pkg_dtl}}</td>
                      </tr>
                      <tr v-if="selectedProduct.brand != null">
                        <td class="title">Brand</td>
                        <td class="value">{{ selectedProduct.brand}}</td>
                      </tr>
                      <tr v-if="selectedProduct.vendor_item_code != null">
                        <td class="title">Vendor Item Code</td>
                        <td class="value">{{ selectedProduct.vendor_item_code}}</td>
                      </tr>
                    </tbody>
                  </table>
                </b-card-text>
              </b-tab>
              <b-tab :title="getReviewsTitle()" class="product-review-tab">
                <b-card-text>
                  <div class="customer-review-section" v-if="selectedProduct.reviews.items.length > 0">
                    <div class="review-title">Customer Reviews</div>
                    <!-- ----------------first  reviewer start------------ -->
                    <div class="customer-review-detail"
                      v-for="(review, index) in selectedProduct.reviews.items" :key="index"
                    >
                      <div class="product-quality-title">
                        {{ review.text }}
                      </div>
                      <div class="product-ratting">
                        <div class="rating-title">
                          Rating:
                        </div>
                        <div class="rating-star">
                          <Rating :data="review.average_rating"/>
                        </div>
                      </div>
                      <p class="review-description">
                        {{ review.summary}}
                      </p>
                      <div class="reviewer-detail">
                          <span class="review-title">Review by : </span>
                          <span class="reviewer-name">{{ review.nickname }}</span>
                      </div>
                      <div class="reviewer-detail">
                          <span class="review-title">Date : </span>
                          <span class="review-date">{{ setFormatDate(review.created_at ) }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="customer-review-section">
                    <!-- ----------------Your review start------------ -->
                    <div class="customer-review-detail your-review-section" id="add-new-product-review">
                      <div class="review-title">You're reviewing:</div>
                      <div class="product-name">
                        {{ selectedProduct.name }}
                      </div>
                      <div class="rating-title">Your Rating <span>*</span></div>
                      <div class="product-ratting">
                        <div class="rating-title">
                          Quality:
                        </div>

                        <div class="rating-star">
                          <ReviewRating :id="ratingCode" @updateStarRating="setStarRating" :dataValue="[1, 2, 3, 4, 5]"/>
                        </div>
                      </div>
                      <div class="product-ratting">
                        <div class="rating-title">
                          Price:
                        </div>
                        <div class="rating-star">
                          <ReviewRating :id="priceCode" @updateStarRating="setStarRating" :dataValue="[11, 12, 13, 14, 15]"/>
                        </div>
                      </div>

                      <form class="review-form" @submit.prevent="addNewReview()">
                        <div class="form-group">
                          <label for="name">Nickname<span>*</span></label>
                          <input
                            type="text"
                            class="form-control"
                            id="name"
                            name="name"
                            v-model="nickName"
                          />
                          <span class="error" v-if="nickNameError!=null">{{nickNameError}}</span>
                        </div>
                        <div class="form-group">
                          <label for="Summary">Summary<span>*</span></label>
                          <input
                            type="text"
                            class="form-control"
                            id="Summary"
                            name="Summary"
                            v-model="summary"
                          />
                          <span class="error" v-if="summaryError!=null">{{summaryError}}</span>
                        </div>
                        <div class="form-group">
                          <label for="review-textarea">Review<span>*</span></label>
                          <textarea
                            id="review-textarea"
                            name="textarea"
                            rows="8"
                            cols="80"
                            v-model="text"
                          ></textarea>
                          <span class="error" v-if="textError!=null">{{textError}}</span>
                        </div>
                        <div class="review-btn">
                          <button class="submit" type="submit">Submit Review</button>
                        </div>
                        <div class="successful_container" v-if="createReviewSuccess!=null">
                          <span class="successful">{{createReviewSuccess}}</span>
                        </div>
                      </form>
                    </div>
                  </div>
                </b-card-text>
              </b-tab>
            </b-tabs>
          </b-card>
        </div>
      </div>
    </div>

</template>
<script>
import Rating from "../review/Rating.vue";
import ReviewRating from "~/components/product/ReviewRating.vue";
import globalMixin from "~/mixins/others/global.js";
import productsMixin from "~/mixins/catalog/products.js";
export default {
  name: "ProductDescription",
  props: ["selectedProduct"],
  mixins: [globalMixin, productsMixin],
  components: {
    ReviewRating,
    Rating
  },
  data(){
    return {
      ratingCode: 'rating',
      priceCode: 'price',
      rating: 5,
      price: 5,

      // Review
      nickName: '',
      summary: '',
      text: '',

      // Error
      nickNameError: null,
      summaryError: null,
      textError: null
    }
  },
  methods:{
    getReviewsTitle() {
      let response ='Reviews '
      if(this.product.review_count > 0){
        response+='('+this.product.review_count+')'
      }
      return response
    },
    setStarRating(data) {
      if(data.id === this.ratingCode) {
        this.rating = data.value
      }
      if(data.id === this.priceCode) {
        this.price = data.value
      }
    },
    resetError() {
      this.nickNameError = null
      this.summaryError = null
      this.textError = null
    },
    checkValidationForReviewForm() {
      this.resetError();
      let validation = true

      if(this.nickName == '') {
        validation = false
        this.nickNameError = "Nickname is required."
      }
      if(this.summary == '') {
        validation = false
        this.summaryError = "Summary is required."
      }
      if(this.text == '') {
        validation = false
        this.textError = "Text is required."
      }

      return validation
    },
    async addNewReview() {
      if(this.checkValidationForReviewForm()){
        let payload = {
          sku: this.product.sku,
          nickname: this.nickName,
          text: this.text,
          summary: this.summary,
          ratings: [
            {
              id: '3',
              value_id: this.price.toString()
            },
            {
              id: '1',
              value_id: this.rating.toString()
            }
          ]
        }
        await this.setNewProductReview(payload)
      }
    }
  }
};
</script>


