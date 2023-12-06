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

const dealersAllDays = allStats.data.dealers.map((dealerItem) => {
  const { name } = dealerItem.dealer[0];
  const stats = dealerItem.stat_all;

  return {
    name,
    approve: stats.approve,
    disapprove: stats.disapprove,
    aside: stats.aside,
    none: stats.none,
    totalGoods: stats.approve + stats.disapprove + stats.aside + stats.none,
  };
});

const Statistics: React.FC = () => {
  const [dealerInfoToday, setDealerInfoToday] = useState<DealerTypes>(
    dealersToday[0]
  );

  const [dealerInfoAllDays, setDealerInfoAllDays] = useState<DealerTypes>(
    dealersAllDays[0]
  );

  const handleDealerChangeToday = (value: string) => {
    const selectedDealer = dealersToday.find((dealer) => dealer.name === value);
    //@ts-ignore
    setDealerInfoToday(selectedDealer);
  };

  const handleDealerAllDays = (value: string) => {
    const selectedDealer = dealersAllDays.find(
      (dealer) => dealer.name === value
    );
    //@ts-ignore
    setDealerInfoAllDays(selectedDealer);
  };

  return (
    <>
      <div className="table">
        <div className="goods">
          <h3 className="header">Статистика по дилеру за сегодня</h3>
          <p className="paragraph">
            В этом окне вы можете посмотреть статистику по дилерам за
            сегодняшний день
          </p>
          <p className="paragraph">
            По умолчанию открыт первый дилер из списка
          </p>
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

        <div className="goods">
          <h3 className="header">Статистика по дилеру за всё время</h3>
          <p className="paragraph">
            В этом окне вы можете посмотреть статистику по дилерам за весь
            период
          </p>
          <p className="paragraph">
            По умолчанию открыт первый дилер из списка
          </p>
          <Select placeholder="Выберите дилера" onChange={handleDealerAllDays}>
            {dealersToday.map((item) => (
              <Option key={item.name} value={item.name}>
                {item.name}
              </Option>
            ))}
          </Select>
          <PieDiagram data={dealerInfoAllDays} />
        </div>
      </div>
    </>
  );
};

export default Statistics;
