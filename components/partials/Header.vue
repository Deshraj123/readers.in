<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <header>
    <div class="header-top">
      <div class="container">
        <HeaderTopbar />
      </div>
    </div>
    <div class="header-middle">
      <div class="container">
        <HeaderMiddlebar />
      </div>
    </div>
    <div class="header-bottom" id="navbar">
      <div class="container">
        <HeaderBottombar />
      </div>
    </div>
  </header>
</template>
<script>
import HeaderTopbar from '~/components/header/HeaderTopbar.vue'
import HeaderMiddlebar from '~/components/header/HeaderMiddlebar.vue'
import HeaderBottombar from '~/components/header/HeaderBottombar.vue'
export default {
  name: 'Header',
  components: {
    HeaderTopbar,
    HeaderMiddlebar,
    HeaderBottombar,
  },
  mounted() {
		this.$nextTick(function() {
			window.addEventListener("scroll", function() {
        var navbar = document.getElementById("navbar");

        if(navbar) {
          var nav_classes = navbar.classList;

          if (document.documentElement.scrollTop >= 120) {
            if (nav_classes.contains("shrink") === false) {
              nav_classes.toggle("shrink");
            }
          } else {
            if (nav_classes.contains("shrink") === true) {
              nav_classes.toggle("shrink");
            }
          }
        }

			});
		});
	}
}
</script>
