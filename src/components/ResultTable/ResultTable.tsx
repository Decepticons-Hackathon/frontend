import React from "react";
import { Space, Table } from "antd";
import { data } from '../../constants/constants';
import { columns } from "../../constants/ResultTableColumns";
import { ProductDetailResult } from "../../api/models/ProductDetailResult";

const ResultTable: React.FC = () => {
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: ProductDetailResult[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        {/* <Button onClick={setDateSort}>Sort date</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button> */}
      </Space>
      <Table
        rowKey="product_id"
        columns={columns(data.products)}
        dataSource={data.products}
        size='small'
        scroll={{y: "68vh", x: 'max-content'}}
        // scroll={{x: 'max-content'}}
        // scroll={{ x: 2000, y: 400 }}
        bordered
        rowSelection={rowSelection}
        //scroll={{ x: '10%'}}
      />
    </>
  );
};

export default ResultTable;

// onChange={handleChange}
