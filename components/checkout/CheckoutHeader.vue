<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
    <div>
          <div class="checkout-header">
              <div class="container">
                  <div class="row align-items-center">
                      <div class="col-4 col-md-5">
                          <div class="logo">
                                <nuxt-link to="/"><img  class="desktop" src="~/assets/images/logo/brand_logo-min.png" alt="Reader" width="205" height="60"></nuxt-link>
                            </div>
                      </div>
                      <div class="col-8 col-md-7">
                          <ul class="list-unstyled checkout-header-link">
                              <li class="phone-number">
                                  	<a href="tel:+919948722275"><i class="fal fa-phone-alt link-icon"></i>9948722275</a>
                              </li>
                             <li class="login" v-if="!isLogin">
                                    <nuxt-link to="/login"><i class="far fa-user-alt link-icon"></i>
                                    Login
                                    </nuxt-link>
                                </li>
                                <li class="login user-loggedin" v-if="isLogin">
                                    <nuxt-link to="/customer/account" class="user-name">
                                    <i class="far fa-user-alt link-icon"></i>
                                    {{ customer.firstname }}
                                    </nuxt-link>
                                </li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
    </div>
</template>
<script>
import authMixin from "~/mixins/customer/auth.js";
import customerIndexMixin from "~/mixins/customer/index.js";
export default {
    name: "CheckoutHeader",
    mixins: [authMixin,customerIndexMixin],

};
</script>
