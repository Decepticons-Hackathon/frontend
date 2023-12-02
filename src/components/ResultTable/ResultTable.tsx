import React from "react";
import { Table } from "antd";
import { columns } from "../../constants/ResultTableColumns";
import { ProductMatchedListResult } from "../../api/models/ProductMatchedListResult";
import { ProductListResult } from "../../api/models/ProductListResult";
import { api } from '../../api/MainApi';
import { ProductModel } from "../../api/models/ProductModel";

const ResultTable: React.FC = () => {
  const [dataSourse, setDataSourse] = React.useState<ProductModel[]>([]);

  React.useEffect(() => {
    api.getProductList()
      .then((data: ProductListResult) => {
        setDataSourse(data.products);
      })
      .catch(console.error);
  }, [])
  // React.useEffect(() => {
  //   api.getProductMatchedList()
  //     .then((data: ProductMatchedListResult) => {
  //       setDataSourse(data.products);
  //     })
  //     .catch(console.error);
  // }, [])

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
      />
    </>
  );
};

export default ResultTable;
