import React from "react";
import { Table, message } from "antd";
import { columns } from "../../constants/ResultTableColumns";
import { api } from '../../api/MainApi';
import { ProductModel } from "../../api/models/ProductModel";
import { ProductMatchedListResult } from "../../api/models/ProductMatchedListResult";

const ResultTable: React.FC = () => {
  const [dataSourse, setDataSourse] = React.useState<ProductModel[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true)
    api.getProductMatchedList()
      .then((data: ProductMatchedListResult) => {
        message.success('Загрузка данных завершена')
        setDataSourse(data.product_list);
      })
      .catch(() => {
        message.error('Что-то пошло не так...');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [])

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: ProductModel[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };

  return (
    <>
      <Table
        rowKey="product_id"
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
