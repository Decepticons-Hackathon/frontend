import { ProductDetailResult } from "../api/models/ProductDetailResult";
import TableHelper from "../components/TableHelper/TableHelper";

export const columns = (data: ProductDetailResult[]) => [
  {
    title: "ID продукта",
    dataIndex: "product_id",
    key: "product_id",
    sorter: (a: ProductDetailResult, b: ProductDetailResult) => a.product_id - b.product_id,
  },
  {
    title: "Артикль",
    dataIndex: "article",
    key: "article",
    ...TableHelper.getStringListColumnSearchProps("article", data),
    sorter: (a: ProductDetailResult, b: ProductDetailResult) => a.article.length - b.article.length,
  },
  {
    title: "Код товара",
    dataIndex: "ean_13",
    key: "ean_13",
    ...TableHelper.getStringListColumnSearchProps("ean_13", data),
    sorter: (a: ProductDetailResult, b: ProductDetailResult) => a.ean_13.length - b.ean_13.length,
  },
  {
    title: "Наименование товара",
    dataIndex: "name",
    key: "name",
    ...TableHelper.getStringListColumnSearchProps("name", data),
    sorter: (a: ProductDetailResult, b: ProductDetailResult) => a.name.length - b.name.length,
  },
  {
    title: "Стоимость",
    dataIndex: "cost",
    key: "cost",
    sorter: (a: ProductDetailResult, b: ProductDetailResult) => a.cost - b.cost,
  },
  {
    title: "МРРЦ",
    dataIndex: "min_rec_price",
    key: "min_rec_price",
    sorter: (a: ProductDetailResult, b: ProductDetailResult) => a.min_rec_price - b.min_rec_price,

  },
  {
    title: "РРЦ",
    dataIndex: "rec_price",
    key: "rec_price",
    sorter: (a: ProductDetailResult, b: ProductDetailResult) => a.rec_price - b.rec_price,
  },
  {
    title: "Категория товара",
    dataIndex: "category_id",
    key: "category_id",
    sorter: (a: ProductDetailResult, b: ProductDetailResult) => a.category_id - b.category_id,
  },
  {
    title: "OZON",
    dataIndex: "ozon_name",
    key: "ozon_name",
    ...TableHelper.getStringListColumnSearchProps("ozon_name", data),
    sorter: (a: ProductDetailResult, b: ProductDetailResult) => a.ozon_name.length - b.ozon_name.length,
  },
  {
    title: "1С",
    dataIndex: "name_1c",
    key: "name_1c",
    ...TableHelper.getStringListColumnSearchProps("name_1c", data),
    sorter: (a: ProductDetailResult, b: ProductDetailResult) => a.name_1c.length - b.name_1c.length,
  },
  {
    title: "Wildberries",
    dataIndex: "wb_name",
    key: "wb_name",
    ...TableHelper.getStringListColumnSearchProps("wb_name", data),
    sorter: (a: ProductDetailResult, b: ProductDetailResult) => a.wb_name.length - b.wb_name.length,
  },
  {
    title: "OZON описание",
    dataIndex: "ozon_article",
    key: "ozon_article",
    ...TableHelper.getStringListColumnSearchProps("ozon_article", data),
    sorter: (a: ProductDetailResult, b: ProductDetailResult) => a.ozon_article.length - b.ozon_article.length,
  },
  {
    title: "Wildberries артикул",
    dataIndex: "wb_article",
    key: "wb_article",
    ...TableHelper.getStringListColumnSearchProps("wb_article", data),
    sorter: (a: ProductDetailResult, b: ProductDetailResult) => a.wb_article.length - b.wb_article.length,
  },
  {
    title: "ЯМ артикул",
    dataIndex: "ym_article",
    key: "ym_article",
    ...TableHelper.getStringListColumnSearchProps("ym_article", data),
    sorter: (a: ProductDetailResult, b: ProductDetailResult) => a.ym_article.length - b.ym_article.length,
  },
];
