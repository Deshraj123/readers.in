<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="main category-product-wrapper">
    <div class="category-main">
      <div class="category-main-wrapper">
        <div class="category-section">
          <div class="breadcrumbs">
            <div class="container" v-if="Object.keys(selectedBrand).length">
              <Breadcrumbs :data="selectedBrand" />
            </div>
          </div>
          <div class="container">
            <Products :is_brand_data="selectedBrand"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Products from "~/components/category/Products.vue";
import categoryMixin from "~/mixins/catalog/category.js";
import productsMixin from "~/mixins/catalog/products.js";
import brandsMixin from "~/mixins/others/brands.js";
import Breadcrumbs from "~/components/category/Breadcrumbs.vue";
export default {
  name: "SelectedBrand",
  mixins: [categoryMixin, productsMixin, brandsMixin],
  components: {
    Products,
    Breadcrumbs
  },
  data() {
    return {
      title: "",
      meta: [],
      seoData: {}
    };
  },
  head() {
    return {
      title: this.title,
      meta: this.meta
    };
  },
  async fetch() {

    await this.$store.commit("others/brands/setSeletedBrand", {});

    await this.showBrandProductPage();
    await this.getBrands();
    let currentPage = 1;
    if (this.$route.query.p) {
      await this.$store.commit(
        "catalog/category/setCurrentPage",
        parseInt(this.$route.query.p)
      );
    }

    await this.$store.commit("catalog/products/setAggregations", []);
    await this.$store.commit(
      "catalog/products/setSearchResultProductsShow",
      false
    );
    await this.setSeletedBrand(this.$route.params.urlkey);
    if(Object.keys(this.selectedBrand).length) {
      await this.getProducts(this.manageProductFilters());
      await this.manageAggregations();
      await this.managePaginations();
    }

  },

  methods: {
    async manageChildProducts() {
      let elight = this;

      // Configuration Product
      if (elight.product.type_id === elight.configurationCode) {
        await elight.setChildProductForConfiguration(
          elight.getSelectedConfigurationOptions()
        );
      }

      // Group Product
      if (elight.product.type_id === elight.groupCode) {
        let _items = JSON.parse(JSON.stringify(elight.product.items));
        if (_items.length > 0) {
          _items.forEach(function(item, index) {
            _items[index]["error"] = null;
          });
        }
        await elight.$store.commit("catalog/products/setGroupProducts", _items);
      }

      // Boundle Product
      if (elight.product.type_id === elight.bundleCode) {
        let selected = true;
        let _product = JSON.parse(JSON.stringify(elight.product));
        if (_product.items.length > 0) {
          _product.items.forEach(function(item, index) {
            if (item.options.length > 0) {
              item.options.forEach(function(option, _index) {
                selected = true;
                if (!option.is_default) {
                  selected = false;
                }
                _product.items[index].options[_index]["selected"] = selected;
              });
              _product.items[index]["qty"] = 1;
              _product.items[index]["error"] = null;
            }
          });
        }
        await elight.$store.commit("catalog/products/updateProduct", _product);
        await elight.updateBundleProductPrice();
      }
    }
  }
};
</script>
