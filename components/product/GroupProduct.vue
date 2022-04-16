<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="group-product" v-if="groupProducts.length > 0">
    <div class="p-detail border-class pb-2">
      <div class="p-heading left-col">
        Product name
      </div>
      <div class="p-heading right-col">
        Qty
      </div>
    </div>
    <div class="p-detail product-row border-class" v-for="(item, index) in groupProducts" :key="index" v-if="item.product">
      <div class="left-col">
        <div class="p-name">
          {{ item.product.name }}
        </div>
        <div class="price">
          {{ setFormatPrice(item.product.price.minimalPrice.amount.value) }}
        </div>
      </div>
      <div class="prod-qty-no right-col">
        <label :for="'prod-qty-val' + index" class="hide-element">prod-qty-val</label>
        <input type="number" :id="'prod-qty-val' + index" class="qty-val" :value="item.qty" @keyup="checkQtyValidation(index, $event)"/>
        <span class="error" v-if="item.error!=null">{{ item.error }}</span>
      </div>
    </div>

  </div>
</template>
<script>
import productsMixin from "~/mixins/catalog/products.js";
import globalMixin from "~/mixins/others/global.js";
export default {
  name: "GroupProduct",
  mixins: [productsMixin, globalMixin],
  methods: {
    checkQtyValidation(index, event) {
      let _items = JSON.parse(JSON.stringify(this.groupProducts));
      let qtyVal = event.target.value;
      _items[index].error = null
      if (!this.is_numeric(qtyVal)) {
        _items[index].error = 'Qty is not valid.'
      }
      _items[index].qty = qtyVal
      this.$store.commit('catalog/products/setGroupProducts', _items)
    },
  }
};
</script>
