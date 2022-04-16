import { mapGetters } from "vuex"
export default {
  computed: {
    ...mapGetters({
      headers: "others/global/getHeaderData",
      brands: "others/brands/getBrands",
      letters: "others/brands/getLetters",
      selectedBrand: "others/brands/getSeletedBrand",
      brandProductShow: "others/brands/getBrandProductShow"
    }),
  },
  methods: {
    async getBrands(params = []) {
      let payload = {
        variables: params,
        headers: this.headers
      }
      await this.$store.dispatch("others/brands/getBrandsAction", payload)
    },

    async setSeletedBrand(brandCode) {
      let that = this
      let brand = {}
      if(that.brands.length > 0) {
        that.brands.forEach(function(value){
          if(value.code === brandCode.toLowerCase()) {
            brand = value
          }
        })
      }
      await that.$store.commit("others/brands/setSeletedBrand", brand)
    },

    async showBrandProductPage() {
      this.$store.commit("others/brands/setBrandProductShow", true)
      this.$store.commit("catalog/products/setSearchResultProductsShow", false)
    }
  }
}
