import { Card } from "antd";
import { PieDiagramMlProps } from "../Statistics/Statistics";
import { PieChart } from "react-minimal-pie-chart";

import "./MachineLPieDiagram.scss";

const MachineLPieDiagram: React.FC<PieDiagramMlProps> = ({ data }) => {
  if (!data) {
    return null;
  }

  const chartData = [
    { title: "Вариант 1", value: data.var_1, color: "#87CEFA" },
    { title: "Вариант 2", value: data.var_2, color: "#FFD700" },
    { title: "Вариант 3", value: data.var_3, color: "#DA70D6" },
    { title: "Вариант 4", value: data.var_4, color: "#FF69B4" },
    { title: "Вариант 5", value: data.var_5, color: "#20B2AA" },
    { title: "Из базы", value: data.manual, color: "#808080" },
  ];

  const defaultLabelStyle = {
    opacity: 0.75,
    fill: "#fff",
    fontSize: "15px",
  };

  const config = {
    data: chartData,
    animate: true,
    //@ts-ignore
    label: ({ dataEntry }) =>
      dataEntry.percentage >= 1 ? `${Math.round(dataEntry.percentage)} %` : "",
    labelStyle: defaultLabelStyle,
    segmentsShift: (index: number) => (index === 0 ? 7 : 0.5),
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
        </Card>
      )}
    </>
  );
};

export default MachineLPieDiagram;
