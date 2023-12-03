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

export type ParsingType = {
  key: string;
  product_name: string;
  price: number;
  product_url: string;
  date: string;
};

export const parsing: ParsingType[] = [
  {
    key: "1",
    product_name: "Санитайзер мультиактивный, 1 л",
    price: 500,
    product_url: "https://www.ozon.ru/product/antiseptik-1-l-530024221/",
    date: "2023/12/1",
  },
  {
    key: "2",
    product_name: "Чистящее средство для окон, 1 л",
    price: 450,
    product_url:
      "https://www.ozon.ru/product/chistyashchee-sredstvo-dlya-okon-1-l-534530024222/",
    date: "2023/12/2",
  },
  {
    key: "3",
    product_name: "Универсальный очиститель, 5 л",
    price: 750,
    product_url:
      "https://www.ozon.ru/product/universalnyy-ochistitel-5-l-535430024223/",
    date: "2023/12/3",
  },
  {
    key: "4",
    product_name: "Средство для мытья посуды, 500 мл",
    price: 300,
    product_url:
      "https://www.ozon.ru/product/sredstvo-dlya-mytya-posudy-500-ml-53230024224/",
    date: "2023/12/4",
  },
  {
    key: "5",
    product_name: "Порошок для стирки, 2 кг",
    price: 600,
    product_url:
      "https://www.ozon.ru/product/poroshok-dlya-stirki-2-kg-53002234225/",
    date: "2023/12/5",
  },
  {
    key: "6",
    product_name: "Ополаскиватель для белья, 1 л",
    price: 350,
    product_url:
      "https://www.ozon.ru/product/opolaskivatel-dlya-belya-1-l-53002422336/",
    date: "2023/12/6",
  },
  {
    key: "7",
    product_name: "Чистящее средство для ванны, 750 мл",
    price: 400,
    product_url:
      "https://www.ozon.ru/product/chistyashchee-sredstvo-dlya-vanny-750-ml-53002422744/",
    date: "2023/12/7",
  },
  {
    key: "8",
    product_name: "Средство для чистки ковров, 500 мл",
    price: 10000,
    product_url:
      "https://www.ozon.ru/product/sredstvo-dlya-chistki-kovrov-500-ml-53002434228/",
    date: "2023/12/8",
  },
  {
    key: "9",
    product_name: "Дезинфицирующий спрей",
    price: 5,
    product_url:
      "https://www.ozon.ru/product/sredstvo-dlya-chistki-kovrov-500-ml-53002324228/",
    date: "2023/12/8",
  },
  {
    key: "10",
    product_name: "Средство для удаления пятен",
    price: 3,
    product_url:
      "https://www.ozon.ru/product/sredstvo-dlya-chistki-kovrov-500-ml-53002412228/",
    date: "2023/12/8",
  },
  {
    key: "11",
    product_name: "Жидкость для мытья полов",
    price: 120,
    product_url:
      "https://www.ozon.ru/product/sredstvo-dlya-chistki-kovrov-500-ml-5310024228/",
    date: "2023/12/8",
  },
  {
    key: "12",
    product_name: "Средство для чистки туалета",
    price: 50,
    product_url:
      "https://www.ozon.ru/product/sredstvo-dlya-chistki-kovrov-500-ml-5300524228/",
    date: "2023/12/8",
  },
  {
    key: "13",
    product_name: "Освежитель воздухан",
    price: 1110,
    product_url:
      "https://www.ozon.ru/product/sredstvo-dlya-chistki-kovrov-500-ml-530024253428/",
    date: "2023/12/8",
  },
  {
    key: "14",
    product_name: "Средство от налета и ржавчины",
    price: 11500,
    product_url:
      "https://www.ozon.ru/product/sredstvo-dlya-chistki-kovrov-500-ml-530024228454/",
    date: "2023/12/8",
  },
  {
    key: "15",
    product_name: "Антибактериальное мыло",
    price: 2500,
    product_url:
      "https://www.ozon.ru/product/sredstvo-dlya-chistki-kovrov-500-ml-53002422844/",
    date: "2023/12/8",
  },
  {
    key: "16",
    product_name: "Чистящие салфетки",
    price: 3500,
    product_url:
      "https://www.ozon.ru/product/sredstvo-dlya-chistki-kovrov-500-ml-5300242458/",
    date: "2023/12/8",
  },
  {
    key: "17",
    product_name: "Средство для уборки кухни",
    price: 1400,
    product_url:
      "https://www.ozon.ru/product/sredstvo-dlya-chistki-kovrov-500-ml-530024276/",
    date: "2023/12/8",
  },
  {
    key: "19",
    product_name: "Жидкое быдло 2 литра кек",
    price: 5250,
    product_url:
      "https://www.ozon.ru/product/sredstvo-dlya-chistki-kovrov-500-ml-5300242558/",
    date: "2023/12/8",
  },
];

const Matching: React.FC = () => {
  const [isBtnsActive, setIsBtnsActive] = useState(false);
  const [recommendationsData, setRecommendationsData] = useState([]);
  const [parsingData, setParsingData] = useState<ParsingType[]>(parsing);

  const [selectedLineUploadGoods, setSelectedLineUploadGoods] = useState<
    string | null
  >(null);
  const [selectedLineRecommenadtions, setSelectedLineRecommenadtions] =
    useState<string | null>(null);
  const [approvedItems, setApprovedItems] = useState([]);

  const activeBtns = (isSelected: boolean) => {
    setIsBtnsActive(isSelected);
  };

  const onGoodsTableRowClick = () => {
    const randomCount = Math.floor(Math.random() * 4) + 1;
    const shuffledRecommendations = [...recommendations].sort(
      () => 0.5 - Math.random()
    );
    //@ts-ignore
    setRecommendationsData(shuffledRecommendations.slice(0, randomCount));
  };

  const onUploadSelectClick = (key: string) => {
    setSelectedLineUploadGoods(key);
  };

  const onRecommendationsClick = (key: string) => {
    setSelectedLineRecommenadtions(key);
  };

  const approveClick: any = () => {
    const selectedUploadGoodsItem = parsingData.find(
      //@ts-ignore
      (item) => item.key === selectedLineUploadGoods
    );
    const selectedRecommendationItem = recommendationsData.find(
      //@ts-ignore
      (item) => item.key === selectedLineRecommenadtions
    );
    if (selectedUploadGoodsItem && selectedRecommendationItem) {
      const newItem = {
        uploadGoods: selectedUploadGoodsItem,
        recommendation: selectedRecommendationItem,
      };

      const updatedParsingData = parsingData.filter(
        //@ts-ignore
        (item) => item.key !== selectedLineUploadGoods
      );

      //@ts-ignore
      setParsingData(updatedParsingData);
      console.log(updatedParsingData);

      //@ts-ignore
      setApprovedItems((prevItems) => [...prevItems, newItem]);

      setSelectedLineUploadGoods(null);
      setSelectedLineRecommenadtions(null);
      setRecommendationsData([]);
    }
  };

  return (
    <div className={styles.table}>
      <div className={styles.goods}>
        <h3 className={styles.text}>Список загруженных товаров:</h3>
        <UploadGoodsTable
          randomRecommenadtions={onGoodsTableRowClick}
          onUploadSelectClick={setSelectedLineUploadGoods}
          selectedLineUploadGoods={selectedLineUploadGoods}
          parsingData={parsingData}
        />
      </div>
      <div className={styles.optionsContainer}>
        <div className={styles.search}>
          <AutoSearch />
        </div>
        <div className={styles.options}>
          <h3 className={styles.optionsText}>Окно предложенных вариантов</h3>
          <RecommendationsTable
            recommendationsData={recommendationsData}
            activeBtns={activeBtns}
            onRecommendationsClick={setSelectedLineRecommenadtions}
            selectedLineRecommenadtions={selectedLineRecommenadtions}
          />
        </div>
        <div className={styles.buttons}>
          <GradientButton onClick={approveClick} disabled={!isBtnsActive}>
            Подтвердить
          </GradientButton>
          <GradientButton disabled={!isBtnsActive}>Отложить</GradientButton>
          <GradientButton disabled={!isBtnsActive}>Отклонить</GradientButton>
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
