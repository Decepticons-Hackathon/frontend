import { ProductListResult } from "../api/models/ProductListResult";
import { ProductModel } from "../api/models/ProductModel";
import TableHelper from "../components/TableHelper/TableHelper";

export const columns = (data: ProductListResult[]) => [
  {
    title: "URL",
    dataIndex: "product_url",
    key: "product_url",
    ...TableHelper.getStringListColumnSearchProps("product_url", data),
    width: "12%",
    // render: (text: any) => {
    //   const match = text.match(/https?:\/\/(?:www\.)?([^\/.]+)\./);
    //   const displayText = match ? match[1] : text;
    //   return (
    //     <a href={text} target="_blank" rel="noopener noreferrer">
    //       {displayText}
    //     </a>
    //   );
    // },
  },
  {
    title: "Дата",
    dataIndex: "date",
    key: "date",
    ...TableHelper.getStringListColumnSearchProps("date", data),
    width: "13%",
  },
  {
    title: "Цена",
    dataIndex: "price",
    key: "price",
    ...TableHelper.getNumberColumnSearchProps("price"),
    width: "11%",
  },
  {
    title: "Статус",
    dataIndex: "status",
    key: "status",
    ...TableHelper.getStringListColumnSearchProps("status", data),
    width: "13%",
  },
  {
    title: "Наименование товара",
    dataIndex: "product_name",
    key: "product_name",
    ...TableHelper.getStringListColumnSearchProps("product_name", data),
    width: "48%",
    ellipsis: true,
  },
];
