<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="product-slider-section">
    <div class="main-slider">
      <div class="product-top-slider" v-if="product.media_gallery.length > 0">
        <div class="swiper-container product-swiper-container">
          <!-- Additional required wrapper -->
          <div class="swiper-wrapper">
            <!-- Slides -->
            <div class="swiper-slide" v-for="(value, index) in product.media_gallery" :key="index">
              <div class="home-banner-item">
                <div class="home-banner-img">
                  <!-- <img :src="getCloudinaryUrl(removeCacheUrl(value.url), 561, 488)" width="561" height="488" :alt="value.name" /> -->
                  <img :src="value.url" :alt="value.name" />
                </div>
              </div>
            </div>
          </div>
          <!-- If we need pagination -->
          <div class="product-swiper-pagination"></div>
        </div>
        <!-- navigation buttons -->
        <div class="product-swiper-buttons">
          <div id="product-media-prev" class="swiper-button-prev"></div>
          <div id="product-media-next" class="swiper-button-next"></div>
        </div>
      </div>

      <div class="swiper-container productmini-swiper-container" v-if="product.media_gallery.length > 0">
        <!-- Additional required wrapper -->
        <div class="swiper-wrapper">
          <!-- Slides -->
          <div class="swiper-slide" v-for="(value, index) in product.media_gallery" :key="index">
            <div class="home-banner-item">
              <div class="home-banner-img">
                <!-- <img :src="getCloudinaryUrl(removeCacheUrl(value.url), 120, 120)" width="120" height="120" :alt="value.name" />-->
                <img :src="value.url" width="120" height="120" :alt="value.name" />
              </div>
            </div>
          </div>
        </div>
        <!-- If we need pagination -->
        <div class="productmini-swiper-pagination"></div>

        <!-- navigation buttons -->
        <div class="productmini-swiper-buttons">
          <div id="productmini-media-prev" class="swiper-button-prev"></div>
          <div id="productmini-media-next" class="swiper-button-next"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import Swiper, { Navigation, Pagination, Thumbs } from "swiper";
import "swiper/swiper-bundle.css";
Swiper.use([Navigation, Pagination, Thumbs]);
import globalMixin from "~/mixins/others/global.js";
export default {
  name: "ProductMedia",
  props: ["product"],
  mixins: [globalMixin],
	mounted() {
		var productThumbSLider = new Swiper(".productmini-swiper-container", {
			loop: false,
			slidesPerView: 5,
			spaceBetween: 10,
			navigation: {
				prevEl: "#productmini-media-prev",
				nextEl: "#productmini-media-next"
			}
		});
    var productBaseSLider = new Swiper(".product-swiper-container", {
			loop: false,
			slidesPerView: 1,
			pagination: {
				el: ".product-swiper-pagination",
				clickable: true
			},
			navigation: {
				prevEl: "#product-media-prev",
				nextEl: "#product-media-next"
			},
      thumbs: {
          swiper: productThumbSLider,
      },
		});
	}
};
</script>
