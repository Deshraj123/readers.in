<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="brands-main-wrapper" v-interpolation v-html="featuredBrand.content" />
</template>

<script>
import blocksMixin from "~/mixins/cms/blocks.js";
import Swiper, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/swiper-bundle.css";
Swiper.use([Navigation, Pagination, Autoplay]);
export default {
  name: "BrandSlider",
   mixins: [blocksMixin],
		data(){
			return {
			block: {
				identifiers: [
				"pwa-featured-Brands-slider"
				],
			}
			}
		},
		async fetch() {
			await this.getBlocks(this.block)
		},
  mounted() {
    setTimeout(function(){
      new Swiper(".brand-swiper-container", {
      loop: true,
      slidesPerView: 5,
      spaceBetween: 25,
      centeredSlides: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
      pagination: {
        el: ".brand-swiper-pagination",
        clickable: true
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      breakpoints: {
        // when window width is >= 1299px
        1299: {
          slidesPerView: 5,
          spaceBetween: 20
        },
        // when window width is >= 992px
        992: {
          slidesPerView: 4,
          spaceBetween: 15
        },
        // when window width is >= 769px
        769: {
          slidesPerView: 4,
          spaceBetween: 15
        },
        626: {
          slidesPerView: 4,
          spaceBetween: 15
        },
        320: {
          slidesPerView: 3,
          spaceBetween: 10
        }
      }
    });
    }, 1000)
  }
};
</script>
