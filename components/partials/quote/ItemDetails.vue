<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="product options" v-if="seeDetails(item.product.type_id)">
    <div
      v-b-toggle.pro-detail
      class="option-title"
      @click="showDetails(index, item.show_details)"
    >
      See details
      <i class="fal fa-chevron-down drop-arrow"></i>
    </div>
    <div class="pro-option-contents" id="pro-detail" v-if="item.show_details && item.configurable_options">
      <table>
        <tbody>
          <tr
            v-for="(option, index) in displaySelectedOptions(item)"
            :key="index"
          >
            <td class="label">{{ option.option_label }}:</td>
            <td class="values">{{ option.value_label }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pro-option-contents" id="pro-detail" v-if="item.show_details && item.bundle_options">
      <table v-for="(option, index) in item.bundle_options" :key="index">
        <tbody>
          <tr v-for="(value, valueIndex) in option.values" :key="valueIndex" >
            <td class="label">{{ value.quantity }} * {{ value.label }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import productsMixin from "~/mixins/catalog/products.js";
export default {
  name: "ItemDetails",
  mixins: [productsMixin],
  props: ['index', 'item'],
  methods: {
    seeDetails(typeId) {
      if (typeId === this.configurationCode || typeId === this.bundleCode) {
        return true;
      }
      return false;
    },
    async showDetails(index, value) {
      if (!value) {
        await this.$store.commit("quote/updateShowDetailsOfItem", {
          index: index,
          value: true
        });
        return;
      }
      await this.$store.commit("quote/updateShowDetailsOfItem", {
        index: index,
        value: false
      });
    },
    displaySelectedOptions(item){
      if(item.configurable_options) {
        return item.configurable_options
      }
    },

    displaySelectedOptionsForBundle(options) {
      options.forEach(function(value){

      })
    }
  }
};
</script>
