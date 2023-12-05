import React, { Key, useState } from "react";
import { Table } from "antd";
import styles from "./UploadGoodsTable.module.scss";
import { ParsingType } from "../Matching/Matching";

import type { ColumnsType } from "antd/es/table/interface";
import TableHelper from "../TableHelper/TableHelper";

interface IUploadGoodsTableProps {
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
      width: "12%",
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
      title: "Дата",
      dataIndex: "date",
      key: "date",
      ...TableHelper.getStringListColumnSearchProps("date", props.dataSource),
      width: "13%",
    },
    {
      title: "Цена",
      dataIndex: "price",
      key: "price",
      ...TableHelper.getNumberColumnSearchProps("price"),
      width: "11%",
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      ...TableHelper.getStringListColumnSearchProps("status", props.dataSource),
      width: "13%",
    },
    {
      title: "Наименование товара",
      dataIndex: "product_name",
      key: "product_name",
      ...TableHelper.getStringListColumnSearchProps("product_name", props.dataSource),
      width: "48%",
      ellipsis: true,
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={props.dataSource}
        size="small"
        pagination={{ pageSize: 8 }}
        bordered
        onRow={(record) => ({
          onClick: () => onLineClick(record),
        })}
        rowClassName={(record) => record.key === selectedId ? styles.selectedLine : "" }
      />
    </div>
  );
};

export default UploadGoodsTable;
