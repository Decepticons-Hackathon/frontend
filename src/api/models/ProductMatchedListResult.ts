import { ProductModel } from "./ProductModel";

export type ProductMatchedListResult = {
  product_list: ProductModel[],
  products_count: number,
};
