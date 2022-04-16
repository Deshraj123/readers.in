<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="header-bottombar">
    <div class="hbottom-logo">
      <Logo />
    </div>
    <div class="hbottom-right-content">
      <div class="hbottom-links">
        <div class="shop">
          <nuxt-link to="#" class="shop-category-btn">
            Shop by Category<i class="fal fa-chevron-down"></i>
          </nuxt-link>
          <div class="home-category" id="home-category">
            <div class="container">
              <HomeCategory />
            </div>
          </div>
        </div>
        <div class="search-icon show-mobile" @click="manageSearch()">
          <span><i class="fal fa-search"></i></span>
        </div>
        <Search />
        <div class="track mobile">
          <span>
            <nuxt-link to="/tracking" target="_blank" rel="noopener">
              <span class="hide-element">Reader</span>
              <i class="fal fa-map-marker-alt"></i>
            </nuxt-link>
          </span>
        </div>
        <div class="wishlist" v-if="isLogin">
          <nuxt-link to="/wishlist">
            <i class="fal fa-heart">
              <span class="mob-basket-count">
                  {{ wishlist.items_count }}
                </span>
            </i>
          </nuxt-link>
        </div>
        <div class="offer-section">
          <div
            class="h-offer"
            v-interpolation
            v-html="headerReaderoffer.content"
          />
          <div class="h-basket">
            <a class="minicart-icon" href="javascript:void(0)" @click.stop="manageMiniCart()">
              <i class="fal fa-shopping-basket"></i>
                 <span class="mob-basket-count">
                  {{ getCartProductQty() }}
                </span>
              <span class="my-basket">
                My basket {{ getCartProductQty() }} items
              </span>
            </a>
          </div>
          <div class="minicart-wrapper">
            <EmptyCart v-if="miniCartShow && cart.total_quantity == 0" />
            <Minicart v-if="miniCartShow && cart.total_quantity > 0" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Logo from "~/components/header/Logo.vue";
import Search from "~/components/header/Search.vue";
import Minicart from "~/components/header/Minicart.vue";
import HomeCategory from '~/components/header/HomeCategory.vue';
import EmptyCart from "~/components/header/EmptyCart";
import blocksMixin from "~/mixins/cms/blocks.js";
import quoteMixin from "~/mixins/quote.js";
import headerMixin from "~/mixins/others/header.js";
import authMixin from "~/mixins/customer/auth.js";
import wishlistMixin from "~/mixins/customer/wishlist.js";
export default {
  name: "HeaderBottombar",
    components: {
     Logo,
     Search,
     Minicart,
     HomeCategory,
     EmptyCart
   },
  mixins: [blocksMixin, quoteMixin, headerMixin, authMixin, wishlistMixin],
  data() {
    return {
      block: {
        identifiers: ["pwa-header-readeroffer"]
      }
    };
  },
  async fetch() {
    await this.getBlocks(this.block);
  },
  mounted() {
    let that = this
    let homeCategoryElement = document.getElementById('home-category');
    let menuBarElement = document.getElementById('menu-bar');
    let officeitemsElement = document.querySelectorAll('#home-category .office-items');
    let customerMenuElement = document.querySelectorAll('#home-category .menu-customer');
    let menuBar = document.querySelector('.home-category')
    let menuIcon = document.querySelector('.menu-bar')
    let minicartIcon = document.querySelector('.minicart-icon')
    let minicartWrapper = document.querySelector('.minicart-wrapper')
    let searchIcon = document.querySelector('.search-icon')
    let searchSection = document.querySelector('#searchform-section')
    document.addEventListener('click', function(event) {
      var isClickInsideHomeCategory = homeCategoryElement.contains(event.target);
      var isClickInsideMenuBar = menuBarElement.contains(event.target);
      if(!isClickInsideHomeCategory && !isClickInsideMenuBar) {
        menuBar.classList.remove('show')
        menuIcon.classList.remove('show')
      }
      officeitemsElement.forEach(function(value, index){
        if(value.contains(event.target)){
          menuBar.classList.remove('show')
          menuIcon.classList.remove('show')
        }
      })
      customerMenuElement.forEach(function(value, index){
        if(value.contains(event.target)){
          menuBar.classList.remove('show')
          menuIcon.classList.remove('show')
        }
      })
      let isClickInsideMinicartWrapper = minicartWrapper.contains(event.target);
      let isClickInsideMinicartIcon = minicartIcon.contains(event.target);
      if (!isClickInsideMinicartWrapper && !isClickInsideMinicartIcon) {
        that.closeMiniCart();
      }
      let isClickInsideSearchIcon = searchIcon.contains(event.target);
      let isClickInsideSearchSection = searchSection.contains(event.target);
      if(!isClickInsideSearchSection && !isClickInsideSearchIcon){
        searchSection.classList.remove('show')
      }

    })
  },
  methods: {
    getCartProductQty() {
      let qty = 0;
      if (Object.keys(this.cart).length > 0) {
        qty = this.cart.total_quantity;
      }
      return qty;
    },

    manageMiniCart() {
      if(this.miniCartShow) {
        this.$store.commit('others/header/setMiniCartShow', false)
        return
      }
      this.$store.commit('others/header/setMiniCartShow', true)
    },

    manageSearch() {
      let searchSection = document.querySelector('#searchform-section')
      if(searchSection.className.indexOf('show') == -1){
        searchSection.classList.add('show')
      }else{
        searchSection.classList.remove('show')
      }
    }
  }
};
</script>
