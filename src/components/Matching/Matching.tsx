import GradientButton from "../GradientButton/GradientButton";
import styles from "./Matching.module.scss";
import jsonData from "../../../public/response_list.json";
import AutoSearch from "../AutoSearch/AutoSearch";

import { useState } from "react";

export const chemicalList = {
  1: "Санитайзер Санитайзер Санитайзер Санитайзер Санитайзер Санитайзер Санитайзер Санитайзер Санитайзер Санитайзер Санитайзер Санитайзер Санитайзер",
  2: "Чистящее средство для окон 1 литр суперэффективный самый лучший",
  3: "Универсальный очиститель 00104 кек 2400 литр эффективный",
  4: "Средство для мытья посудыыыыыыыыыыыыыыы",
  5: "Порошок для стирки",
  6: "Ополаскиватель для белья",
  7: "Чистящее средство для ванны",
  8: "Средство для чистки ковров",
  9: "Дезинфицирующий спрей",
  10: "Средство для удаления пятен",
  11: "Жидкость для мытья полов",
  12: "Средство для чистки туалета",
  13: "Освежитель воздуха",
  14: "Средство от налета и ржавчины",
  15: "Антибактериальное мыло",
  16: "Чистящие салфетки",
  17: "Средство для уборки кухни",
  19: "Моющее средство для душа",
  20: "Средство для чистки зеркал",
};

const recommendations = {
  1: "Рекомендация 1 что порекомендовать я не знаю, я просто дам тебе этот кекс",
  2: "Рекомендация 2 откуда взять 1 литр, если там было 0.9 л",
  3: "Рекомендация 3 эффективная смесь для выбранного товара. Или нет, я не эксперт",
  4: "Рекомендация 4 суперподходящая для выбранного товара. Крекеры по 2 литра и один бублик",
};

export const productsMap: any = {};

jsonData.data.products.forEach((product: any, index: number) => {
  productsMap[index] = product.name_1c;
});

const handleClick: any = () => {
  console.log("тест клика");
};

const Matching: React.FC = () => {
  const [suggestions, setSuggestions] = useState([]);

  return (
    <div className={styles.table}>
      <div className={styles.goods}>
        <h3 className={styles.text}>Список загруженных товаров:</h3>
        <div className={styles.customScroll}>
          {Object.entries(chemicalList).map(([key, value]) => (
            <div className={styles.goodList}>
              <p className={styles.goodsText} key={key}>
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.optionsContainer}>
        <div className={styles.search}>
          <AutoSearch />
        </div>
        <div className={styles.options}>
          <h3 className={styles.optionsText}>Окно предложенных вариантов</h3>
          {Object.entries(setSuggestions).map(([key, value]) => (
            <div className={styles.optionList}>
              <p className={styles.goodsText} key={key}>
                {value}
              </p>
            </div>
          ))}
        </div>
        <div className={styles.buttons}>
          <GradientButton onClick={handleClick}>Подтвердить</GradientButton>
          <GradientButton>Отложить</GradientButton>
          <GradientButton>Отклонить</GradientButton>
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
