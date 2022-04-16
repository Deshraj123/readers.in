<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="pagination-section">
    <div class="brand-back-color">
      <div class="container">
        <div class="brand-pagination-container">
          <div class="brand-pagination" v-if="letters.length > 0">
            <div class="pagination-btn  form-action">
                  <a class="allbrand-link"
                    href="javascript:void(0)"
                    v-bind:class="isActiveLetter('All Brands')"
                    @click="showBrands()"
                    >
                  <span>All Brands</span>
                  </a>
            </div>
            <div class="pagination-link-container">
              <a
                href="javascript:void(0)"
                v-for="(letter, index) in letters"
                :key="index"
                v-bind:class="isActiveLetter(letter)"
                @click="showBrands(letter)"
              >
                <span>{{ letter }}</span>
              </a>
            </div>
          </div>
          <div class="brand-search-col">
            <div class="search-action">
              <span class="search-title">Search All Brand</span>
              <div class="input-search">
                <v-select :options="brands" @input="setSelected"></v-select>
                <div class="action">
                  <button type="button" class="search-icon">
                    <i class="fal fa-search search-i"></i>
                    <span class="hide-element">search-icon</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container brand-category" v-if="brands.length > 0">
      <div class="brand-category-container">
        <div
          class="brand-box brand-item-container"
          v-for="(brand, index) in brands" :key="index"
          v-if="brand.display"
        >
          <div class="brand1 brand">
            <nuxt-link :to="'/brands/'+brand.url_key" class="brand-box">
              <img
                :src="brand.img"
                height="70"
                width="70"
                :alt="brand.alt"
              />
            </nuxt-link>
            <nuxt-link :to="'/brands/'+brand.url_key" class="brand-item-link">
              <span class="brand-items brand-item-number" v-if="brand.cnt > 0">
                {{ brand.cnt}}
              </span>
            </nuxt-link>
          </div>
          <div class="brand-name">
            <nuxt-link :to="'/brands/'+brand.url_key" class="brand-name-link">
              <span>{{ brand.label}}</span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import brandsMixin from "~/mixins/others/brands.js";
export default {
  name: "BrandPagination",
  mixins: [brandsMixin],
  data() {
    return {
      activeLetter: 'All Brands'
    }
  },

  methods:{
    isActiveLetter(letter) {
      if(this.activeLetter == letter) {
        return 'pagination-link link-a active'
      }
      return 'pagination-link link-a'
    },

    async setSelected(value) {
      await this.$router.push({ path: "/brands/"+value.code })
    },

    async showBrands(letter = null) {
      this.activeLetter = 'All Brands';
      if(letter!=null){
        this.activeLetter = letter;
      }

      let params = {
        filter: {
          letter: letter
        }
      }
      await this.getBrands(params)
    }
  }
};
</script>
