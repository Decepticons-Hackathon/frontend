import React, { Key, useState } from "react";
import { Table } from "antd";
import styles from "./UploadGoodsTable.module.scss";
import { ParsingType } from "../Matching/Matching";

import type { ColumnsType } from "antd/es/table/interface";
import TableHelper from "../TableHelper/TableHelper";

interface IUploadGoodsTableProps {
  isLoading: boolean;
  dataSource: ParsingType[];
  onUploadSelectClick: (item: ParsingType) => void;
};

const UploadGoodsTable: React.FC<IUploadGoodsTableProps> = (props) => {
  const [selectedId, setSelectedId] = useState<Key>();
  const onLineClick = (record: ParsingType) => {
    props.onUploadSelectClick(record);
    setSelectedId(record.key)
  };

  const columns: ColumnsType<ParsingType> = [
    {
      title: "URL",
      dataIndex: "product_url",
      key: "product_url",
      ...TableHelper.getStringListColumnSearchProps("product_url", props.dataSource),
      width: 100,
      render: (text) => {
        const match = text.match(/https?:\/\/(?:www\.)?([^\/.]+)\./);
        const displayText = match ? match[1] : text;
        return (
          <a href={text} target="_blank" rel="noopener noreferrer">
            {displayText}
          </a>
        );
      },
    },
    {
      title: "Дилер",
      dataIndex: "dealer_name",
      key: "dealer_name",
      ...TableHelper.getStringListColumnSearchProps("dealer_name", props.dataSource),
      width: 100,
    },
    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
      ...TableHelper.getStringListColumnSearchProps("date", props.dataSource),
      width: 100,
    },
    {
      title: "Цена",
      dataIndex: "price",
      key: "price",
      ...TableHelper.getNumberColumnSearchProps("price"),
      width: 100,
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      ...TableHelper.getStringListColumnSearchProps("status", props.dataSource),
      width: 100
    },
    {
      title: "Наименование товара",
      dataIndex: "product_name",
      key: "product_name",
      ...TableHelper.getStringListColumnSearchProps("product_name", props.dataSource),
      width: 300
    },
  ];

  return (
    <div>
      <Table
        rowKey="key"
        columns={columns}
        dataSource={props.dataSource}
        size='small'
        scroll={{ y: "58vh" }}
        pagination={{ pageSize: 8 }}
        bordered
        loading={props.isLoading}
        onRow={(record) => ({
          onClick: () => onLineClick(record),
        })}
        rowClassName={(record) => record.key === selectedId ? styles.selectedLine : ""}
      />
    </div>
  );
};

export default UploadGoodsTable;
