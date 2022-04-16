<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="main  myaccount-page">
    <div class="myaccount-wrapper">
      <div class="container">
        <div class="myaccount-container-main">
          <MyAccountSidebar />
          <Vieworder
            v-if="Object.keys(selectedOrder).length > 0"
            :selectedOrder="selectedOrder"
          />
          <NotFoundData v-else :text="notFoundText"/>
          <VieworderPrint  v-if="Object.keys(selectedOrder).length > 0"
            :selectedOrder="selectedOrder" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MyAccountSidebar from "~/components/myaccount/MyAccountSidebar.vue";
import Vieworder from "~/components/myaccount/Vieworder.vue";
import VieworderPrint from "~/components/print/VieworderPrint.vue";
import NotFoundData from "~/components/partials/NotFoundData.vue";
import salesMixin from "~/mixins/sales.js";
import customerMixin from "~/mixins/customer/index.js";

export default {
  name: "SaleViewOrderPage",
  mixins: [salesMixin, customerMixin],
  middleware: ['authenticated','customer'],
  components: {
    MyAccountSidebar,
    Vieworder,
    NotFoundData,
    VieworderPrint
  },
  data() {
    return {
      selectedOrder: {},
      selectedOrderNumber: '',
      notFoundText: "We can't found any kind of order details."
    }
  },
  async fetch() {
    await this.getCustomer({
      orderFilter: {
        number: {
          eq: this.$route.params.number
        }
      },
      orderCurrentPage: 1,
      orderPageSize: 10
    })

    await this.addSelectedOrder()
  },
  methods:{
    addSelectedOrder() {
      let that = this
      if(that.orders.items.length > 0){
        that.orders.items.forEach(function(order){
          if(order.number == that.$route.params.number){
            that.selectedOrder = order
          }
        })
      }
    }
  }
};
</script>
