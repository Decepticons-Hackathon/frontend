import React, { useState } from "react";
import type { TableProps } from "antd";
import { Button, Space, Table } from "antd";
import type {
  ColumnsType,
  FilterValue,
  SorterResult,
} from "antd/es/table/interface";
import TableHelper from "./HelperTable";

type DataType = {
  key: string;
  name: string;
};

const data: DataType[] = [
  {
    key: "1",
    name: "Санитайзер Санитайзер Санитайзер Санитайзер Санитайзер Санитайзер Санитайзер Санитайзер Санитайзер Санитайзер Санитайзер Санитайзер Санитайзер",
  },
  {
    key: "2",
    name: "Чистящее средство для окон 1 литр суперэффективный самый лучший",
  },
  {
    key: "3",
    name: "Универсальный очиститель 00104 кек 2400 литр эффективный",
  },
  { key: "4", name: "Средство для мытья посудыыыыыыыыыыыыыыы" },
  { key: "5", name: "Порошок для стирки" },
  { key: "6", name: "Ополаскиватель для белья" },
  { key: "7", name: "Чистящее средство для ванны" },
  { key: "8", name: "Средство для чистки ковров" },
  { key: "9", name: "Дезинфицирующий спрей" },
  { key: "10", name: "Средство для удаления пятен" },
  { key: "11", name: "Жидкость для мытья полов" },
  { key: "12", name: "Средство для чистки туалета" },
  { key: "13", name: "Освежитель воздуха" },
  { key: "14", name: "Средство от налета и ржавчины" },
  { key: "15", name: "Антибактериальное мыло" },
  { key: "16", name: "Чистящие салфетки" },
  { key: "17", name: "Средство для уборки кухни" },
  { key: "19", name: "Моющее средство для душа" },
  { key: "20", name: "Средство для чистки зеркал" },
  { key: "4", name: "Средство для мытья посудыыыыыыыыыыыыыыы" },
  { key: "5", name: "Порошок для стирки" },
  { key: "6", name: "Ополаскиватель для белья" },
  { key: "7", name: "Чистящее средство для ванны" },
  { key: "8", name: "Средство для чистки ковров" },
  { key: "9", name: "Дезинфицирующий спрей" },
  { key: "10", name: "Средство для удаления пятен" },
  { key: "11", name: "Жидкость для мытья полов" },
  { key: "12", name: "Средство для чистки туалета" },
  { key: "13", name: "Освежитель воздуха" },
  { key: "14", name: "Средство от налета и ржавчины" },
  { key: "15", name: "Антибактериальное мыло" },
  { key: "16", name: "Чистящие салфетки" },
  { key: "17", name: "Средство для уборки кухни" },
  { key: "19", name: "Моющее средство для душа" },
  { key: "20", name: "Средство для чистки зеркал" },
];

const ResultTable: React.FC = () => {
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});

  const handleChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter as SorterResult<DataType>);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const setDateSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "date",
    });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Наименование товара дилера",
      dataIndex: "name",
      key: "name",
      ...TableHelper.getStringListColumnSearchProps("name", data),
      sortOrder: sortedInfo.columnKey === "product" ? sortedInfo.order : null,
      ellipsis: true,
    },

    // {
    //   title: "Предлагаемое наименование товара",
    //   dataIndex: "suggestion",
    //   key: "suggestion",
    //   ...TableHelper.getStringListColumnSearchProps("suggestion", data),
    //   sorter: (a, b) => a.suggestion.length - b.suggestion.length,
    //   sortOrder:
    //     sortedInfo.columnKey === "suggestion" ? sortedInfo.order : null,
    //   ellipsis: true,
    // },
  ];

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={setDateSort}>Sort date</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table
        columns={columns}
        dataSource={data}
        onChange={handleChange}
        size="small"
        bordered
      />
    </>
  );
};

export default ResultTable;
