import GradientButton from "../GradientButton/GradientButton";
import styles from "./Matching.module.scss";
import jsonData from "../../../public/response_list.json";
import AutoSearch from "../AutoSearch/AutoSearch";
import GoodsTable from "../UploadGoodsTable/UploadGoodsTable";

import { useState } from "react";
import ReccomendationsTable from "../MatchingTable/RecommendationsTable";
import UploadGoodsTable from "../UploadGoodsTable/UploadGoodsTable";

export const productsMap: any = {};

jsonData.data.products.forEach((product: any, index: number) => {
  productsMap[index] = product.name_1c;
});

const handleClick: any = () => {
  console.log("тест клика");
};

const Matching: React.FC = () => {
  const [isGoodsTableEmpty, setIsGoodsTableEmpty] = useState(true);

  const updateGoodsTableEmptyState = (isEmpty: boolean) => {
    setIsGoodsTableEmpty(isEmpty);
  };

  return (
    <div className={styles.table}>
      <div className={styles.goods}>
        <h3 className={styles.text}>Список загруженных товаров:</h3>
        <UploadGoodsTable />
      </div>
      <div className={styles.optionsContainer}>
        <div className={styles.search}>
          <AutoSearch />
        </div>
        <div className={styles.options}>
          <h3 className={styles.optionsText}>Окно предложенных вариантов</h3>
          <ReccomendationsTable updateEmptyState={updateGoodsTableEmptyState} />
        </div>
        <div className={styles.buttons}>
          <GradientButton onClick={handleClick} disabled={isGoodsTableEmpty}>
            Подтвердить
          </GradientButton>
          <GradientButton disabled={isGoodsTableEmpty}>Отложить</GradientButton>
          <GradientButton disabled={isGoodsTableEmpty}>
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
