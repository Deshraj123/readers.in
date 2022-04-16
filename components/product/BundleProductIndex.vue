<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="product-section">
    <ProductBreadcrumbs :product="product" />
    <div class="container product-main-container">
      <ProductMedia :product="product" />
      <div class="product-info-section">
        <div class="product-info">
          <ProductInfoTop :selectedProduct="product" />
          <BundleProduct />
          <ProductInfoMiddle :selectedProduct="product" />
        </div>
      </div>
    </div>
    <ProductCustomization />
    <ProductPrint :selectedProduct="product" />
    <ProductDescription :selectedProduct="product" />
    <RelatedProduct v-if="product.related_products.length > 0" :selectedProduct="product" />
  </div>
</template>

<script>
import ProductBreadcrumbs from "~/components/product/ProductBreadcrumbs.vue";
import ProductMedia from "~/components/product/ProductMedia.vue";
import ProductInfoTop from "~/components/product/ProductInfoTop.vue";
import ProductInfoMiddle from "~/components/product/ProductInfoMiddle.vue";
import ProductDescription from "~/components/product/ProductDescription.vue";
import RelatedProduct from "~/components/partials/RelatedProduct.vue";
import BundleProduct from "~/components/product/BundleProduct.vue";
import ProductCustomization from "~/components/product/ProductCustomization.vue";
import ProductPrint from "~/components/print/ProductPrint.vue";
export default {
  name: "SimpleProductIndex",
  props: ["product"],
  components: {
    ProductCustomization,
    BundleProduct,
    ProductBreadcrumbs,
    ProductMedia,
    ProductInfoTop,
    ProductInfoMiddle,
    ProductDescription,
    RelatedProduct,
    ProductPrint
  }
};
</script>
