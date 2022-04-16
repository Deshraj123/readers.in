<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div
    class="product-customize-section"
    id="bundle-customization-product"
    v-if="bundleProductCustomizeShow && product.items.length > 0"
  >
    <div class="container">
      <div class="product-customize-wrapper">
        <div class="product-customize-container">
          <div class="left-col">
            <h3 class="customiz-title">Customization {{ product.name }}</h3>
            <div class="req-validation">
              <p><span>*</span> Required Fields</p>
            </div>
            <div
              class="custom-prod-column1"
              v-for="(item, index) in product.items"
              :key="index"
            >
              <div class="custom-prod">
                <div class="cust-prod-text text">
                  <label>
                    {{ item.title }}
                    <span v-if="item.required">*</span>
                  </label>
                </div>
                <div class="custom-prod-list list">
                  <form>
                    <!-- Select Option -->
                    <div
                      class="cust-list-items"
                      v-if="item.type === selectCode && item.options.length > 0"
                    >
                      <select
                        class="items"
                        @change="changeSelectedOption(index, $event)"
                      >
                        <option
                          v-for="(option, _index) in item.options"
                          :key="_index"
                          :value="_index"
                          :selected="option.selected"
                        >
                          {{ option.label }}
                        </option>
                      </select>
                    </div>

                    <!-- Radio Option -->
                    <div
                      class="cust-list-items"
                      v-if="item.type === radioCode && item.options.length > 0"
                    >
                      <ul class="cust-items">
                        <li
                          v-for="(option, _index) in item.options"
                          :key="_index"
                        >
                          <input
                            :id="'radio-check' + _index"
                            type="radio"
                            class="input-radio"
                            :name="'radio-' + _index"
                            :checked="option.selected"
                            @change="changeRadioOption(index, _index)"
                          />
                          <label :for="'radio-check' + _index" class="label-radio">
                            {{ option.label }}
                          </label>
                        </li>
                      </ul>
                    </div>

                    <!-- Checkbox Option -->
                    <div
                      class="cust-list-items"
                      v-if="
                        item.type === checkboxCode && item.options.length > 0
                      "
                    >
                      <ul class="cust-items">
                        <li
                          v-for="(option, _index) in item.options"
                          :key="_index"
                        >
                          <input
                            type="checkbox"
                            class="check-input"
                            :name="'checkbox-' + _index"
                            :checked="option.selected"
                            @change="changeCheckboxOption(index, _index, $event)"
                          />
                          <label class="check-label">
                            {{ option.label }}
                          </label>
                        </li>
                      </ul>
                    </div>

                    <!-- Multiselect Option -->
                    <div class="cust-list-items"
                      v-if="
                        item.type === multiSelectCode && item.options.length > 0
                      "
                    >
                      <select
                        class="items multiple-select"
                        @change="changeMultiSelectedOption(index, $event)"
                        multiple
                      >
                        <option
                          :value="_index"
                          v-for="(option, _index) in item.options"
                          :key="_index"
                          :selected="option.selected"
                        >
                          {{ option.label }}
                        </option>
                      </select>
                    </div>
                  </form>
                </div>
              </div>
              <div class="custo-prod-qty button-group">
                <div class="qunty">
                  <div class="minus">
                    <a href="javascript:void(0)" @click="manageCart(index, 'minus')">
                      <i class="fal fa-minus"></i>
                    </a>
                  </div>
                  <div class="input-text">
                  <label class="hide-element"></label>
                    <div class="input-text">
                      {{ item.qty }}
                    </div>
                  </div>
                  <div class="plus">
                    <a href="javascript:void(0)" @click="manageCart(index, 'plus')">
                      <i class="fal fa-plus"></i>
                    </a>
                  </div>
                </div>
                <span class="error" v-if="item.error != null">
                  {{ item.error }}
                </span>
              </div>
            </div>
          </div>
          <div class="right-col">
            <h4 class="customiz-title">Your Customization</h4>
            <div class="custom-prod-detail">
              <div class="custom-product-price">
                <div class="special-price">
                  <span class="price">{{ setFormatPrice(bundleProductPrice) }}</span>
                </div>
              </div>
            </div>
            <form class="cart">
              <div class="button-group">
                <div class="add-button">
                  <button type="button" class="action primary tocart" @click="addToCartBundleProduct()">
                    <span>Add to cart</span>
                  </button>
                </div>
              </div>
            </form>
            <div class="custom-prod-summary">
              <h4 class="customiz-title">Summary</h4>
              <div class="summary-column" v-for="(item, index) in product.items" :key="index">
                <div class="summary-label">
                  <span class="label">{{ item.title }} :</span>
                </div>
                <div
                  class="summary-prod-desc"
                  :v-if="item.options.length > 0"
                  v-for="(option, _index) in item.options"
                  :key="_index"
                >
                  <p class="s-desc" v-if="option.selected">
                    {{ option.label }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import productsMixin from "~/mixins/catalog/products.js";
export default {
  name: "BundleProductCustomization",
  mixins: [productsMixin],
  data() {
    return {
      selectCode: "select",
      radioCode: "radio",
      checkboxCode: "checkbox",
      multiSelectCode: "multi"
    };
  },
  methods: {
    async updatePriceAndProduct(product) {
      await this.$store.commit('catalog/products/updateProduct', product)
      await this.updateBundleProductPrice()
    },
    async resetErrorForBundleProduct(index) {
      let _product = JSON.parse(JSON.stringify(this.product));
      _product.items[index].error = null
      await this.$store.commit('catalog/products/updateProduct', _product)
    },
    async manageCart(index, code) {
      this.resetErrorForBundleProduct(index)
      let _product = JSON.parse(JSON.stringify(this.product));
      let qty = _product.items[index].qty

      if (code == "minus") {
        if(qty > 1) {
          qty--;
        }
      } else if (code == "plus") {
        qty++;
      }

      _product.items[index].qty = qty

      await this.updatePriceAndProduct(_product)
    },

    async checkQtyValidation(index, event){
      this.resetErrorForBundleProduct(index)
      let _product = JSON.parse(JSON.stringify(this.product));
      let qtyVal = event.target.value

      if(!this.is_numeric(qtyVal)) {
        _product.items[index].error = 'Qty is not valid.'
      }
      _product.items[index].qty = qtyVal
      await this.updatePriceAndProduct(_product)
    },

    changeSelectedOption(itemIndex, event) {
      let selectedIndex = parseInt(event.target.value);
      let elight = this;
      let _product = JSON.parse(JSON.stringify(elight.product));

      _product.items[itemIndex].options.forEach(function(option, index){
        _product.items[itemIndex].options[index].selected = false

        if(index === selectedIndex) {
          _product.items[itemIndex].options[index].selected = true
        }
      })

      elight.updatePriceAndProduct(_product)
    },

    changeRadioOption(itemIndex, selectedIndex){
      let elight = this;
      let _product = JSON.parse(JSON.stringify(elight.product));

      _product.items[itemIndex].options.forEach(function(option, index){
        _product.items[itemIndex].options[index].selected = false

        if(index === selectedIndex) {
          _product.items[itemIndex].options[index].selected = true
        }
      })

      elight.updatePriceAndProduct(_product)
    },

    changeCheckboxOption(itemIndex, selectedIndex, event){
      let elight = this;
      let checkedValue = false;
      if (event.target.checked) {
        checkedValue = true;
      }
      let _product = JSON.parse(JSON.stringify(elight.product));

      _product.items[itemIndex].options.forEach(function(option, index){
        if(index === selectedIndex) {
          _product.items[itemIndex].options[index].selected = checkedValue
        }
      })

      elight.updatePriceAndProduct(_product)
    },
    changeMultiSelectedOption(itemIndex, event) {
      let elight = this;
      let selectedOptions = []
      let selectedOptionsEvent = event.target.selectedOptions
      if(selectedOptionsEvent.length > 0){
        selectedOptionsEvent.forEach(function(option, index){
          selectedOptions.push(parseInt(option.value))
        })
      }

      let _product = JSON.parse(JSON.stringify(elight.product));

      _product.items[itemIndex].options.forEach(function(option, index){
        _product.items[itemIndex].options[index].selected = false
        if(selectedOptions.indexOf(index) > -1) {
          _product.items[itemIndex].options[index].selected = true
        }
      })

      elight.updatePriceAndProduct(_product)
    },
    async addToCartBundleProduct(){
      if(this.checkValidationForBundleProduct()){
        console.log('addToCartBundleProduct')
        console.log(this.product)
        await this.updateCart(this.product, 1)
      }
    },

    async checkValidationForBundleProduct() {
      let elight = this;
      let validation = true
      let _product = JSON.parse(JSON.stringify(elight.product));
      _product.items.forEach(function(item, index){
        _product.items[index].error = null
        if(item.required) {
          let minimumSelected = false
          item.options.forEach(function(option, _index){
            if(option.selected) {
              minimumSelected = true
            }
          })

          if(!minimumSelected) {
            validation = false
            _product.items[index].error = item.title +' is required.'
          }
        }
      })

      await elight.$store.commit('catalog/products/updateProduct', _product)

      return validation
    }
  }
};
</script>
