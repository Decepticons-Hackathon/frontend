import axios from "axios";
import { ProductMatchedListResult } from "./models/ProductMatchedListResult";
import { ProductListResult } from "./models/ProductListResult";
import { DealerDetailResult } from "./models/DealerDetailResult";
import { ProductStatResult } from "./models/ProductStatResult";

const BASEURL = "http://81.31.246.148:8000/api/v1";

// GET   product-to-matched-list/ список не размеченных товаров
// GET   product-list/                       список товаров просепта
// POST product-matching/<id>/         действие разметки button: approve/disapprove/aside dealer_product_id: id продукта дилера product_id: id продукта производителя is_manual: True/False
// GET   dealer-list/                          список диллеров
// GET   dealer-detail/<id>/            список товаров диллера
// GET   product-stat/<id>/             статистика по товару
// POST ml-force-update/               запустить обновление рекоммендаций

const createGetRequest = async (endpoint: string, params?: any) => {
  const response = await axios.get(`${BASEURL}${endpoint}`, {
    params: { ...params },
  });
  return response.data.data;
};

const createPostRequest = async (endpoint: string, body: any, params?: any) => {
  const response = await axios.post(`${BASEURL}${endpoint}`, body, {
    params: { ...params },
  });
  return response.data.data;
};

export const api = {
  // продукты для мэтчинга
  getProductToMatching(): Promise<DealerDetailResult> {
    return createGetRequest(`/product-to-matched-list/?offset=0&limit=10`);
  },
  // все товары
  getProductMatchedList(): Promise<ProductMatchedListResult> {
    return createGetRequest(`/dealer-product-list/`);
  },
// товары просепт
  getProductList(): Promise<ProductListResult> {
    return createGetRequest(`/product-list/`);
  },
  // getProductDetail(productId: string): Promise<ProductDetailResult> {
  //   return createGetRequest(`product-detail/${productId}/`);
  // },

  // getDealerList(): Promise<DealerListResult> {
  //   return createGetRequest(`/dealer-list/`);
  // },
  getDealerDetail(dealerId: string): Promise<DealerDetailResult> {
    return createGetRequest(`/dealer-detail/${dealerId}/`);
  },
  getProductStat(productId: string): Promise<ProductStatResult> {
    return createGetRequest(`/product-stat/${productId}/`);
  },

  // отправить запрос на мэтч
  // postProductDetail(productId: string, body: ProductDetailRequest): Promise<ProductDetailResult> {
  //   return createPostRequest(`product-matching/${productId}/`, body);
  // },
};
