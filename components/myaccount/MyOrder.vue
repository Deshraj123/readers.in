<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
	<div class="myorder-right-section myac-right-section">
		<div class="page-title-wrapper">
			<h1 class="page-title"><span>My Orders</span></h1>
		</div>
		<div class="myorder-container">
			<form class="myorder_form">
				<div class="table-container">
					<table id="my_order" class="table-wrapper">
						<thead class="">
							<tr class="row-th">
								<th class="th-order">Order</th>
								<th class="th-date">Date</th>
								<th class="th-ship">Ship To</th>
								<th class="th-ttl-ordr">Order Total</th>
								<th class="th-status">Status</th>
								<th class="th-action">Action</th>
							</tr>
						</thead>
						<tbody class="myorder-body item-body">
							<!-- shopping cart contents -->
							<tr class="item-info" v-for="(order, index) in orders.items" :key="index">
								<td class="item-td" data-label="Order">
									<div class="item-wrapper">
										<div class="about-item">
											<span class="item-code item-info-td">{{ order.number }}</span>
										</div>
									</div>
								</td>
								<td class="date-td" data-label="Date">
									<span class="item-date item-info-td">
										{{ setFormatDate(order.order_date) }}
									</span>
								</td>
								<td class="name-td" data-label="Ship To">
									<span class="item-name item-info-td">
										{{ order.shipping_address.firstname+' '+order.shipping_address.lastname}}
									</span>
								</td>
								<td class="price-td" data-label="Order Total">
									<span class="price-item item-info-td">
										{{ setFormatPrice(order.total.grand_total.value ) }}
									</span>
								</td>
								<td class="status-td" data-label="Status">
									<span class="status-item item-info-td">
										{{ order.status}}
									</span>
								</td>
								<td class="action-td" data-label="Action">
									<div class="action-icon">
										<span class="edit-action">
											<nuxt-link :to="'/sale/order/'+order.number" class="link vieworder-link">View Order</nuxt-link>
										</span>
										<span class="remove-action">
											<nuxt-link to="/cart" class="link reorder-link" @click.native="reorderItems(order.number)">Reorder</nuxt-link>
										</span>
										<span class="ticket-action">
											<nuxt-link :to="'/os/customer?order='+order.number" class="link ticket-link">Open Support</nuxt-link>
										</span>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<Pagination
          v-if="Object.keys(orders).length > 0"
          :currentPage="orders.page_info.current_page"
          :totalPage="orders.page_info.total_pages"
          @updateCurrentPage="updateCurrentPageAction"
        />
			</form>
		</div>
	</div>
</template>

<script>
import Pagination from "~/components/partials/Pagination.vue";
import quoteMixin from "~/mixins/quote.js";
import customerMixin from "~/mixins/customer/index.js";
export default {
  name: "MyOrder",
  components: { Pagination },
  props: ['orders'],
  mixins: [quoteMixin, customerMixin],
  methods:{
    async updateCurrentPageAction(currentPage){
      await this.$store.commit(
        "others/loading/setLoading",
        true
      );
      await this.getCustomer({
        orderCurrentPage: currentPage,
        orderPageSize: this.orders.page_info.page_size
      })
      await this.$store.commit(
        "others/loading/setLoading",
        false
      );
    }
  }
};
</script>
