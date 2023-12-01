import React, { useState } from "react";
import type { TableProps } from "antd";
import { Button, Space, Table } from "antd";
import styles from "./RecommendationsTable.module.scss";
import { useEffect } from "react";

import type {
  ColumnsType,
  FilterValue,
  SorterResult,
} from "antd/es/table/interface";
import TableHelper from "../UploadGoodsTable/HelperTable";

type reccomendstionsType = {
  key: string;
  name: string;
};

const recommendations: reccomendstionsType[] = [
  {
    key: "1",
    name: "Рекомендация 1 что порекомендовать я не знаю, я просто дам тебе этот кекс",
  },

  { key: "2", name: "Рекомендация 2 откуда взять 1 литр, если там было 0.9 л" },
  {
    key: "3",
    name: "Рекомендация 3 эффективная смесь для выбранного товара. Или нет, я не эксперт",
  },
  {
    key: "4",
    name: "Рекомендация 4 суперподходящая для выбранного товара. Крекеры по 2 литра и один бублик",
  },
];

export const ReccomendationsTable: React.FC<{
  updateEmptyState: (isEmpty: boolean) => void;
}> = ({ updateEmptyState }) => {
  useEffect(() => {
    const isEmpty = recommendations.length === 0;
    updateEmptyState(isEmpty);
  }, [recommendations]);

  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<
    SorterResult<reccomendstionsType>
  >({});
  const [selectedLine, setSelectedLine] = useState<string | null>(null);
  const onLineClick = (record: reccomendstionsType) => {
    // console.log("вижу клик");
    setSelectedLine(record.key);
  };

  const handleChange: TableProps<reccomendstionsType>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter as SorterResult<reccomendstionsType>);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const columns: ColumnsType<reccomendstionsType> = [
    {
      title: "Предлагаемое наименование товара",
      dataIndex: "name",
      key: "name",
      ...TableHelper.getStringListColumnSearchProps("name", recommendations),

      // sortOrder: sortedInfo.columnKey === "product" ? sortedInfo.order : null,
      ellipsis: true,
    },
  ];

  return (
    <div>
      <Space style={{ marginTop: 15 }}>
        <Button style={{ marginBottom: 15 }} onClick={clearFilters}>
          Сбросить фильтры
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={recommendations}
        onChange={handleChange}
        size="small"
        pagination={{
          pageSize: 4,
        }}
        bordered
        onRow={(record) => ({
          onClick: () => onLineClick(record),
        })}
        rowClassName={(record) =>
          record.key === selectedLine ? styles.selectedLine : ""
        }
      />
    </div>
  );
};

export default ReccomendationsTable;
