

<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
		<div class="sidebar sidebar-main" v-if="aggregations.length > 0">
  <div class="block filter" v-if="aggregations.length > 0">
    <div class="block-content filter-content">
      <div class="shopping-title" v-b-toggle.filter-collapse>
        <h4 class="block-subtitle filter-subtitle">Shopping Options</h4>
        <i class="fal fa-filter"></i><span class="hide-element">filter</span>
      </div>
      <!-- filter current block -->
      <div class="filter-current-block" v-if="selectedFiltered.length > 0">
        <div class="block-subtitle filter-current-subtitle">
          Now Shopping by
        </div>
        <ul class="filter-items">
          <li
            class="filter-item"
            v-for="(selectedFilter, index) in selectedFiltered"
            :key="index"
          >
            <a
              class="filter-close"
              href="javascript:void(0)"
              title="Remove"
              @click="removeSelectedFilter(selectedFilter.value)"
            >
              <i class="fal fa-times close-icon"></i>
            </a>
            <div class="filter-value">
              {{ selectedFilter.label }}
            </div>
          </li>
        </ul>
        <div class="form-action current-filter-clear">
          <button type="button" class="submit" @click="clearAll()">
            Clear All
          </button>
        </div>
      </div>
      <!--  -->
      <b-collapse id="filter-collapse" class="filter-collapse-content">
        <div
          data-role="collapsible"
          class="filter-options-item"
          role="presentation"
          data-collapsible="true"
          v-for="(aggregation, index) in aggregations"
          :key="index"
        >
          <div
            class="filter-options-title"
            v-b-toggle="aggregation.attribute_code"
          >
            {{ aggregation.label }}
            <i class="fal fa-chevron-down"></i>
          </div>
          <b-collapse
            v-model="aggregation.visible"
            :id="aggregation.attribute_code"
          >
            <div
              class="brands-items"
              v-if="aggregation.attribute_code != 'price'"
            >
              <ul class="items" v-if="aggregation.options.length > 0">
                <li
                  class="item"
                  v-for="(option, optionIndex) in aggregation.options"
                  :key="optionIndex"
                >
                  <div class="filter-item">
                    <input
                      type="checkbox"
                      class="check-input"
                      :checked="option.selected"
                      @click="selectAggregations($event, index, optionIndex)"
                    />
                    <span class="label check-label">{{ option.label }}</span>
                  </div>
                </li>
              </ul>
            </div>

            <div class="brands-items price-slider" v-else>
              <vue-slider v-model="rangePrice" v-bind="priceOptions" @drag-end="dragEndSlider"/>
              <div class="amshopby-slider-display">
                {{ setFormatPrice(rangePrice[0]) }} -
                {{ setFormatPrice(rangePrice[1]) }}
              </div>
            </div>

          </b-collapse>
        </div>
      </b-collapse>
    </div>
  </div>
  </div>
</template>
<script>
import categoryMixin from "~/mixins/catalog/category.js";
import productsMixin from "~/mixins/catalog/products.js";
import globalMixin from "~/mixins/others/global.js";


export default {
  name: "CategoryFilter",
  mixins: [globalMixin, categoryMixin, productsMixin],
  data() {
    return {
      rangePrice: [0, 10000],
      priceOptions: {
        min: 0,
        max: 10000,
        tooltip: 'none',
        tooltipPlacement: 'top',
        minRange: 0,
        maxRange: 10000,
        order: true,
      }
    };
  },
  mounted() {
    let _aggregations = JSON.parse(JSON.stringify(this.aggregations));
    let that = this;
    if (_aggregations.length > 0) {
      _aggregations.forEach(function(value, index) {
        if (value.attribute_code == "price") {
          that.rangePrice = value.value
          that.priceOptions.min = value.value[0]
          that.priceOptions.max = value.value[1]
          that.priceOptions.minRange = value.value[0]
          that.priceOptions.maxRange = value.value[1]
        }
      });
    }
    that.checkAggregationsIsSelected();


  },
  methods: {
    async selectAggregations(event, aggregationsKey, optionKey) {
      let _aggregations = JSON.parse(JSON.stringify(this.aggregations));
      if (_aggregations[aggregationsKey]) {
        if (_aggregations[aggregationsKey].options[optionKey]) {
          _aggregations[aggregationsKey].options[optionKey].selected =
            event.target.checked;
        }
      }

      await this.getProductAfterFilters(_aggregations);
    },

    async removeSelectedFilter(optionValue) {
      let _aggregations = JSON.parse(JSON.stringify(this.aggregations));
      if (_aggregations.length > 0) {
        _aggregations.forEach(function(aggregation, index) {
          if (aggregation.options.length > 0) {
            aggregation.options.forEach(function(option, _index) {
              if (option.value == optionValue) {
                _aggregations[index].options[_index].selected = false;
              }
            });
          }
        });
      }

      await this.getProductAfterFilters(_aggregations);
    },

    async clearAll() {
      let _aggregations = JSON.parse(JSON.stringify(this.aggregations));
      if (_aggregations.length > 0) {
        _aggregations.forEach(function(aggregation, index) {
          if (
            aggregation.attribute_code != "price" &&
            aggregation.options.length > 0
          ) {
            aggregation.options.forEach(function(option, _index) {
              _aggregations[index].options[_index].selected = false;
            });
          }
        });
      }
      await this.getProductAfterFilters(_aggregations);
    },

    async managePriceFilter(price) {
      let elightwalk = this
      let _aggregations = JSON.parse(JSON.stringify(this.aggregations));
      if (_aggregations.length > 0) {
        _aggregations.forEach(function(value, index) {
          if (value.attribute_code == "price") {
            _aggregations[index].value = price;
          }
        });
      }
      await this.getProductAfterFilters(_aggregations)
    },

    async getProductAfterFilters(_aggregations) {
      await this.$store.commit(
        "catalog/products/setAggregations",
        _aggregations
      );

      await this.$store.commit("catalog/category/setCurrentPage", 1);
      await this.getProducts(this.manageProductFilters());
      await this.$store.commit(
        "catalog/products/setAggregations",
        _aggregations
      );
      await this.managePaginations();
      await this.checkAggregationsIsSelected();
    },

    async dragEndSlider(number) {
      await this.managePriceFilter(this.rangePrice)
    }
  }
};
</script>



