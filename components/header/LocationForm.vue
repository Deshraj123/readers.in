<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
	<div class="drpdwn-list">
		<form class="header-location-form" action="">
      <div class="shopping">
        <label class="label" for="location_city">Select your city to start shopping</label>
        <div class="city-chkbox">
          <select name="cities" id="location_city">
            <option value="500 039, Hyderabad">500 039, Hyderabad</option>
            <option value="500 542, Hyderabad">600 542, Chennai</option>
            <option value="500 309, Hyderabad">700 309, kolkata</option>
          </select>
        </div>
      </div>
			<div class="pincode">
        <label class="hide-element label" for="location_pincode">Enter your area / apartment / pincode</label>
				<input type="text" name="pincode" id="location_pincode" placeholder="Ennter your area / apartment / pincode" />
			</div>
			<div class="frm-button">
				<button type="button" value="Submit" class="btn-submit">Submit</button>
			</div>
		</form>
	</div>
</template>
<script>
export default {
	name: "LocationForm"
};
</script>
