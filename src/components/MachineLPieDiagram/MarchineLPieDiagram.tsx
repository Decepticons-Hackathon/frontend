import { Card } from "antd";
import { Pie } from "@ant-design/plots";
import { PieDiagramMlProps } from "../Statistics/Statistics";

import "./MachineLPieDiagram.scss";

const MachineLPieDiagram: React.FC<PieDiagramMlProps> = ({ data }) => {
  if (!data) {
    return null;
  }

  const chartData = [
    { type: "Вариант 1", value: data.var_1 },
    { type: "Вариант 2", value: data.var_2 },
    { type: "Вариант 3", value: data.var_3 },
    { type: "Вариант 4", value: data.var_4 },
    { type: "Вариант 5", value: data.var_5 },
    { type: "Из базы", value: data.manual },
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
        const displayValue = parseFloat((data.percent * 100).toFixed(0));
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
        case "Вариант 1":
          return "#87CEFA";
        case "Вариант 2":
          return "#FFD700";
        case "Вариант 3":
          return "#DA70D6";
        case "Вариант 4":
          return "#FF69B4";
        case "Вариант 5":
          return "#20B2AA";
        default:
          return "#808080";
      }
    },
  };

  return (
    <>
      {data && (
        <Card className="customCard">
          <p> Соединено вручную: {data.manual}</p>
          <p>Вариант №1: {data.var_1}</p>
          <p>Вариант №2: {data.var_2}</p>
          <p>Вариант №3: {data.var_3}</p>
          <p>Вариант №4: {data.var_4}</p>
          <p>Вариант №5: {data.var_5}</p>

          <div className="pie">
            <Pie {...config} />
          </div>
        </Card>
      )}
    </>
  );
};

export default MachineLPieDiagram;
