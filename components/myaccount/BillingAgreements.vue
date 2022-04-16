<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
	<div class="billing-agreement-right-section myac-right-section">
		<div class="page-title-wrapper">
			<h1 class="page-title"><span>Billing Agreements</span></h1>
		</div>
		<div class="billing_agreement-container">
			<div class="billing-section">
				<div class="billing-dropdown dropdown-box">
					<label class="billing-label label">You will be redirected to the payment system website.</label>
					<div class="dropdown-control">
						<select name="dropdown" onclick="" id="" class="select-dropdown">
							<option value="">Please Select</option>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="3">4</option>
							<option value="3">5</option>
						</select>
					</div>
				</div>
				<div class="form-action billing-form-action ">
					<nuxt-link to="/myaccount" class="back">Back</nuxt-link>
					<button type="button" class="submit">Save</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "BillingAgreements"
};
</script>
