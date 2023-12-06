import React, { useState } from "react";
import { Select, Card } from "antd";
const { Option } = Select;
import { Pie } from "@ant-design/plots";
import allStats from "../../../public/response_dealers_stats.json";

import "./Statistics.scss";
import PieDiagram from "../PieDiagram/PieDiagram";

const dealerData = allStats.data.dealers.map((item) => {
  const dealerInfo = item;
  return dealerInfo;
});
export type DealerTypes = {
  name: string;
  approve: number;
  disapprove: number;
  aside: number;
  none: number;
  totalGoods: number;
};

export type PieDiagramProps = {
  data: DealerTypes | null;
};

const dealersToday = allStats.data.dealers.map((dealerItem) => {
  const { name } = dealerItem.dealer[0];
  const stats = dealerItem.stat_today;

  return {
    name,
    approve: stats.approve,
    disapprove: stats.disapprove,
    aside: stats.aside,
    none: stats.none,
    totalGoods: stats.approve + stats.disapprove + stats.aside + stats.none,
  };
});

console.log(dealersToday);

const Statistics: React.FC = () => {
  const [dealerInfoToday, setDealerInfoToday] = useState<DealerTypes>(
    dealersToday[0]
  );

  const handleDealerChangeToday = (value: string) => {
    const selectedDealer = dealersToday.find((dealer) => dealer.name === value);
    //@ts-ignore
    setDealerInfoToday(selectedDealer);
  };

  return (
    <>
      <div className="table">
        <div className="goods">
          <h3>Статистика по дилеру за сегодня</h3>
          <Select
            placeholder="Выберите дилера"
            onChange={handleDealerChangeToday}
          >
            {dealersToday.map((item) => (
              <Option key={item.name} value={item.name}>
                {item.name}
              </Option>
            ))}
          </Select>
          <PieDiagram data={dealerInfoToday} />
        </div>
      </div>
    </>
  );
};

export default Statistics;
