import React, { useState } from "react";
import type { TableProps } from "antd";
import { Button, Space, Table } from "antd";
import styles from "./UploadGoodsTable.module.scss";

import type {
  ColumnsType,
  FilterValue,
  SorterResult,
} from "antd/es/table/interface";
import TableHelper from "./HelperTable";

type ParsingType = {
  key: string;
  product_name: string;
  price: number;
  product_url: string;
  date: string;
};

const parsingData: ParsingType[] = [
  {
    key: "1",
    product_name: "Санитайзер мультиактивный, 1 л",
    price: 500,
    product_url: "https://www.ozon.ru/product/antiseptik-1-l-530024221/",
    date: "2023/12/1",
  },
  {
    key: "2",
    product_name: "Чистящее средство для окон, 1 л",
    price: 450,
    product_url:
      "https://www.ozon.ru/product/chistyashchee-sredstvo-dlya-okon-1-l-534530024222/",
    date: "2023/12/2",
  },
  {
    key: "3",
    product_name: "Универсальный очиститель, 5 л",
    price: 750,
    product_url:
      "https://www.ozon.ru/product/universalnyy-ochistitel-5-l-535430024223/",
    date: "2023/12/3",
  },
  {
    key: "4",
    product_name: "Средство для мытья посуды, 500 мл",
    price: 300,
    product_url:
      "https://www.ozon.ru/product/sredstvo-dlya-mytya-posudy-500-ml-53230024224/",
    date: "2023/12/4",
  },
  {
    key: "5",
    product_name: "Порошок для стирки, 2 кг",
    price: 600,
    product_url:
      "https://www.ozon.ru/product/poroshok-dlya-stirki-2-kg-53002234225/",
    date: "2023/12/5",
  },
  {
    key: "6",
    product_name: "Ополаскиватель для белья, 1 л",
    price: 350,
    product_url:
      "https://www.ozon.ru/product/opolaskivatel-dlya-belya-1-l-53002422336/",
    date: "2023/12/6",
  },
  {
    key: "7",
    product_name: "Чистящее средство для ванны, 750 мл",
    price: 400,
    product_url:
      "https://www.ozon.ru/product/chistyashchee-sredstvo-dlya-vanny-750-ml-53002422744/",
    date: "2023/12/7",
  },
  {
    key: "8",
    product_name: "Средство для чистки ковров, 500 мл",
    price: 10000,
    product_url:
      "https://www.ozon.ru/product/sredstvo-dlya-chistki-kovrov-500-ml-53002434228/",
    date: "2023/12/8",
  },
  {
    key: "9",
    product_name: "Дезинфицирующий спрей",
    price: 5,
    product_url:
      "https://www.ozon.ru/product/sredstvo-dlya-chistki-kovrov-500-ml-53002324228/",
    date: "2023/12/8",
  },
  {
    key: "10",
    product_name: "Средство для удаления пятен",
    price: 3,
    product_url:
      "https://www.ozon.ru/product/sredstvo-dlya-chistki-kovrov-500-ml-53002412228/",
    date: "2023/12/8",
  },
  {
    key: "11",
    product_name: "Жидкость для мытья полов",
    price: 120,
    product_url:
      "https://www.ozon.ru/product/sredstvo-dlya-chistki-kovrov-500-ml-5310024228/",
    date: "2023/12/8",
  },
  {
    key: "12",
    product_name: "Средство для чистки туалета",
    price: 50,
    product_url:
      "https://www.ozon.ru/product/sredstvo-dlya-chistki-kovrov-500-ml-5300524228/",
    date: "2023/12/8",
  },
  {
    key: "13",
    product_name: "Освежитель воздухан",
    price: 1110,
    product_url:
      "https://www.ozon.ru/product/sredstvo-dlya-chistki-kovrov-500-ml-530024253428/",
    date: "2023/12/8",
  },
  {
    key: "14",
    product_name: "Средство от налета и ржавчины",
    price: 11500,
    product_url:
      "https://www.ozon.ru/product/sredstvo-dlya-chistki-kovrov-500-ml-530024228454/",
    date: "2023/12/8",
  },
  {
    key: "15",
    product_name: "Антибактериальное мыло",
    price: 2500,
    product_url:
      "https://www.ozon.ru/product/sredstvo-dlya-chistki-kovrov-500-ml-53002422844/",
    date: "2023/12/8",
  },
  {
    key: "16",
    product_name: "Чистящие салфетки",
    price: 3500,
    product_url:
      "https://www.ozon.ru/product/sredstvo-dlya-chistki-kovrov-500-ml-5300242458/",
    date: "2023/12/8",
  },
  {
    key: "17",
    product_name: "Средство для уборки кухни",
    price: 1400,
    product_url:
      "https://www.ozon.ru/product/sredstvo-dlya-chistki-kovrov-500-ml-530024276/",
    date: "2023/12/8",
  },
  {
    key: "19",
    product_name: "Жидкое быдло 2 литра кек",
    price: 5250,
    product_url:
      "https://www.ozon.ru/product/sredstvo-dlya-chistki-kovrov-500-ml-5300242558/",
    date: "2023/12/8",
  },
];

const UploadGoodsTable: React.FC<{ randomRecommenadtions: () => void }> = ({
  randomRecommenadtions,
}) => {
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<SorterResult<ParsingType>>({});
  
  const [selectedLineUploadGoods, setSelectedLineUploadGoods] = useState<string | null>(null);
 
 
  const onLineClick = (record: ParsingType) => {
    // console.log("вижу клик");
    setSelectedLineUploadGoods(record.key);
    randomRecommenadtions();
  };

  const handleChange: TableProps<ParsingType>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter as SorterResult<ParsingType>);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const columns: ColumnsType<ParsingType> = [
    {
      title: "URL",
      dataIndex: "product_url",
      key: "product_url",
      ...TableHelper.getStringListColumnSearchProps("product_url", parsingData),
      width: "12%",
      render: (text) => {
        const match = text.match(/https:\/\/www\.(.*?)\./);
        const displayText = match ? match[1] : text;
        return (
          <a href={text} target="_blank" rel="noopener noreferrer">
            {displayText}
          </a>
        );
      },

      // sorter: (a, b) => a.suggestion.length - b.suggestion.length,
      // sortOrder:
      //   sortedInfo.columnKey === "suggestion" ? sortedInfo.order : null,
      // ellipsis: true,
    },

    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
      ...TableHelper.getStringListColumnSearchProps("date", parsingData),
      width: "15%",

      // sorter: (a, b) => a.suggestion.length - b.suggestion.length,
      // sortOrder:
      //   sortedInfo.columnKey === "suggestion" ? sortedInfo.order : null,
      // ellipsis: true,
    },

    {
      title: "Цена",
      dataIndex: "price",
      key: "price",
      ...TableHelper.getStringListColumnSearchProps("price", parsingData),
      width: "15%",
      // sorter: (a, b) => a.suggestion.length - b.suggestion.length,
      // sortOrder:
      //   sortedInfo.columnKey === "suggestion" ? sortedInfo.order : null,
      // ellipsis: true,
    },

    {
      title: "Наименование товара",
      dataIndex: "product_name",
      key: "product_name",
      ...TableHelper.getStringListColumnSearchProps(
        "product_name",
        parsingData
      ),
      width: "48%",
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
        dataSource={parsingData}
        onChange={handleChange}
        size="small"
        pagination={{
          pageSize: 13,
        }}
        bordered
        onRow={(record) => ({
          onClick: () => onLineClick(record),
        })}
        rowClassName={(record) =>
          record.key === selectedLineUploadGoods ? styles.selectedLine : ""
        }
      />
    </div>
  );
};

export default UploadGoodsTable;
