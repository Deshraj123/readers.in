<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="product-main-container" id="printMe" style="display: flex; /* display: none; */ flex-direction: column; visibility: hidden;opacity: 0;height: 0;">
    <table style="width:100%;">
          <tr>
               <td class="home-banner-item" style="width:620px;">
                  <div class="product-top-slider" v-if="selectedProduct.media_gallery.length > 0">
                      <div class="swiper-slide">
                          <!-- <img :src="getCloudinaryUrl(removeCacheUrl(selectedProduct.media_gallery[0].url), 561, 488)" width="561" height="488" :alt="selectedProduct.media_gallery[0].name" alt="product image" />-->
                          <img :src="selectedProduct.media_gallery[0].url" width="561" height="488" :alt="selectedProduct.media_gallery[0].name" alt="product image" />
                      </div>
                  </div>
                </td>
                <td>
                    <h1 class="page-title">
                      <span>{{ selectedProduct.name }}</span>
                    </h1>
                    <div class="stock-available">
                      <span><strong>Availability :</strong></span>
                      <span class="in-stock" v-if="selectedProduct.stock_status == 'IN_STOCK'">{{ getProductStatus(selectedProduct.stock_status) }}</span>
                      <span class="in-stock" v-else>{{ getProductStatus(selectedProduct.stock_status) }}</span>
                    </div>
  
                    <div class="product-attribute">
                          <span><strong>SKU :</strong></span>
                          <span class="value">{{ selectedProduct.sku }}</span>
                    </div>
  
                      <div class="product-short-desc" v-interpolation v-html="selectedProduct.short_description.html" />
  
                    <div class="product-price" v-if="selectedProduct.type_id !== groupCode && selectedProduct.type_id !== bundleCode" style="font-weight:600;">
                          <div class="special-price">
                              <span class="price">{{
                              setFormatPrice(selectedProduct.price.minimalPrice.amount.value)
                              }}</span>
                          </div>
                          <div class="old-price" v-if="selectedProduct.special_price != null">
                              <span class="price">{{
                              setFormatPrice(selectedProduct.price.regularPrice.amount.value)
                              }}</span>
                          </div>
                    </div>
                    <div class="group-product" v-if="groupProducts.length > 0">
                          <div class="p-heading left-col" style="border-bottom:1px solid #414141; padding: 10px 0; font-weight:600; font-size: 16px; line-height: 22px;">
                              Product name
                          </div>
                          <div class="p-detail product-row border-class" v-for="(item, index) in groupProducts" :key="index" style="border-bottom:1px solid #414141; padding: 10px 0; font-weight:600;" v-if="item.product">
                              <div class="p-name">
                                {{ item.product.name }}
                              </div>
                              <div class="price">
                                {{ setFormatPrice(item.product.price.minimalPrice.amount.value) }}
                              </div>
                          </div>
                    </div>
                </td>
           </tr>
    </table>
  
  </div>
  </template>
  
  <script>
  import globalMixin from "~/mixins/others/global.js";
  import productsMixin from "~/mixins/catalog/products.js";
  export default {
    name: "ProductPrint",
    props: ["selectedProduct"],
    mixins: [globalMixin, productsMixin],
    components: {
    },
    methods: {
      printOrder() {
        this.$htmlToPaper('printMe');
      },
      getProductStatus(status) {
        if(status === 'IN_STOCK') {
          return 'In Stock'
        }
        return 'Out Of Stock'
      },
  
      showReviewTab() {
        let reviewId = document.querySelector('.product-review-tab').getAttribute('aria-labelledby')
        document.querySelector('#'+reviewId).click()
      },
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
  
  
  
  