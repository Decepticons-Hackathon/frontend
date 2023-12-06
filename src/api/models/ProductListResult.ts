import { ProductModel } from "./ProductModel";
// Список товаров просепта
export type ProductListResult = {
  products: ProductModel[],
  products_count: number,
};
