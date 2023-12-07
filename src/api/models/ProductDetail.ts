import { DealerList } from "./DealerList";
import { DealerProductHistory } from "./DealerProductHistory";
import { DealerProductStatus } from "./DealerProductStatus";

export type ProductDetail = {
  date: string,
  dealer: DealerList,
  dealer_product_history: DealerProductHistory[],
  dealer_product_status: DealerProductStatus,
  id: number,
  price: number,
  product_name: string,
  product_url: string,
};
