<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="progressbar-section">
    <div class="progressbar-container container">
      <ul class="progressbar">
        <li class="active progress-step first-item">
          <span>Shipping</span>
        </li>
        <li class="progress-step" :class="{active: steps.payment || steps.thank_you}">
          <span>Payment Method</span>
        </li>
        <li class="progress-step" :class="{active: steps.thank_you}">
          <span>Thank You</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import quote from "~/mixins/quote.js";
export default {
  name: "ProgressBar",
  mixins: [quote],
};
</script>
