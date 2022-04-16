import { mapGetters } from "vuex"
import quoteMixin from "~/mixins/quote.js";
import productsMixin from "~/mixins/catalog/products.js";
import brandsMixin from "~/mixins/others/brands.js";

export default {
  mixins: [quoteMixin, productsMixin, brandsMixin],
  computed: {
    ...mapGetters({
      headers: "others/global/getHeaderData",
      homeSchoolSupplies: "catalog/category/getHomeSchoolSupplies",
      homeArtsCraft: "catalog/category/getHomeArtsCraft",
      homeOfficeSupplies: "catalog/category/getHomeOfficeSupplies",
      category: "catalog/category/getCategory",
      isCategory: "catalog/category/getIsCategory",
      currentPage: "catalog/category/getCurrentPage",
      sortCategory: "catalog/category/getSortCategory",

      //Pagination
      paginations: "catalog/category/getPaginations",
      showPreviousButton: "catalog/category/getShowPreviousButton",
      showNextButton: "catalog/category/getShowNextButton",

      // Search Page
      searchKeyword: "catalog/products/getSearchKeyword",
      searchResultProductsShow: "catalog/products/getSearchResultProductsShow"
    }),
  },

  data(){
    return {
      pageSize: 12,
      inStock: 'IN_STOCK',
      displayModeProduct: 'PRODUCTS',
      showSelectedFiltered: false,
      selectedFiltered: [],

      // Pagination
      minusCurrentPage: 2,
      plusCurrentPage: 2,

      loading: true,
    }
  },

  methods: {
    async getCategory(urlKey, pageSize = this.pageSize, currentPage=this.currentPage, loading=this.loading) {
      const payload = {
        variables: {
          categoryFilters:{
            url_key:{
              eq: urlKey
            }
          },
          pageSize: pageSize,
          currentPage: currentPage
        },
        headers: this.headers,
        loading: loading
      }
      await this.$store.dispatch("catalog/category/getCategoryAction", payload)
    },

    async getSearchCategory(searchkey, pageSize = this.pageSize, currentPage=this.currentPage){
      const payload = {
        variables: {
          categoryFilters:{
            name:{
              match: searchkey
            }
          },
          pageSize: pageSize,
          currentPage: currentPage
        },
        headers: this.headers,
      }
      await this.$store.dispatch("catalog/category/getCategoryAction", payload)
    },

    setDefaultQty(category) {
      if(category.products.items.length > 0) {
        category.products.items.forEach(function(value, index){
          category.products.items[index]['qty'] = 1
          category.products.items[index]['qty_error_msg'] = null
        })
      }
      return category
    },

    updateQty(category, productId, qty) {
      if(category.products.items.length > 0) {
        category.products.items.forEach(function(value, index){
          if(value.id === productId) {
            category.products.items[index]['qty'] = parseInt(qty)
          }
        })
      }
      return category
    },

    addTocart(product) {

      // Add to cart
      let payload = {
        cartItems: [
          {
            data:{
              sku: product.sku,
              quantity: product.qty
            }
          }
        ]
      }

      if(product.type_id === 'simple') {
        this.addSimpleProductToCart(payload)
        return
      }
      this.$router.push({ path: '/'+product.url_key });
    },

    getProductCategoryFilter() {
      let payload = {
        category_id:{
          eq: parseInt(this.category.id)
        }
      }
      return payload
    },

    getProductBrandFilter() {
      let payload = {
        manufacturer:{
          eq: parseInt(this.selectedBrand.brand_id )
        }
      }
      return payload
    },

    manageProductFilters() {
      let filters = {}
      let search = ""

      if(this.searchResultProductsShow) {
        search = this.searchKeyword
      }else if(this.brandProductShow){
        filters = this.getProductBrandFilter()
      }else{
        filters = this.getProductCategoryFilter()
      }

      let otherFilters = this.otherFilterOptions()

      if(Object.keys(otherFilters).length > 0) {
        filters = {...filters , ...otherFilters}
      }

      let payload = {
        filter: filters,
        search: search,
        pageSize: this.pageSize,
        currentPage: parseInt(this.currentPage)
      }

      payload = this.manageSort(payload)

      return payload
    },

    manageSort(params) {
      if(this.sortCategory != null){
        params['sort'] = this.sortCategory
      }
      return params
    },

    otherFilterOptions() {
      let that = this
      let otherFilterOptions = {}
      if(that.aggregations.length > 0) {
        that.aggregations.forEach(function(value){
          if(value.options && value.options.length > 0) {
            let selectedFilters = []
            value.options.forEach(function(_value){
              if(_value.selected && value.attribute_code != "price") {
                selectedFilters.push(_value.value)
              }
            })


            // Price
            if(value.attribute_code === "price") {
              selectedFilters = { from: value.value[0].toString(), to: value.value[1].toString() }
            }

            if(selectedFilters.length > 0 || Object.keys(selectedFilters).length > 0) {
              if(value.attribute_code === "price") {
                otherFilterOptions[value.attribute_code] = selectedFilters
              }else{
                otherFilterOptions[value.attribute_code] = {
                  in: selectedFilters
                }
              }
            }
          }
        })
      }
      return otherFilterOptions
    },

    async managePaginations() {
      let that = this
      let totalPage = that.products.page_info.total_pages
      await this.$store.commit("catalog/category/setPaginations", [])
      let paginations = []
      if(totalPage > 1){
        for (let i = 1; i <= totalPage; i++) {

          paginations.push({
            'class': that.getPaginationsClass(i),
            'value': i
          })
        }
      }
      await this.$store.commit("catalog/category/setPaginations", paginations)

      // Next Page
      await this.$store.commit("catalog/category/setShowNextButton", true)
      if(that.currentPage == totalPage) {
        await this.$store.commit("catalog/category/setShowNextButton", false)
      }

      // Previous Page
      await this.$store.commit("catalog/category/setShowPreviousButton", true)
      if(that.currentPage == 1){
        await this.$store.commit("catalog/category/setShowPreviousButton", false)
      }


      // Update Query
      this.updateQueryOfBrowser()
    },

    getPaginationsClass(value){
      let response = 'hide'
      let minusValue = this.currentPage - this.minusCurrentPage
      let plusValue = this.currentPage + this.plusCurrentPage
      if(minusValue <= value && plusValue >= value){
        response = 'show'
      }

      if(value == this.currentPage) {
        response+=' active'
      }

      return response
    },

    getPageInfo() {
      let html = ''

      if(Object.keys(this.products).length > 0){

        let pageInfo = this.products.page_info;

        html = 'items '

        let lastNumberProduct = pageInfo.page_size*pageInfo.current_page

        html+=(lastNumberProduct-pageInfo.page_size+1)+'-'

        if(lastNumberProduct > this.products.total_count){
          lastNumberProduct = this.products.total_count
        }
        html+=(lastNumberProduct)+' of '

        html+=this.products.total_count
      }

      return html
    },

    // Update Query
    updateQueryOfBrowser() {

      let that = this
      let filter = false
      let page = false

      let query = this.$route.query

      if(that.currentPage > 1){
        page = true
        query = {...query, p: that.currentPage }
      }else{
        query = {}
      }

      let selectedAggregationsQuery = this.checkQueryForAggregations()
      if(Object.keys(selectedAggregationsQuery).length > 0){
        filter = true
        query = {...query, ...selectedAggregationsQuery }
      }




      if(filter || page){
        this.$router.push({path: this.$route.path, query: query})
      }else{
        this.$router.push({path: this.$route.path})
      }
    },

    checkQueryForAggregations() {
      let that = this
      let queryObject ={}

      if(that.aggregations.length > 0) {
        that.aggregations.forEach(function(value){

          if(value.attribute_code === 'price') {
            //queryObject[value.attribute_code] = value.value.join()
          }

          if(value.options.length > 0){
            let selectedValues = []
            value.options.forEach(function(_value){
              if(_value.selected) {
                selectedValues.push(_value.value)
              }
            })
            if(selectedValues.length > 0){
              queryObject[value.attribute_code] = selectedValues.join()
            }
          }
        })
      }

      return queryObject
    },

    async manageAggregations() {
      let query = this.$route.query
      let _aggregations = JSON.parse(JSON.stringify(this.aggregations));
      let response = false


      // Delete Pagination query
      delete query.p

      if(Object.keys(query).length > 0 && _aggregations.length > 0) {
        _aggregations.forEach(function(value, index){
          if(query[value.attribute_code]) {
            let options = query[value.attribute_code].split(',')
            if(value.options.length > 0){

              if(value.attribute_code == 'price') {
                _aggregations[index].value=[
                  options[0],
                  options[1]
                ]
              }else{
                value.options.forEach(function(option, _index){
                  if(options.indexOf(option.value) != -1) {
                    _aggregations[index].options[_index].selected = true
                    response = true
                  }
                })
              }

            }
          }
        })
      }

      await this.$store.commit(
        "catalog/products/setAggregations",
        _aggregations
      );

      if(response){
        await this.getProducts(this.manageProductFilters())
        await this.$store.commit(
          "catalog/products/setAggregations",
          _aggregations
        );
      }

    },

    checkAggregationsIsSelected() {
      let that = this
      that.selectedFiltered = []
      if(that.aggregations.length > 0) {
        that.aggregations.forEach(function(value){
          if(value.attribute_code !== 'price') {
            if(value.options.length > 0){
              value.options.forEach(function(_value){
                if(_value.selected) {
                  that.selectedFiltered.push({label: _value.label, value:_value.value})
                }
              })
            }
          }
        })
      }
    },

    async showCategoryPage() {
      await this.$store.commit("others/brands/setBrandProductShow", false)
      await this.$store.commit("catalog/products/setSearchResultProductsShow", false)
    }
  },
}
