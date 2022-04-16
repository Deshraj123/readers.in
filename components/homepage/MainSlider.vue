<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
	<div class="home-banner-wrapper" v-interpolation v-html="homeTopbanner.content" />
</template>
<script>
import Swiper, { Navigation, Pagination, Autoplay } from "swiper";
import blocksMixin from "~/mixins/cms/blocks.js";
import "swiper/swiper-bundle.css";
Swiper.use([Navigation, Pagination, Autoplay]);
export default {
  name: "MainSlider",
  mixins: [blocksMixin],
  data(){
    return {
      block: {
        identifiers: [
         "pwa-home-topbanner"
        ],
      }
    }
  },
  async fetch() {
    await this.getBlocks(this.block)
  },
	mounted() {
		var menu = ["Offer on Sale", "Offer on The Christmas", "Office supplies", "Corporate Gifts"];
		new Swiper(".homebanner-swiper-container", {
			loop: true,
        speed: 1000,
       autoplay: {
        delay: 2500,
				disableOnInteraction: false,
			},
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
				renderBullet: function(index, className) {
					return '<span class="' + className + '">' + menu[index] + "</span>";
				}
			}
		});
	}
};
</script>
