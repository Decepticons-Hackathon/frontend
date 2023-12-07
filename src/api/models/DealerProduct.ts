import { DealerProductInfo } from "./DealerProductInfo";
import { ProcreatorVariantType } from "./ProcreatorVariantType";

export type DealerProduct = {
  dealer_product: DealerProductInfo,
  procreator_variants: ProcreatorVariantType[];
};
