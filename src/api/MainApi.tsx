import axios from "axios";
import { ProductMatchedListResult } from "./models/ProductMatchedListResult";
import { ProductListResult } from "./models/ProductListResult";
import { DealerDetailResult } from "./models/DealerDetailResult";
import { ProductStatResult } from "./models/ProductStatResult";
import { ProductDetailRequest } from "./models/ProductDetailRequest";

const BASEURL = "http://81.31.246.148:8000/api/v1";

const createGetRequest = async (endpoint: string, params?: any) => {
  const source = axios.CancelToken.source();
  const response = await axios.get(`${BASEURL}${endpoint}`, {
    params: { ...params },
    cancelToken: source.token,
  });
  return response.data.data;
};

const createPostRequest = async (endpoint: string, body: any, params?: any) => {
  const response = await axios.post(`${BASEURL}${endpoint}`, body, {
    params: { ...params },
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data;
};

export const api = {
  // продукты для мэтчинга
  getProductToMatching(): Promise<DealerDetailResult> {
    return createGetRequest(`/product-to-matched-list/?offset=0&limit=100`);
  },
  // все товары
  getProductMatchedList(): Promise<ProductMatchedListResult> {
    return createGetRequest(`/dealer-product-list/?offset=0&limit=300`);
  },
  // товары просепт
  getProductList(): Promise<ProductListResult> {
    return createGetRequest(`/product-list/`);
  },
  // статистика
  getProductStat(productId: string): Promise<ProductStatResult> {
    return createGetRequest(`/product-stat/${productId}/`);
  },

  // отправить запрос на мэтч
  postProductDetail(body: ProductDetailRequest): Promise<ProductDetailRequest> {
    return createPostRequest(`/product-matching/`, body);
  },

  postProductStatusChange(body: any): Promise<any> {
    return createPostRequest(`/product-matching/`, body);
  },
};
