<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
	<div class="spayment_method-right-section myac-right-section">
		<div class="page-title-wrapper">
			<h1 class="page-title"><span>Stored Payment Methods</span></h1>
		</div>
		<div class="payment_method-container">
			<form class="payment_method_form">
				<div class="table-container">
					<table id="payment-method" class="table-wrapper ">
						<thead class="">
							<tr class="row-th">
								<th class="th-card-no">Card Number</th>
								<th class="th-date">Expiration Date</th>
								<th class="th-payment-type">Type</th>
								<th class="th-action">Action</th>
							</tr>
						</thead>
						<tbody class="payment-method-body item-body">
							<tr class="item-info">
								<td class="cardno-td" data-label="Card Number">
									<div class="item-wrapper">
										<div class="about-item">
											<span class="card-number item-info-td">0000001</span>
										</div>
									</div>
								</td>
								<td class="date-td" data-label="Expiration Date">
									<span class="item-exdate item-info-td">
										09/1/2021
									</span>
								</td>
								<td class="type-td" data-label="Type">
									<span class="payment-item item-info-td">
										<nuxt-link to="#"
											><span><img src="~/assets/images/visa-min.png"/></span
										></nuxt-link>
									</span>
								</td>
								<td class="action-td" data-label="Action">
									<div class="action-icon">
										<span class="edit-action">
											<nuxt-link to="#" class="link vieworder-link"><i class="fal fa-trash"></i></nuxt-link>
										</span>
									</div>
								</td>
							</tr>
							<tr class="item-info">
								<td class="cardno-td" data-label="Card Number">
									<div class="item-wrapper">
										<div class="about-item">
											<span class="card-number item-info-td">0000001</span>
										</div>
									</div>
								</td>
								<td class="date-td" data-label="Expiration Date">
									<span class="item-exdate item-info-td">
										09/1/2021
									</span>
								</td>
								<td class="type-td" data-label="Type">
									<span class="payment-item item-info-td">
										<nuxt-link to="#"
											><span><img src="~/assets/images/mastercard-min.png"/></span
										></nuxt-link>
									</span>
								</td>
								<td class="action-td" data-label="Action">
									<div class="action-icon">
										<span class="edit-action">
											<nuxt-link to="#" class="link vieworder-link"><i class="fal fa-trash"></i></nuxt-link>
										</span>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
export default {
	name: "StorePaymentMethod"
};
</script>
