import React from "react";
import { Space, Table } from "antd";
import { data } from '../../constants/constants';
import { columns } from "../../constants/ResultTableColumns";

const ResultTable: React.FC = () => {

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        {/* <Button onClick={setDateSort}>Sort date</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button> */}
      </Space>
      <Table
        columns={columns(data.products)}
        dataSource={data.products}
        size='small'
        // scroll={{x: 'max-content'}}
        bordered
        scroll={{ x: '10%'}}/>
    </>
  );
};

export default ResultTable;

// onChange={handleChange}
