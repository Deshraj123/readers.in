<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="myorder-right-section myac-right-section">
    <div class="not-found-wrapper">
        <span class="not-found-text">{{ text }}</span>
    </div> 
  </div>
</template>

<script>
export default {
  name: "NotFoundData",
  props: ["text"]
};
</script>
