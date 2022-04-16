<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="main category-product-wrapper">
    <div class="category-main" v-if="isCategory">
      <CategoryIndex  />
    </div>
    <div
      class="product-main product-page"
      v-else-if="Object.keys(product).length > 0"
    >
      <SimpleProductIndex
        v-if="product.type_id === simpleCode"
        :product="product"
      />
      <ConfigurationProductIndex
        v-else-if="
          product.type_id === configurationCode &&
          Object.keys(selectedConfigurationProduct).length > 0
        "
        :product="selectedConfigurationProduct"
      />
      <GroupProductIndex
        v-else-if="product.type_id === groupCode"
        :product="product"
      />
      <BundleProductIndex
        v-else-if="product.type_id === bundleCode"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import CategoryIndex from "~/components/category/CategoryIndex.vue";
import SimpleProductIndex from "~/components/product/SimpleProductIndex.vue";
import ConfigurationProductIndex from "~/components/product/ConfigurationProductIndex.vue";
import GroupProductIndex from "~/components/product/GroupProductIndex.vue";
import BundleProductIndex from "~/components/product/BundleProductIndex.vue";
import categoryMixin from "~/mixins/catalog/category.js";
import productsMixin from "~/mixins/catalog/products.js";
export default {
  name: "CategoryAndProduct",
  mixins: [categoryMixin, productsMixin],
  components: {
    CategoryIndex,
    SimpleProductIndex,
    ConfigurationProductIndex,
    GroupProductIndex,
    BundleProductIndex,
  },
  data() {
    return {
      title: "",
      meta: [],
      seoData: {},
      defaultImageWidth: 700,
      defaultImageHeight: 700
    };
  },
  head() {
    return {
      title: this.title,
      meta: this.meta,
    };
  },
  async fetch() {

    await this.showCategoryPage();
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
    await this.getCategory(this.$route.params.urlkey);

    // check Product
    if (!this.isCategory) {
      await this.getCustomAttributes();
      let payload = {
        filter: {
          url_key: {
            eq: this.$route.params.urlkey,
          },
        },
        width: this.defaultImageWidth,
        height: this.defaultImageHeight
      };
      await this.getProduct(payload);

      if (!this.isProduct) {
        if (process.server) {
          this.$nuxt.error({ statusCode: 404, message: 'Page not found' })
          throw new Error('Page not found')
        }
      }

      this.seoData = this.product;
      this.manageHead();
      await this.manageChildProducts();
    } else if (this.category.display_mode == this.displayModeProduct) {
      this.seoData = this.category;
      this.manageHead();
      await this.getProducts(this.manageProductFilters());
      await this.manageAggregations();
      await this.managePaginations();
    } else {
      this.seoData = this.category;
      this.manageHead();
    }
  },
  methods: {
    manageHead() {
      this.title = this.setTitle(this.seoData);
      this.meta = this.setHead(this.seoData);
    },

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
          _items.forEach(function (item, index) {
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
          _product.items.forEach(function (item, index) {
            if (item.options.length > 0) {
              item.options.forEach(function (option, _index) {
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
    },
  },


};
</script>
