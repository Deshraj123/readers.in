<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
	<div class="mydownloadable-right-section myac-right-section">
		<div class="page-title-wrapper">
			<h1 class="page-title"><span>My Downloadable Products</span></h1>
		</div>
		<div class="downloadable-products-container">
			<form class="download_product_form">
				<div class="table-container">
					<table id="#" class="table-wrapper">
						<thead class="">
							<tr class="row-th">
								<th class="th-order">Order</th>
								<th class="th-date">Date</th>
								<th class="th-title">Title</th>
								<th class="th-status">Status</th>
								<th class="th-action">Remaining Download</th>
							</tr>
						</thead>
						<tbody class="downloadable-product-body item-body">
							<!-- shopping cart contents -->
							<tr class="item-info">
								<td class="item-td" data-label="Order">
									<div class="item-wrapper">
										<div class="about-item">
											<span class="item-code item-info-td">0000001</span>
										</div>
									</div>
								</td>
								<td class="date-td" data-label="Date">
									<span class="item-date item-info-td">
										09/1/2021
									</span>
								</td>
								<td class="name-td dwnload-td" data-label="Title">
									<div class="download-item">
										<span class="item-name item-info-td">
											product title
										</span>
										<nuxt-link to="#" class="download-link link"
											><i class="far fa-cloud-download-alt"></i><span class="dwnld-name">Episode 3</span></nuxt-link
										>
									</div>
								</td>
								<td class="status-td" data-label="Status">
									<span class="status-item item-info-td">
										pending
									</span>
								</td>
								<td class="remaining-dwnld-td" data-label="Remaining Download">
									<div class="dwnld">
										<span class="action">
											<nuxt-link to="#" class="link vieworder-link">Unlimited</nuxt-link>
										</span>
									</div>
								</td>
							</tr>
							<tr class="item-info">
								<td class="item-td" data-label="Order">
									<div class="item-wrapper">
										<div class="about-item">
											<span class="item-code item-info-td">0000001</span>
										</div>
									</div>
								</td>
								<td class="date-td" data-label="Date">
									<span class="item-date item-info-td">
										09/1/2021
									</span>
								</td>
								<td class="name-td dwnload-td" data-label="Title">
									<div class="download-item">
										<span class="item-name item-info-td">
											product title
										</span>
										<nuxt-link to="#" class="download-link link"
											><i class="far fa-cloud-download-alt"></i><span class="dwnld-name">Episode 3</span></nuxt-link
										>
									</div>
								</td>
								<td class="status-td" data-label="Status">
									<span class="status-item item-info-td">
										pending
									</span>
								</td>
								<td class="remaining-dwnld-td" data-label="Remaining Download">
									<div class="dwnld">
										<span class="action">
											<nuxt-link to="#" class="link vieworder-link">Unlimited</nuxt-link>
										</span>
									</div>
								</td>
							</tr>
							<tr class="item-info">
								<td class="item-td" data-label="Order">
									<div class="item-wrapper">
										<div class="about-item">
											<span class="item-code item-info-td">0000001</span>
										</div>
									</div>
								</td>
								<td class="date-td" data-label="Date">
									<span class="item-date item-info-td">
										09/1/2021
									</span>
								</td>
								<td class="name-td dwnload-td" data-label="Title">
									<div class="download-item">
										<span class="item-name item-info-td">
											product title
										</span>
										<nuxt-link to="#" class="download-link link"
											><i class="far fa-cloud-download-alt"></i><span class="dwnld-name">Episode 3</span></nuxt-link
										>
									</div>
								</td>
								<td class="status-td" data-label="Status">
									<span class="status-item item-info-td">
										pending
									</span>
								</td>
								<td class="remaining-dwnld-td" data-label="Remaining Download">
									<div class="dwnld">
										<span class="action">
											<nuxt-link to="#" class="link vieworder-link">Unlimited</nuxt-link>
										</span>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="dwnlodable-product-item-list  form-action">
					<div class=" item-listing-no">
						<span class="item-no">item 1</span>
					</div>
					<div class="dwnloadable-item-dropdown">
						<label for="item" class="label">Show Per Page:</label>
						<select class="item-no-dropdown" name="item-value" id="item_value">
							<option value="1">1</option>
							<option value="5">5</option>
							<option value="10">10</option>
							<option value="20">20</option>
						</select>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
export default {
	name: "DownloadableProducts"
};
</script>
