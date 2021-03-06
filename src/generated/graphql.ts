
      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "CartAddressInterface": [
      "BillingCartAddress",
      "ShippingCartAddress"
    ],
    "CartItemInterface": [
      "SimpleCartItem",
      "VirtualCartItem",
      "DownloadableCartItem",
      "BundleCartItem",
      "ConfigurableCartItem"
    ],
    "ProductInterface": [
      "VirtualProduct",
      "SimpleProduct",
      "DownloadableProduct",
      "BundleProduct",
      "GroupedProduct",
      "ConfigurableProduct"
    ],
    "CategoryInterface": [
      "CategoryTree"
    ],
    "MediaGalleryInterface": [
      "ProductImage",
      "ProductVideo"
    ],
    "ProductLinksInterface": [
      "ProductLinks"
    ],
    "CreditMemoItemInterface": [
      "DownloadableCreditMemoItem",
      "BundleCreditMemoItem",
      "CreditMemoItem"
    ],
    "OrderItemInterface": [
      "DownloadableOrderItem",
      "BundleOrderItem",
      "OrderItem"
    ],
    "InvoiceItemInterface": [
      "DownloadableInvoiceItem",
      "BundleInvoiceItem",
      "InvoiceItem"
    ],
    "ShipmentItemInterface": [
      "BundleShipmentItem",
      "ShipmentItem"
    ],
    "AggregationOptionInterface": [
      "AggregationOption"
    ],
    "LayerFilterItemInterface": [
      "LayerFilterItem",
      "SwatchLayerFilterItem"
    ],
    "PhysicalProductInterface": [
      "SimpleProduct",
      "BundleProduct",
      "GroupedProduct",
      "ConfigurableProduct"
    ],
    "CustomizableOptionInterface": [
      "CustomizableAreaOption",
      "CustomizableDateOption",
      "CustomizableDropDownOption",
      "CustomizableMultipleOption",
      "CustomizableFieldOption",
      "CustomizableFileOption",
      "CustomizableRadioOption",
      "CustomizableCheckboxOption"
    ],
    "CustomizableProductInterface": [
      "VirtualProduct",
      "SimpleProduct",
      "DownloadableProduct",
      "BundleProduct",
      "ConfigurableProduct"
    ],
    "SwatchDataInterface": [
      "ImageSwatchData",
      "TextSwatchData",
      "ColorSwatchData"
    ],
    "SwatchLayerFilterItemInterface": [
      "SwatchLayerFilterItem"
    ]
  }
};
      export default result;
    