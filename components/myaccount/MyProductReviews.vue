<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
	<div class="product_review-right-section myac-right-section">
		<div class="page-title-wrapper">
			<h1 class="page-title"><span>My Product Reviews</span></h1>
		</div>
		<div class="Product_review-container">
			<form class="Product_Review_form">
				<div class="table-container">
					<table id="Product-Review" class="table-wrapper">
						<thead class="">
							<tr class="row-th">
								<th class="th-date">Date</th>
								<th class="th-pname">Product Name</th>
								<th class="th-rating">Rating</th>
								<th class="th-review">Review</th>
								<th class="th-action">Action</th>
							</tr>
						</thead>
						<tbody class="product-review-body item-body">
							<tr class="item-info" v-for="(review, index) in reviews.items" :key="index">
								<td data-label="Date" class="date-td">
									<div class="item-wrapper">
										<div class="about-item">
											<span class="review-date item-info-td">
                        {{setFormatDate(review.created_at)}}
                      </span>
										</div>
									</div>
								</td>
								<td class="pname-td" data-label="Product Name">
									<span class="item-pname item-info-td">
										<nuxt-link :to="'/'+review.product.url_key" class="item-link">
                      <span class="item">{{ review.product.name }}</span>
                    </nuxt-link>
									</span>
								</td>
								<td class="rating-td" data-label="Rating">
									<span class="rating-item item-info-td">
										<Rating :data="review.average_rating" />
									</span>
								</td>
								<td class="review-td" data-label="Review">
									<span class="item-review item-info-td">
										{{ review.text }}
									</span>
								</td>
								<td class="action-td" data-label="Action">
									<div class="action-icon">
										<span class="edit-action">
											<nuxt-link :to="'/review/customer/'+review.review_id" class="link seeall-link">
                        <span>See Details</span>
                      </nuxt-link>
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
import Rating from "../review/Rating.vue";
import globalMixin from "~/mixins/others/global.js";
export default {
  name: "MyProductReviews",
  props: ['reviews'],
  mixins: [globalMixin],
  components: { Rating },
};
</script>
