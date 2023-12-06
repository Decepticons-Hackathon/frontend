import { DealerProductDetail } from "./DealerProductDetail";

// Продукты дилеров
export type DealerDetailResult = {
  dealer_products: DealerProductDetail[],
  dealer_products_count: number,
};
