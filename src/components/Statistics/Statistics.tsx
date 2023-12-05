import React, { useState } from "react";
import { Select, Card } from "antd";
const { Option } = Select;
import { Pie } from "@ant-design/plots";

import "./Statistics.scss";

type DealerTypes = {
  name: string;
  totalProducts: number;
  marked: number;
  unmarked: number;
};

const Statistics: React.FC = () => {
  const [dealerInfo, setDealerInfo] = useState<DealerTypes | null>(null);
  const dealers: DealerTypes[] = [
    { name: "Дилер 1", totalProducts: 100, marked: 70, unmarked: 30 },
    { name: "Дилер 2", totalProducts: 150, marked: 120, unmarked: 30 },
  ];

  //@ts-ignore
  const handleDealerChange = (value) => {
    //@ts-ignore
    setDealerInfo(dealers.find((dealer) => dealer.name === value));
  };

  const chartData = dealerInfo
    ? [
        { type: "Размечено", value: dealerInfo.marked },
        { type: "Не размечено", value: dealerInfo.unmarked },
      ]
    : [];

  const config = {
    data: chartData,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    interactions: [{ type: "element-active" }],
    color: ({ type }) => (type === "Размечено" ? "#90EE90" : "#FF4500"),
  };

  return (
    <>
      <div className="table">
        <div className="goods">
          <h3>Стастистика по дилеру</h3>
          <p>
            Выберите дилера, чтобы увидеть какое количество товаров было
            получено, сколько из них размечено, а сколько нет
          </p>
          <Select placeholder="Выберите дилера" onChange={handleDealerChange}>
            {dealers.map((dealer) => (
              <Option key={dealer.name} value={dealer.name}>
                {dealer.name}
              </Option>
            ))}
          </Select>

          {dealerInfo && (
            <Card title={dealerInfo.name}>
              <p>Всего товаров: {dealerInfo.totalProducts}</p>
              <p>Размечено: {dealerInfo.marked}</p>
              <p>Не размечено: {dealerInfo.unmarked}</p>
              <div className="pie">
                <Pie {...config} />
              </div>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default Statistics;
