import { mapGetters } from "vuex"

export default {
  computed: {
    ...mapGetters({
      headers: "others/global/getHeaderData",
      customAttributeMetadatas: "catalog/customAttribute/getCustomAttributeMetadata"
    }),
  },

  data(){
    return {
      defaultQuery:{
        attributes:[
          {
            attribute_code: "product_label",
            entity_type: "catalog_product"
          },
          {
            attribute_code: "manufacturer",
            entity_type: "catalog_product"
          },
          {
            attribute_code: "color",
            entity_type: "catalog_product"
          },
          {
            attribute_code: "colour_apparel",
            entity_type: "catalog_product"
          },
          {
            attribute_code: "apparel_size",
            entity_type: "catalog_product"
          }
        ]
      },

      productLabelCode: 'product_label'
    }
  },

  methods: {
    async getCustomAttributes() {
      const payload = {
        variables: this.defaultQuery,
        headers: this.headers,
      }
      await this.$store.dispatch("catalog/customAttribute/getCustomAttributeMetadataAction", payload)
    },

    getCustomAttributeLabel(attributeCode, lableId){
      let label = null
      if(this.customAttributeMetadatas.length > 0) {
        this.customAttributeMetadatas.forEach(function(value){
          if(value.attribute_code === attributeCode ) {
            if(value.attribute_options.length > 0) {
              value.attribute_options.forEach(function(_value){
                if(parseInt(_value.value) == parseInt(lableId)) {
                  label = _value.label
                }
              })
            }
          }
        })
      }
      return label
    }
  },
}
