<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="configure-product" v-if="product.configurable_options && product.configurable_options.length > 0">
    <div class="product-color"
      v-for="(option, index) in product.configurable_options"
      :key="index"
    >
      <div class="color-text text">{{ option.label }}:</div>
      <div class="color-items options">
        <div class="list-items">
          <div class="product-attributes">
            <select class="color-list" v-if="option.values.length > 0" @change="changeSelectOption(option.attribute_code, $event)">
              <option
                v-for="(optionValue, _index) in option.values"
                :key="_index"
                :selected="optionValue.selected"
                :value="optionValue.value_index"
              >
                {{ optionValue.label }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import productsMixin from "~/mixins/catalog/products.js";
export default {
  name: "ConfigureProduct",
  mixins: [productsMixin],
  methods:{
    async updateProduct(product) {
      await this.$store.commit("catalog/products/updateProduct", product);
      await this.setChildProductForConfiguration(this.getSelectedConfigurationOptions())
    },
    async changeSelectOption(optionCode, event) {
      let elight = this
      let _product = JSON.parse(JSON.stringify(elight.product));

      _product.configurable_options.forEach(function(option, index){
        if(option.attribute_code === optionCode) {
          option.values.forEach(function(optionValue, _index){
            _product.configurable_options[index].values[_index].selected = false
            if(optionValue.value_index === parseInt(event.target.value)) {
              _product.configurable_options[index].values[_index].selected = true
            }
          })
        }
      })

      await elight.updateProduct(_product)
    },

  }
};
</script>
