import GradientButton from "../GradientButton/GradientButton";
import styles from "./Matching.module.scss";
import jsonData from "../../../public/response_list.json";
import AutoSearch from "../AutoSearch/AutoSearch";
import { useState } from "react";
import RecommendationsTable from "../MatchingTable/RecommendationsTable";
import UploadGoodsTable from "../UploadGoodsTable/UploadGoodsTable";

export const productsMap: any = {};

jsonData.data.products.forEach((product: any, index: number) => {
  productsMap[index] = product.name_1c;
});

const approveClick: any = () => {
  console.log("клик подтвердить");
};

type reccomendstionsType = {
  key: string;
  name: string;
};

const recommendations: reccomendstionsType[] = [
  {
    key: "1",
    name: "Рекомендация 1 что порекомендовать я не знаю, я просто дам тебе этот кекс",
  },

  { key: "2", name: "Рекомендация 2 откуда взять 1 литр, если там было 0.9 л" },
  {
    key: "3",
    name: "Рекомендация 3 эффективная смесь для выбранного товара. Или нет, я не эксперт",
  },
  {
    key: "4",
    name: "Рекомендация 4 суперподходящая для выбранного товара. Крекеры по 2 литра и один бублик",
  },
];

const Matching: React.FC = () => {
  const [isRowSelectedRecommendations, setIsRowSelectedRecommendations] =
    useState(false);

  const [recommendationsData, setRecommendationsData] = useState([]);

  const onRowSelectedRecommenadations = (isSelected: boolean) => {
    setIsRowSelectedRecommendations(isSelected);
  };

  const onGoodsTableRowClick = () => {
    const randomCount = Math.floor(Math.random() * 4) + 1;
    const shuffledRecommendations = [...recommendations].sort(
      () => 0.5 - Math.random()
    );
    //@ts-ignore
    setRecommendationsData(shuffledRecommendations.slice(0, randomCount));
  };

  return (
    <div className={styles.table}>
      <div className={styles.goods}>
        <h3 className={styles.text}>Список загруженных товаров:</h3>
        <UploadGoodsTable randomRecommenadtions={onGoodsTableRowClick} />
      </div>
      <div className={styles.optionsContainer}>
        <div className={styles.search}>
          <AutoSearch />
        </div>
        <div className={styles.options}>
          <h3 className={styles.optionsText}>Окно предложенных вариантов</h3>
          <RecommendationsTable
            recommendationsData={recommendationsData}
            onRowSelectedRecommendations={onRowSelectedRecommenadations}
          />
        </div>
        <div className={styles.buttons}>
          <GradientButton
            onClick={approveClick}
            disabled={!isRowSelectedRecommendations}
          >
            Подтвердить
          </GradientButton>
          <GradientButton disabled={!isRowSelectedRecommendations}>
            Отложить
          </GradientButton>
          <GradientButton disabled={!isRowSelectedRecommendations}>
            Отклонить
          </GradientButton>
        </div>
        <div className={styles.buttons}>
          <button className={styles.historyBtn}>
            Посмотреть историю действий
          </button>
        </div>
      </div>
    </div>
  );
};

export default Matching;
