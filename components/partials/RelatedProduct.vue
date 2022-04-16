<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="product-related-section" v-if="selectedProduct.related_products.length > 0">
    <div class="container">
      <div class="related-products">
        <div class="related-products-title">
          <h3>Related Product</h3>
        </div>
        <div class="related-product-slider">
          <div class="product-container products-grid">
            <div class="product-items">
              <div class="swiper-container related-swiper-container">
                <div class="swiper-wrapper">
                  <!-- Slides -->
                  <div class="swiper-slide" v-for="(value, index) in selectedProduct.related_products" :key="index">
                    <div class="product-item">
                      <div class="product-item-info">
                        <div class="product-img">
                          <nuxt-link :to="value.url_key">
                            <!-- <img :src="getCloudinaryUrl(removeCacheUrl(value.image.url), 200, 227)" width="200" height="227" :alt="value.name" /> -->
                            <img :src="value.image.url" width="200" height="227" :alt="value.name" />
                          </nuxt-link>
                          <div class="add-cart" v-if="isLogin">
                            <a href="javascript::void(0)" target="_self" class="wishlist" @click="addWishlist(value, 0)">
                              <i class="fal fa-heart"></i><span class="hide-element">wishlist</span>
                            </a>
                          </div>
                        </div>
                        <div class="product-item-details">
                          <div class="rating-code">

                            <RatingCode :data="value" />

                            <div class="product-sku-col">
                              <span class="product-sku">#{{value.sku}} </span>
                            </div>
                          </div>
                          <div class="product-name-col">
                            <nuxt-link :to="value.url_key" class="product-name">{{value.name}}</nuxt-link>
                          </div>
                          <div class="product-price">
                            <div class="special-price">{{ setFormatPrice(value.price.minimalPrice.amount.value) }}</div>
                            <div class="old-price" v-if="value.special_price != null">{{ setFormatPrice(value.price.regularPrice.amount.value) }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- navigation buttons -->
                <div class="swiper-buttons">
                  <div id="related-product-prev" class="swiper-button-prev"></div>
                  <div id="related-product-next" class="swiper-button-next"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import Swiper, { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.css";
Swiper.use([Navigation, Pagination]);
import RatingCode from "~/components/partials/RatingCode.vue";
import globalMixin from "~/mixins/others/global.js";
import wishlistMixin from "~/mixins/customer/wishlist.js";

export default {
  name: "RelatedProduct",
  mixins: [globalMixin, wishlistMixin],
  props: ["selectedProduct"],
  components: {
    RatingCode
  },
	mounted() {
		new Swiper(".related-swiper-container", {
			loop: false,
			slidesPerView: 4,
			spaceBetween: 30,
			navigation: {
				// navigation arrows
				prevEl: "#related-product-prev",
				nextEl: "#related-product-next"
			},
			breakpoints: {
				// when window width is >= 1299px
				1299: {
					slidesPerView: 4,
					spaceBetween: 30
				},
				// when window width is >= 992px
				992: {
					slidesPerView: 3,
					spaceBetween: 15
				},
				// when window width is >= 769px
				769: {
					slidesPerView: 3,
					spaceBetween: 15
				},
				480: {
					slidesPerView: 2,
					spaceBetween: 10
				},
				0: {
					slidesPerView: 1,
					spaceBetween: 10
				}
			}
		});
	}
};
</script>
