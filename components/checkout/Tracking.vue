<template>
  <div class="post_order_wrap-main">
    <div class="tracking-status">
      <img
        class="tracking-img"
        src="~/assets/images/checkout/track_img.png"
        alt="Reader"
        width="83"
        height="106"
      />
      Track status of your shipment
    </div>
    <div class="post_order_info">
      <div class="track_bg">
        <div class="pull-left">
          <label class="search-left">Search By:</label>
        </div>
        <div class="radio_box">
          <input
            type="radio"
            id="radio-label"
            name="shipping-method"
            class="input-radio"
            value="order"
            v-model="picked"
          />
          <label for="radio-label" class="order-label">
            Order ID
          </label>
        </div>
        <div class="radio_box">
          <input
            type="radio"
            id="radio-label2"
            name="shipping-method"
            class="input-radio"
            value="aws"
            v-model="picked"
          />
          <label for="radio-label2" class="order-label">
            AWB
          </label>
        </div>
      </div>
      <div class="order_input">
        <input
          type="text"
          class="input-text"
          placeholder="Enter Order ID/AWB number to search"
          v-model="inputValue"
        />
        <span class="error" v-if="showDetails && trackings.length == 0" >Tracking details not found....</span>
      </div>
      <div class="submit-button-bg">
        <button type="button" class="action submit-button" @click="getTrackingSubmit()">Submit</button>
      </div>
    </div>
    <div class="post_order_wrap">
      <table class="tracking-table" v-if="showDetails && trackings.length > 0">
        <tr>
          <th>Order Number</th>
          <th>Title</th>
          <th>Tracking Code</th>
          <th>Tracking Url</th>
        </tr>
        <tr v-for="(value, index) in trackings" :key="index">
          <td data-rwd-label="No.">{{ value.order_number }}</td>
          <td data-rwd-label="No.">{{ value.title }}</td>
          <td data-rwd-label="Tracking Code">{{ value.track_number }}</td>
          <td data-rwd-label="Tracking Url">
            <a class="url-tracking" :href="value.url" target="_blank">{{ value.url }}</a>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import trackingMixin from "~/mixins/others/tracking.js";
export default {
  name: "Tacking",
  mixins: [trackingMixin],
  data(){
    return {
      picked: 'order',
      inputValue: '',
      showDetails: false
    }
  },
  mounted(){
    this.inputValue = '',
    this.showDetails = false
  },
  methods:{
    async getTrackingSubmit(){
      this.showDetails = false
      let payload = {
        order_number: this.inputValue
      }
      if(this.picked == 'aws') {
        payload = {
          aws: this.inputValue
        }
      }

      await this.getTrackings(payload)
      this.showDetails = true
    }
  }
};
</script>
