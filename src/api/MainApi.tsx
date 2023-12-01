import axios from "axios";
import { ProductMatchedListResult } from "./models/ProductMatchedListResult";
import { ProductListResult } from "./models/ProductListResult";
import { ProductDetailResult } from "./models/ProductDetailResult";
import { ProductDetailRequest } from "./models/ProductDetailRequest";
import { DealerListResult } from "./models/DealerListResult";
import { DealerDetailResult } from "./models/DealerDetailResult";
import { ProductStatResult } from "./models/ProductStatResult";

const BASEURL = "https://localhost:8080/api/v1";

// GET product-matched-list/ - Выводит список размеченных товаров
// GET product-list/ - Выводит список неразмеченных товаров
// GET product-detail/id/ - Выводит детализацию товара либо совпадение для разметки
// POST product-detail/id/ - Метод сопоставления товара образцу (действие разметки)
// GET dealer-list/ - Выводит список диллеров
// GET dealer-detail/id/ - Выводит список товаров диллера
// GET product-stat/id/ - Выводит статистику по размеченному товару

const createGetRequest = async (endpoint: string, params?: any) => {
  const data = await axios.get(`${BASEURL}${endpoint}`, {
    params: { ...params },
  });
  return data.data;
};

const createPostRequest = async (endpoint: string, body: any, params?: any) => {
  const data = await axios.post(`${BASEURL}${endpoint}`, body, {
    params: { ...params },
  });
  return data.data;
};

export const api = {
  getProductMatchedList(): Promise<ProductMatchedListResult> {
    return createGetRequest(`/product-matched-list/`);
  },
  getProductList(): Promise<ProductListResult> {
    return createGetRequest(`/product-list/`);
  },
  getProductDetail(productId: string): Promise<ProductDetailResult> {
    return createGetRequest(`product-detail/${productId}/`);
  },

  postProductDetail(productId: string, body: ProductDetailRequest): Promise<ProductDetailResult> {
    return createPostRequest(`product-detail/${productId}/`, body);
  },

  getDealerList(): Promise<DealerListResult> {
    return createGetRequest(`/dealer-list/`);
  },
  getDealerDetail(dealerId: string): Promise<DealerDetailResult> {
    return createGetRequest(`/dealer-detail/${dealerId}/`);
  },
  getProductStat(productId: string): Promise<ProductStatResult> {
    return createGetRequest(`/product-stat/${productId}/`);
  },
};
