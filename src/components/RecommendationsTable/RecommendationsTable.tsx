import React, { Key, useState } from "react";
import { Table } from "antd";
import styles from "./RecommendationsTable.module.scss";
import { useEffect } from "react";
import { ProcreatorVariantType } from "../../api/models/ProcreatorVariantType";
import TableHelper from "../TableHelper/TableHelper";
import { ColumnsType } from "antd/lib/table";

interface IRecommendationsTableProps {
  dataSource: ProcreatorVariantType[];
  onSelectRecommendations: (items:ProcreatorVariantType | undefined) => void;
};

export const RecommendationsTable: React.FC<IRecommendationsTableProps> = (props) => {
  const [selectedId, setSelectedId] = useState<Key>();
  const onLineClick = (record: ProcreatorVariantType) => {
    props.onSelectRecommendations(record);
    setSelectedId(record.id)
  };

  useEffect(() => {
    setSelectedId(undefined);
    props.onSelectRecommendations(undefined);
  }, [props.dataSource]);

  const columns: ColumnsType<ProcreatorVariantType> = [
    {
      title: "Предлагаемое наименование товара",
      dataIndex: "name_1c",
      key: "name_1c",
      ...TableHelper.getStringListColumnSearchProps("name_1c", props.dataSource),
    },
  ];

  return (
    <div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={props.dataSource}
        size="small"
        pagination={false}
        bordered
        onRow={(record) => ({
          onClick: () => onLineClick(record),
        })}
        rowClassName={(record) =>
          record.id === selectedId ? styles.selectedLine : ""
        }
      />
    </div>
  );
};

export default RecommendationsTable;
