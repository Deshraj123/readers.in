<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="notfound-404-container">
    <div class="title-404">
      <h2 class="title">
        4
        <span class="icon-404">
          <i class="far fa-frown-open"></i>
        </span>
        4
      </h2>
    </div>
    <div class="subtitle-404">
      <h3 class="subtitle">Page not <b class="bold">found</b></h3>
    </div>
    <div class="desc-404">
      <p class="text">
        <span class=" d-md-block">Oops! looks like you followed a bad link.</span>
        if you think this is a problem with us, please
        <nuxt-link title="Contactus" class="tell-us-link" to="/contactus">tell us.</nuxt-link>
      </p>
    </div>
    <div class="links-404-bottom">
      <nuxt-link title="Home" to="/" class="home-link link-404">Store Home</nuxt-link>
      |
      <nuxt-link title="My Account" to="/login" class="my-ac-link link-404">Login</nuxt-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "NotFound404"
};
</script>
