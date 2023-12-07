import React from "react";
import { Table, message } from "antd";
import { columns } from "../../constants/ResultTableColumns";
import { api } from '../../api/MainApi';
import { ProductMatchedListResult } from "../../api/models/ProductMatchedListResult";
import { DealerProduct } from "../../api/models/DealerProduct";

export type ResultType = {
  date: string,
  dealer_id: number,
  dealer_name: string;
  dealer_product_id: number,
  price: number,
  product_name: string,
  prosept_product_id: number;
  article: string;
  ean_13: string;
  name: string;
  cost: number;
  min_rec_price: number | null;
  rec_price: number;
  category_id: number;
  ozon_name: string;
  name_1c: string;
  wb_name: string;
  ozon_article: string;
  wb_article: string;
  ym_article: string;
};

const ResultTable: React.FC = () => {
  const [dataSourse, setDataSourse] = React.useState<ResultType[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);


  React.useEffect(() => {
    setIsLoading(true)
    api.getProductMatchedList()
      .then((data: ProductMatchedListResult) => {
        message.success('Загрузка данных завершена')
        const ds = data.product_list.map(
          (item: DealerProduct) => ({
            date: item.dealer_product.dealer_product_info.date,
            dealer_name: item.dealer_product.dealer_product_info.dealer.name,
            price: item.dealer_product.dealer_product_info.price,
            product_name: item.dealer_product.dealer_product_info.product_name,
            prosept_product_id: item.dealer_product.procreator_product.id,
            article: item.dealer_product.procreator_product.article,
            ean_13: item.dealer_product.procreator_product.ean_13,
            name: item.dealer_product.procreator_product.name,
            cost: item.dealer_product.procreator_product.cost,
            min_rec_price: item.dealer_product.procreator_product.min_rec_price,
            rec_price: item.dealer_product.procreator_product.rec_price,
            category_id: item.dealer_product.procreator_product.category_id,
            ozon_name: item.dealer_product.procreator_product.ozon_name,
            name_1c: item.dealer_product.procreator_product.name_1c, //
            wb_name: item.dealer_product.procreator_product.wb_name,
            ozon_article: item.dealer_product.procreator_product.ozon_article,
            wb_article: item.dealer_product.procreator_product.wb_article,
            ym_article: item.dealer_product.procreator_product.ym_article,
          } as ResultType)
        );
        setDataSourse(ds);
      })
      .catch(() => {
        message.error('Что-то пошло не так...');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [])

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: ResultType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };

  return (
    <>
      <Table
        rowKey="prosept_product_id"
        columns={columns(dataSourse)}
        dataSource={dataSourse}
        size='small'
        scroll={{ y: "68vh", x: 'max-content' }}
        bordered
        rowSelection={rowSelection}
        loading={isLoading}
      />
    </>
  );
};

export default ResultTable;
