<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
	<div class="toolbar-section">
		<div class="pagination">
			<div class="left-side">
				<span>{{ getPageInfo() }}</span>
			</div>
		</div>
		<div class="field limiter" v-if="paginations.length > 0">
			<div class="space-box">
        <a href="javascript:void(0)" v-if="showPreviousButton" @click="updatePaginations(currentPage-1)">
          <i class="fal fa-chevron-left"></i><span class="hide-element">previous</span>
        </a>
        <a
          href="javascript:void(0)"
          v-for="(pagination, index) in paginations"
          :key="index"
          :class="pagination.class"
          @click="updatePaginations(pagination.value)"
        >
          <span>{{ pagination.value }}</span>
        </a>
        <a class="last-item" href="javascript:void(0)" v-if="showNextButton" @click="updatePaginations(currentPage+1)">
          <i class="fal fa-chevron-right"></i><span class="hide-element">next</span>
        </a>
			</div>
		</div>
	</div>
</template>

<script>
import categoryMixin from "~/mixins/catalog/category.js";
import productsMixin from "~/mixins/catalog/products.js";
export default {
  name: "Toolbar",
  mixins: [categoryMixin, productsMixin],
  data(){
    return {
      sortBy:[
        {
          key: 'position',
          title: 'Position'
        },
        {
          key: 'name',
          title: 'Product Name'
        },
        {
          key: 'price',
          title: 'Price'
        }
      ]
    }
  },
  methods:{
    async updatePaginations(currentPage) {
      let _aggregations = JSON.parse(JSON.stringify(this.aggregations));
      await this.$store.commit("catalog/category/setCurrentPage", currentPage)
      await this.getProducts(this.manageProductFilters())
      await this.$store.commit(
        "catalog/products/setAggregations",
        _aggregations
      );
      await this.managePaginations()
    },
    async changeSortBy(data) {

    }
  }
};
</script>
