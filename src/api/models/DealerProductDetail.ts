import { ProcreatorVariantType } from "./ProcreatorVariantType";
import { ProductDetail } from "./ProductDetail";

export type DealerProductDetail = {
  dealer_product: ProductDetail,
  procreator_variants: ProcreatorVariantType[];
};
