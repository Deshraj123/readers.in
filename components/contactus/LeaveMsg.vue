<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="contactus-container">
    <div class="leave-msg-section">
      <div class="page-title">
        <h1 class="title">Leave us a Message</h1>
      </div>
      <span class="error-bg d-block mb-2" v-if="error!=null">
        {{error}}
      </span>
      <span class="success-bg  d-block mb-2" v-if="success!=null">
        {{success}}
      </span>
      <div class="contactus-form">
        <div class="input-fields-form">
          <div class="name-email-group">
            <div class="input-group input-group-name">
              <label for="name" class="label">Name</label>
              <div class="control">
                <input
                  type="text"
                  class="input-text input-name"
                  id="name"
                  name="text"
                  v-model="name"
                />
                <span class="error" v-if="nameError!= null">
                  {{ nameError }}
                </span>
              </div>
            </div>
            <div class="input-group input-group-email">
              <label for="email" class="label">Email</label>
              <div class="control">
                <input
                  type="Email"
                  class="input-text input-email"
                  id="email"
                  name="email"
                  v-model="email"
                />
                <span class="error" v-if="emailError!= null">
                  {{ emailError }}
                </span>
              </div>
            </div>
          </div>
          <div class="input-group phone-number">
            <label for="phonenumber" class="label">Phone Number</label>
            <div class="control">
              <input
                type="number"
                class="input-text"
                id="phonenumber"
                name="number"
                v-model="telephone"
              />
              <span class="error" v-if="telephoneError!= null">
                  {{ telephoneError }}
                </span>
            </div>
          </div>
          <div class="input-group">
            <label for="msg" class="label">What’s on your mind?</label>
            <div class="control">
              <textarea
                id="msg"
                class="input-text input-textarea"
                rows="10"
                cols="3"
                v-model="question"
              ></textarea>
              <span class="error" v-if="questionError!= null">
                {{ questionError }}
              </span>
            </div>
          </div>
          <recaptcha
            @error="onError"
            @success="onSuccess"
            @expired="onExpired"
          />
          <span class="error" v-if="recaptchaError!= null">
            {{ recaptchaError }}
          </span>
          <div class="form-action">
            <button type="button" class="submit" @click="sendEmail()">Submit</button>
          </div>
        </div>
      </div>
    </div>
    <div class="our-add-section add-block" v-interpolation v-html="contactusAddress.content" />
  </div>
</template>

<script>
import contactMixin from "~/mixins/others/contact.js";
import blocksMixin from "~/mixins/cms/blocks.js";
export default {
  name: "LeaveMsg",
  mixins: [contactMixin, blocksMixin],
  data(){
			return {
        block: {
          identifiers: [
          "contactpage-address-section",
          ],
        }
			}
		},
		async fetch() {
			await this.getBlocks(this.block)
		},
};
</script>
