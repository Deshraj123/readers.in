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
          <GroupProduct />
          <ProductInfoMiddle :selectedProduct="product" />
        </div>
      </div>
    </div>
    <ProductDescription :selectedProduct="product" />
    <RelatedProduct v-if="product.related_products.length > 0"  :selectedProduct="product" />
    <ProductPrint :selectedProduct="product" />
  </div>
</template>

<script>
import ProductBreadcrumbs from "~/components/product/ProductBreadcrumbs.vue";
import ProductMedia from "~/components/product/ProductMedia.vue";
import ProductInfoTop from "~/components/product/ProductInfoTop.vue";
import ProductInfoMiddle from "~/components/product/ProductInfoMiddle.vue";
import ProductDescription from "~/components/product/ProductDescription.vue";
import RelatedProduct from "~/components/partials/RelatedProduct.vue";
import GroupProduct from "~/components/product/GroupProduct.vue";
import ProductPrint from "~/components/print/ProductPrint.vue";
export default {
  name: "GroupProductIndex",
  props: ["product"],
  components: {
    GroupProduct,
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
