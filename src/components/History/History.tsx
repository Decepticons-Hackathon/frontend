import React from "react";
import { Table } from "antd";
import { api } from "../../api/MainApi";
import { message } from "antd";
import { useState } from "react";
import { ProductMatchedListResult } from "../../api/models/ProductMatchedListResult";
import TableHelper from "../TableHelper/TableHelper";

const History: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const [dataSourse, setDataSourse] = useState<StatType[]>([]);

  type StatType = {
    key: number;
    product_name: string;
    name_1c: string;
    status: string;
    status_datetime: string;
  };

  const processData = (data: ProductMatchedListResult) => {
    if (!data?.product_list) {
      return [];
    }

    return data.product_list
      .map((item) => {
        const dealerProductInfo = item.dealer_product?.dealer_product_info;
        const procreatorProduct = item.dealer_product?.procreator_product;

        return {
          key: dealerProductInfo?.id ?? 0,
          id: dealerProductInfo?.id ?? 0,
          product_name: dealerProductInfo?.product_name ?? "",
          name_1c: procreatorProduct?.name_1c ?? "",
          status:
            dealerProductInfo?.dealer_product_status?.status === "approve"
              ? "approve"
              : null,
          status_datetime: dealerProductInfo?.dealer_product_status
            ?.status_datetime
            ? dealerProductInfo.dealer_product_status.status_datetime.split(
                "T"
              )[0]
            : "",
        };
      })
      .filter((item) => item.status === "approve");
  };

  React.useEffect(() => {
    setIsLoading(true);
    api
      .getProductMatchedList()
      .then((data: ProductMatchedListResult) => {
        message.success("Загрузка данных завершена");
        //@ts-ignore
        setDataSourse(processData(data));
      })
      .catch(() => {
        message.error("Что-то пошло не так...");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const columns = [
    {
      title: "Дата мэтчинга",
      dataIndex: "status_datetime",
      key: "status_datetime",
      ...TableHelper.getStringListColumnSearchProps(
        "status_datetime",
        dataSourse
      ),
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      ...TableHelper.getStringListColumnSearchProps("status", dataSourse),
    },
    {
      title: "Спарсенное имя",
      dataIndex: "product_name",
      key: "product_name",
      ...TableHelper.getStringListColumnSearchProps("product_name", dataSourse),
    },
    {
      title: "Присвоенное имя",
      dataIndex: "name_1c",
      key: "name_1c",
      ...TableHelper.getStringListColumnSearchProps("name_1c", dataSourse),
    },
    {
      title: "Изменение статуса",
      key: "delete",
      //@ts-ignore
      render: (text, record) => (
        <a onClick={() => handleDelete(record)} style={{ color: "red" }}>
          Вернуть в несмэтченные
        </a>
      ),
    },
  ];
  //@ts-ignore
  const handleDelete = (record) => {
    const request = {
      button: "disapprove",
      dealer_product_id: record.id,
    };
    api
      .postProductStatusChange(request)
      .then(() => {
        message.success("Статус успешно изменен!");
        setDataSourse((prevData) =>
          //@ts-ignore
          prevData.filter((item) => item.id !== record.id)
        );
      })
      .catch((error) => {
        // Обработка ошибки
        console.error("Ошибка при изменении статуса товара:", error);
      });
  };

  return (
    <>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSourse}
        size="small"
        scroll={{ y: "68vh", x: "max-content" }}
        bordered
        loading={isLoading}
      />
    </>
  );
};

export default History;
