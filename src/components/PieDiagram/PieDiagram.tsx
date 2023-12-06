import { Card } from "antd";
import { Pie } from "@ant-design/plots";
import { useEffect } from "react";
import { DealerTypes } from "../Statistics/Statistics";
import { PieDiagramProps } from "../Statistics/Statistics";

import "./PieDiagram.scss";

const PieDiagram: React.FC<PieDiagramProps> = ({ data }) => {
  useEffect(() => {}, [data]);

  if (!data) {
    return null;
  }

  const chartData = [
    { type: "Размечено", value: data.approve },
    { type: "Не размечено", value: data.none },
    { type: "Отклонено", value: data.disapprove },
    { type: "Отложено", value: data.aside },
  ];

  const config = {
    data: chartData,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",

      content: (data: any) => {
        //@ts-ignore
        const displayValue: number = (data.percent * 100).toFixed(0);
        return displayValue > 10 ? `${displayValue}%` : "";
      },
      style: {
        textAlign: "center",
        fontSize: 12,
      },
    },
    interactions: [{ type: "element-active" }],

    color: (datum: any) => {
      const type = datum?.type;
      switch (type) {
        case "Размечено":
          return "#90EE90";
        case "Не размечено":
          return "#FFA500";
        case "Отклонено":
          return "#FF4500";
        case "Отложено":
          return "#FFFF00";
        default:
          return "#808080";
      }
    },
  };

  return (
    <>
      {data && (
        <Card title={data.name}>
          <p>Всего товаров: {data.totalGoods}</p>
          <p>Размечено: {data.approve}</p>
          <p>Не размечено: {data.none}</p>
          <p>Отложено:{data.aside}</p>
          <div className="pie">
            <Pie {...config} />
          </div>
        </Card>
      )}
    </>
  );
};

export default PieDiagram;
