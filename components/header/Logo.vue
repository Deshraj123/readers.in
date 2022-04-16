<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="logo">
    <nuxt-link to="/">
      <img
        class="desktop"
        src="~/assets/images/logo/brand_logo-min.png"
        alt="Reader"
        width="205"
        height="60"
      />
      <span class="hide-element">Reader</span>
    </nuxt-link>
    <span class="menu-bar" id="menu-bar" @click="manageMenuBar()"><i class="fal fa-bars"></i></span>
    <nuxt-link to="/" class="space-box mobile">
      <img
        src="~/assets/images/logo/readers-logo-white-min.png"
        alt="Reader"
        width="57"
        height="17"
      />
      <span class="hide-element">Reader</span>
    </nuxt-link>
  </div>
</template>
<script>
import HomeCategory from '~/components/header/HomeCategory.vue'
export default {
  name: "Logo",
  methods:{
    manageMenuBar() {
      let menuBar = document.querySelector('.home-category')
      let menuIcon = document.querySelector('.menu-bar')
      if(menuBar.className.indexOf('show') == -1){
        menuBar.classList.add('show')
        menuIcon.classList.add('show')
      }else{
        menuBar.classList.remove('show')
        menuIcon.classList.remove('show')
      }
      return
    },
  }
};
</script>
