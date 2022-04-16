<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="vieworder-right-section myac-right-section" id="printMe" style="display:none;">
    <div class="vieworder-container">
      <table class="table" style="width:100%; padding: 0px 0 0px 0; margin: 0 0px 10px 0px;">
        <tr style="font-size: 24px; color: #000;">
          <td style="padding: 0 0 0 0; border-top:unset;">
            Order Information ( #{{ selectedOrder.number }})
          </td>
        </tr>
      </table>

      <table class="table" style="width:100%; padding:0;">
        <tr>
          <td style="padding: 15px 0 0 0; border-color:#414141;">
            <h2 style="color: #414141; font-size: 1.32rem; font-weight: 500;">
              Shipping Address
            </h2>
            <span style="font-size: 16px; color:#414141;" v-html="getAddressAsHtml(selectedOrder.shipping_address)" />
            <span style="font-size: 16px; color:#414141;" :href="'tel:' + selectedOrder.shipping_address.telephone"
              class="t-number">
              <span style="font-size: 16px; color:#000;">Tel : </span>
              <span style="font-size: 16px; color:#414141;">{{
                formatPhoneNumber(selectedOrder.shipping_address.telephone)
                }}</span>
            </span>
          </td>
          <td style="padding: 15px 0 0 0; border-color:#414141;">
            <h2 style="color: #414141; font-size: 1.32rem; font-weight: 500;">
              Shipping Method
            </h2>
            <span v-html="getAddressAsHtml(selectedOrder.shipping_address)" />
            <span style="font-size: 16px; color:#414141;" :href="'tel:' + selectedOrder.shipping_address.telephone"
              class="t-number">
              <span style="font-size: 16px; color:#000;">Tel : </span>
              <span style="font-size: 16px; color:#414141;">{{
                formatPhoneNumber(selectedOrder.shipping_address.telephone)
                }}</span>
            </span>
          </td>
          <td style="padding: 15px 0 0 0; border-color:#414141;">
            <h2 style="color: #414141; font-size: 1.32rem; font-weight: 500;">
              Billing Address
            </h2>
            <span style="font-size: 16px; color:#414141;" v-html="getAddressAsHtml(selectedOrder.billing_address)" />
            <span style="font-size: 16px; color:#414141;" :href="'tel:' + selectedOrder.shipping_address.telephone"
              class="t-number">
              <span style="font-size: 16px; color:#000;">Tel : </span>
              <span style="font-size: 16px; color:#414141;">{{
                formatPhoneNumber(selectedOrder.billing_address.telephone)
                }}</span>
            </span>
          </td>
        </tr>
      </table>

      <table style="width:100%; padding:0; margin-bottom:20px; border-bottom:1px solid #414141;">
        <tr>
          <td style="padding: 0px 0px 15px 0px ; width:67%">
            <h2 style="color: #414141; font-size: 1.32rem; font-weight: 500;">
              Payment Method
            </h2>
            <span style="font-size: 16px; color:#414141;">{{
              selectedOrder.payment_methods[0].name
              }}</span>
          </td>
          <td style="padding: 0px 0px 15px 0px ;">
            <h2 style="color: #414141; font-size: 1.32rem; font-weight: 500;">
              Status
            </h2>
            <span style="font-size: 16px; color:#414141;">{{
              selectedOrder.status
              }}</span>
          </td>
        </tr>
      </table>

      <table style="width:100%; padding:0;">
        <tr>
          <td>
            <h3 style="color: #414141; font-weight: 600; font-size: 0.88rem;">
              Ordered Items
            </h3>
          </td>
        </tr>
      </table>

      <table id="view_order" class="table-wrapper" style="border-collapse: collapse; width:100%">
        <thead>
          <tr class="row-th">
            <th style="border: 1px solid #414141; text-align:center; padding: 10px;" class="th-pname">
              Product Name
            </th>
            <th style="border: 1px solid #414141; text-align:center; padding: 10px;" class="th-sku">
              SKU
            </th>
            <th style="border: 1px solid #414141; text-align:center; padding: 10px;" class="th-price">
              Price
            </th>
            <th style="border: 1px solid #414141; text-align:center; padding: 10px;" class="th-qty">
              Qty
            </th>
            <th style="border: 1px solid #414141; text-align:center; padding: 10px;" class="th-subttl">
              Subtotal
            </th>
          </tr>
        </thead>
        <tbody class="vieworder-body item-body">
          <tr class="item-info" v-for="(item, index) in selectedOrder.items" :key="index">
            <td class="item-td" data-label="Product Name" style="border: 1px solid #414141; padding: 10px;">
              <span class="item-name item-info-td">
                {{ item.product_name }}
              </span>
            </td>
            <td class="sku-td" data-label="SKU" style="border: 1px solid #414141; text-align:center; padding: 10px;">
              <span class="item-sku item-info-td">
                {{ item.product_sku }}
              </span>
            </td>
            <td class="price-td" data-label="Price" style="border: 1px solid #414141; text-align:center; padding: 10px;">
              <span class="item-price item-info-td">
                {{ setFormatPrice(item.product_sale_price.value) }}
              </span>
            </td>
            <td class="qty-td" data-label="Qty" style="border: 1px solid #414141; text-align:center; padding: 10px;">
              <span class="qty-item item-info-td">
                {{ item.quantity_ordered }}
              </span>
            </td>
            <td class="subttl-td" data-label="Subtotal" style="border: 1px solid #414141; text-align:center; padding: 10px;">
              <span class="subttl-item item-info-td">
                {{
                setFormatPrice(
                item.product_sale_price.value * item.quantity_ordered
                )
                }}
              </span>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="grand_total_tr" style="border: 1px solid #414141; padding: 10px;">
            <th colspan="4" class="mark" scope="row" style="padding: 10px;">Subtotal</th>
            <td class="amount" data-th="Subtotal" style="border: 1px solid #414141; text-align:center; padding: 10px;">
              <span class="price">
                {{ setFormatPrice(selectedOrder.total.subtotal.value) }}
              </span>
            </td>
          </tr>
          <tr style="border: 1px solid #414141; padding: 10px;" class="grand_total_tr" v-if="selectedOrder.total.discounts.length > 0">
            <th colspan="4" class="mark" scope="row" style="padding: 10px;">Discount</th>
            <td class="amount" data-th="Discount" style="border: 1px solid #414141; text-align:center; padding: 10px;">
              <span class="price">
                {{ setFormatPrice(selectedOrder.total.subtotal.value) }}
              </span>
            </td>
          </tr>
          <tr class="grand_total_tr" style="border: 1px solid #414141; padding: 10px;">
            <th colspan="4" class="mark" scope="row" style="padding: 10px;">Shipping & Handling</th>
            <td class="amount" data-th="shipping_and_handling" style="border: 1px solid #414141; text-align:center; padding: 10px;">
              <span class="price">
                {{
                setFormatPrice(
                selectedOrder.total.shipping_handling.total_amount.value
                )
                }}
              </span>
            </td>
          </tr>
          <tr style="border: 1px solid #414141; padding: 10px;" class="grand_total_tr" v-if="selectedOrder.total.taxes.length > 0"
            v-for="(tax, index) in selectedOrder.total.taxes" :key="index">
            <th style="border: 1px solid #414141; padding: 10px;" colspan="4" class="mark" scope="row">
              {{ tax.title }}
            </th>
            <td class="amount" data-th="shipping_and_handling" style="border: 1px solid #414141; text-align:center; padding: 10px;">
              <span class="price">
                {{ setFormatPrice(tax.amount.value) }}
              </span>
            </td>
          </tr>
          <tr class="grand_total_tr" style="border: 1px solid #414141;">
            <th colspan="4" class="grandttl-th" scope="row" style="border: 1px solid #414141; padding: 10px;">
              Grand Total
            </th>
            <td class="grandttl-td" data-th="Grand Total" style="border: 1px solid #414141; text-align:center; padding: 10px;">
              <span class="grandttl-item item-info-td">{{
                setFormatPrice(selectedOrder.total.grand_total.value)
                }}</span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
  import globalMixin from "~/mixins/others/global.js";
  export default {
    name: "VieworderPrint",
    props: ["selectedOrder"],
    mixins: [globalMixin],
    methods: {
      printOrder() {
        this.$htmlToPaper("printMe");
      }
    }
  };
</script>