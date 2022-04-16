<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="vieworder-right-section myac-right-section">
    <div class="vieworder-container">
      <div class="myaddbook-container">
        <div class="myaddbook-block-title">
          <span class="title">Order Information ( #{{selectedOrder.number}})</span>
          <a href="javascript:void(0)" class="action print" @click="printOrder()">
            <span class="print-order">Print Order</span>
          </a>
        </div>
        <div class="block-content vieworder-block-content">
          <div class="shipping-add-col order-info-col">
            <div class="box-title">
              <h4><span>Shipping Address</span></h4>
            </div>
            <div class="address-billing address">
              <span v-html="getAddressAsHtml(selectedOrder.shipping_address)" />
            </div>
            <div class="telno-billing telephone">
              <a
                :href="'tel:' + selectedOrder.shipping_address.telephone"
                class="t-number"
              >
                <span>Tel : </span>
                <span>{{
                  formatPhoneNumber(selectedOrder.shipping_address.telephone)
                }}</span>
              </a>
            </div>
          </div>
          <div class="shipping-method-col order-info-col">
            <div class="box-title">
              <h4><span>Shipping Method</span></h4>
            </div>
            <div class="address-shipping address">
              <span>
                {{ selectedOrder.shipping_method }}
              </span>
            </div>
          </div>
          <div class="billing-add-col order-info-col">
            <div class="box-title">
              <h4><span>Billing Address</span></h4>
            </div>
            <div class="address-shipping address">
              <span v-html="getAddressAsHtml(selectedOrder.billing_address)" />
            </div>
            <div class="telno-shipping telephone">
              <a
                :href="'tel:' + selectedOrder.shipping_address.telephone"
                class="t-number"
              >
                <span>Tel : </span>
                <span>{{
                  formatPhoneNumber(selectedOrder.billing_address.telephone)
                }}</span>
              </a>
            </div>
          </div>
          <div class="payment-method-col order-info-col">
            <div class="box-title">
              <h4><span>Payment Method</span></h4>
            </div>
            <div class="address-shipping address">
              <span>{{ selectedOrder.payment_methods[0].name }}</span>
            </div>
          </div>
          <div class="payment-method-col order-info-col">
            <div class="box-title">
              <h4><span>Status</span></h4>
            </div>
            <div class="address-shipping address">
              <span>{{ selectedOrder.status }}</span>
            </div>
          </div>
        </div>
      </div>
      <form class="vieworder_form">
        <div class="table-container">
          <span class="title">
           Ordered Items
          </span>
          <table id="view_order" class="table-wrapper">
            <thead class="">
              <tr class="row-th">
                <th class="th-pname">Product Name</th>
                <th class="th-sku">SKU</th>
                <th class="th-price">Price</th>
                <th class="th-qty">Qty</th>
                <th class="th-subttl">Subtotal</th>
              </tr>
            </thead>
            <tbody class="vieworder-body item-body">
              <!-- shopping cart contents -->
              <tr
                class="item-info"
                v-for="(item, index) in selectedOrder.items"
                :key="index"
              >
                <td class="item-td" data-label="Product Name">
                  <div class="item-wrapper">
                    <div class="about-item">
                      <span class="item-name item-info-td">
                        {{ item.product_name }}
                      </span>
                    </div>
                  </div>
                </td>
                <td class="sku-td" data-label="SKU">
                  <span class="item-sku item-info-td">
                    {{ item.product_sku }}
                  </span>
                </td>
                <td class="price-td" data-label="Price">
                  <span class="item-price item-info-td">
                    {{ setFormatPrice(item.product_sale_price.value) }}
                  </span>
                </td>
                <td class="qty-td" data-label="Qty">
                  <span class="qty-item item-info-td">
                    {{ item.quantity_ordered }}
                  </span>
                </td>
                <td class="subttl-td" data-label="Subtotal">
                  <span class="subttl-item item-info-td">
                    {{
                      setFormatPrice(item.product_sale_price.value * item.quantity_ordered)
                    }}
                  </span>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="grand_total_tr">
                <th colspan="4" class="mark" scope="row">Subtotal</th>
                <td class="amount" data-th="Subtotal">
                  <span class="price">
                    {{setFormatPrice(selectedOrder.total.subtotal.value)}}
                  </span>
                </td>
              </tr>
              <tr class="grand_total_tr" v-if="selectedOrder.total.discounts.length > 0">
                <th colspan="4" class="mark" scope="row">Discount</th>
                <td class="amount" data-th="Discount">
                  <span class="price">
                    {{setFormatPrice(selectedOrder.total.subtotal.value)}}
                  </span>
                </td>
              </tr>
              <tr class="grand_total_tr">
                <th colspan="4" class="mark" scope="row">Shipping & Handling</th>
                <td class="amount" data-th="shipping_and_handling">
                  <span class="price">
                    {{setFormatPrice(selectedOrder.total.shipping_handling.total_amount.value)}}
                  </span>
                </td>
              </tr>
              <tr
                class="grand_total_tr"
                v-if="selectedOrder.total.taxes.length > 0"
                v-for="(tax, index) in selectedOrder.total.taxes"
                :key="index"
              >
                <th colspan="4" class="mark" scope="row">{{ tax.title }}</th>
                <td class="amount" data-th="shipping_and_handling">
                  <span class="price">
                    {{setFormatPrice(tax.amount.value)}}
                  </span>
                </td>
              </tr>
              <tr class="grand_total_tr">
                <th colspan="4" class="grandttl-th" scope="row">Grand Total</th>
                <td class="grandttl-td" data-th="Grand Total">
                  <span class="grandttl-item item-info-td">{{setFormatPrice(selectedOrder.total.grand_total.value)}}</span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import globalMixin from "~/mixins/others/global.js";
export default {
  name: "SalesViewOrder",
  props: ["selectedOrder"],
  mixins: [globalMixin],
  methods: {
    printOrder() {
      this.$htmlToPaper('printMe');
    }
  }
};
</script>
