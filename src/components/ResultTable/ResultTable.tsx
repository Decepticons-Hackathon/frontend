import React, { useState } from "react";
import type { TableProps } from "antd";
import { Button, Space, Table } from "antd";
import type {
  ColumnsType,
  FilterValue,
  SorterResult,
} from "antd/es/table/interface";
import TableHelper from "../TableHelper/TableHelper";

interface DataType {
  key: string;
  name: string;
  dealer: string;
  product: string;
  date: number;
  price: number;
  dealerPrice: number;
  status: string;
}

const data: DataType[] = [
  {
    key: "1",
    name: "OZON",
    dealer: 'Castorama',
    product: "Антисептик",
    date: 1,
    price: 10,
    dealerPrice: 12,
    status: 'Ok',
  },
  {
    key: "2",
    name: "Wildberries",
    dealer: 'Castorama',
    product: "Краска",
    date: 3,
    price: 20,
    dealerPrice: 22,
    status: 'Postponed',
  },
  {
    key: "3",
    name: "Yandex Market",
    dealer: 'Castorama',
    product: "Стеклоочиститель",
    date: 2,
    price: 30,
    dealerPrice: 32,
    status: 'Postponed',
  },
  {
    key: "4",
    name: "Wildberries",
    dealer: 'Castorama',
    product: "Антисептик",
    date: 1,
    price: 10,
    dealerPrice: 12,
    status: 'Ok',
  },
  {
    key: "5",
    name: "Yandex Market",
    dealer: 'Castorama',
    product: "Антисептик",
    date: 1,
    price: 10,
    dealerPrice: 12,
    status: 'Rejected',
  },
  {
    key: "6",
    name: "OZON",
    dealer: 'Ромашка',
    product: "Антисептик",
    date: 1,
    price: 10,
    dealerPrice: 12,
    status: 'Rejected',
  },
];

const ResultTable: React.FC = () => {
  // const [filteredInfo, setFilteredInfo] = useState<
  //   Record<string, FilterValue | null>
  // >({});
  // const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});

  // const handleChange: TableProps<DataType>["onChange"] = (
  //   pagination,
  //   filters,
  //   sorter
  // ) => {
  //   console.log("Various parameters", pagination, filters, sorter);
  //   setFilteredInfo(filters);
  //   setSortedInfo(sorter as SorterResult<DataType>);
  // };

  // const clearFilters = () => {
  //   setFilteredInfo({});
  // };

  // const clearAll = () => {
  //   setFilteredInfo({});
  //   setSortedInfo({});
  // };

  // const setDateSort = () => {
  //   setSortedInfo({
  //     order: "descend",
  //     columnKey: "date",
  //   });
  // };

  const columns: ColumnsType<DataType> = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      ...TableHelper.getStringListColumnSearchProps("product", data),
      // sortOrder: sortedInfo.columnKey === "product" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Dealer",
      dataIndex: "dealer",
      key: "dealer",
      ...TableHelper.getStringListColumnSearchProps("dealer", data),
      sorter: (a, b) => a.dealer.length - b.dealer.length,
      // sortOrder: sortedInfo.columnKey === "dealer" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Marketplace",
      dataIndex: "name",
      key: "name",
      ...TableHelper.getStringListColumnSearchProps("name", data),
      sorter: (a, b) => a.name.length - b.name.length,
      // sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => a.date- b.date,
      // sortOrder: sortedInfo.columnKey === "date" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price- b.price,
      // sortOrder: sortedInfo.columnKey === "price" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "DealerPrice",
      dataIndex: "dealerPrice",
      key: "dealerPrice",
      sorter: (a, b) => a.dealerPrice- b.dealerPrice,
      // sortOrder: sortedInfo.columnKey === "dealerPrice" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      ...TableHelper.getStringListColumnSearchProps("status", data),
      sorter: (a, b) => a.status.length - b.status.length,
      // sortOrder: sortedInfo.columnKey === "status" ? sortedInfo.order : null,
      ellipsis: true,
    },
  ];

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        {/* <Button onClick={setDateSort}>Sort date</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button> */}
      </Space>
      <Table columns={columns} dataSource={data} size='small' bordered />
    </>
  );
};

export default ResultTable;

// onChange={handleChange}
