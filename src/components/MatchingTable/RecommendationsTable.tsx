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

type RecommendationsType = {
  key: string;
  name: string;
};

type RecommendationsTableProps = {
  recommendationsData: RecommendationsType[];
  onRowSelectedRecommendations: (isSelected: boolean) => void;
};

export const RecommendationsTable: React.FC<RecommendationsTableProps> = ({
  recommendationsData,
  onRowSelectedRecommendations,
}) => {
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<
    SorterResult<RecommendationsType>
  >({});
  const [selectedLine, setSelectedLine] = useState<string | null>(null);
  const onLineClick = (record: RecommendationsType) => {
    setSelectedLine(record.key);
    onRowSelectedRecommendations(true);
    console.log("kek");
  };

  useEffect(() => {
    setSelectedLine(null);
    onRowSelectedRecommendations(false);
  }, [recommendationsData]);

  const handleChange: TableProps<RecommendationsType>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter as SorterResult<RecommendationsType>);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const columns: ColumnsType<RecommendationsType> = [
    {
      title: "Предлагаемое наименование товара",
      dataIndex: "name",
      key: "name",
      ...TableHelper.getStringListColumnSearchProps(
        "name",
        recommendationsData
      ),

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
        dataSource={recommendationsData}
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

export default RecommendationsTable;
