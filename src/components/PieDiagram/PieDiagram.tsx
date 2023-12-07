import { Card } from "antd";
import { PieChart } from "react-minimal-pie-chart";
import { PieDiagramProps } from "../Statistics/Statistics";

import "./PieDiagram.scss";

const PieDiagram: React.FC<PieDiagramProps> = ({ data }) => {
  if (!data) {
    return null;
  }

  const chartData = [
    { title: "Размечено", value: data.approve, color: "#90EE90" },
    { title: "Не размечено", value: data.none, color: "#FFA500" },
    { title: "Отклонено", value: data.disapprove, color: "#FF4500" },
    { title: "Отложено", value: data.aside, color: "#FFFF00" },
  ];

  const defaultLabelStyle = {
    opacity: 0.75,
    fill: "#fff",
  };

  const config = {
    data: chartData,
    animate: true,
    label: (e: any) =>
      e.dataEntry.percentage > 0
        ? `${Math.round(e.dataEntry.percentage)} %`
        : "",
    labelStyle: defaultLabelStyle,
    segmentsShift: (index: number) => (index === 0 ? 7 : 0.5),
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
            <PieChart {...config} />
          </div>
        </Card>
      )}
    </>
  );
};

export default PieDiagram;
