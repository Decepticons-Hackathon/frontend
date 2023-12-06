import React from "react";
import GradientButton from "../GradientButton/GradientButton";
import styles from "./Matching.module.scss";
import jsonData from "../../../public/response_list.json";
import AutoSearch from "../AutoSearch/AutoSearch";
import { useState } from "react";
import RecommendationsTable from "../RecommendationsTable/RecommendationsTable";
import UploadGoodsTable from "../UploadGoodsTable/UploadGoodsTable";
import { ProductModel } from "../../api/models/ProductModel";
import { api } from "../../api/MainApi";
import { message } from "antd";
import { ProcreatorVariantType } from "../../api/models/ProcreatorVariantType";
import { DealerDetailResult } from "../../api/models/DealerDetailResult";
import { DealerProductDetail } from "../../api/models/DealerProductDetail";

export type ParsingType = {
  key: number;
  product_name: string;
  price: number;
  product_url: string;
  date: string;
  status: string;
  procreator_variants: ProcreatorVariantType[];
};

const Matching: React.FC = () => {
  const [recommendationsData, setRecommendationsData] = useState<ProcreatorVariantType[]>([]);

  const [selectedUploadGoodsItem, setSelectedUploadGoodsItem] = useState<ParsingType>();
  const [selectedRecommenadtionsItem, setSelectedRecommenadtionsItem] = useState<ProcreatorVariantType | undefined>();

  const [approvedItems, setApprovedItems] = useState([]);
  const [holdOverdItems, setholdOverdItems] = useState([]);
  const [rejectedItems, setRejectedItems] = useState([]);

  const [dataSourse, setDataSourse] = useState<ParsingType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    setIsLoading(true)
    api.getProductToMatching()
      .then((data: DealerDetailResult) => {
        message.success('Загрузка данных завершена')
        console.log(data)
        const ds = data.dealer_products.map(
          (item: DealerProductDetail) => ({
            key: item.dealer_product.id,
            date: item.dealer_product.date,
            status: item.dealer_product.dealer_product_status.status,
            price: item.dealer_product.price,
            product_name: item.dealer_product.product_name,
            product_url: item.dealer_product.product_url,
            procreator_variants: item.procreator_variants.map((variant: any) => ({
              product_id: variant.product_id,
              name_1c: variant.name_1c,
            })),
          } as ParsingType)
        );
        setDataSourse(ds);
      })
      .catch(() => {
        message.error('Что-то пошло не так...');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [])

  const onUploadSelectClick = (item: ParsingType) => {
    setSelectedUploadGoodsItem(item);
    setRecommendationsData(item.procreator_variants);
  };

  const onRecommendationsSelect = (item: ProcreatorVariantType | undefined) => {
    setSelectedRecommenadtionsItem(item);
  };

  const approveBtnClick: any = () => {
    if (selectedUploadGoodsItem && selectedRecommenadtionsItem) {
      const newItem = {
        uploadGoods: selectedUploadGoodsItem,
        recommendation: selectedRecommenadtionsItem,
      };

      // const updatedParsingData = parsingData.filter(
      //   //@ts-ignore
      //   (item) => item.key !== selectedLineUploadGoods
      // );

      //@ts-ignore
      // setApprovedItems((prevItems) => [...prevItems, newItem]);

      setSelectedUploadGoodsItem(undefined);
      setSelectedRecommenadtionsItem(undefined);
      setRecommendationsData([]);
    }
  };

  const holdOverBtnClick: any = () => {
    if (selectedUploadGoodsItem && selectedRecommenadtionsItem) {
      const newItem = {
        uploadGoods: selectedUploadGoodsItem,
        recommendation: selectedRecommenadtionsItem,
      };

      // const updatedParsingData = parsingData.map((item) => {
      //   if (item.key === selectedLineUploadGoods) {
      //     return { ...item, status: "hold over" };
      //   }
      //   return item;
      // });

      // setholdOverdItems((prevItems) => [...prevItems, newItem]);

      setSelectedUploadGoodsItem(undefined);
      setSelectedRecommenadtionsItem(undefined);
      setRecommendationsData([]);
    }
  };

  const rejectBtnClick: any = () => {
    if (selectedUploadGoodsItem) {
      // const updatedParsingData = parsingData.map((item) =>
      //   item.key === selectedLineUploadGoods
      //     ? { ...item, status: "rejected" }
      //     : item
      // );

      // setRejectedItems((prevItems) => [
      //   ...prevItems,
      //   { ...selectedGood, status: "rejected" },
      // ]);

      setSelectedUploadGoodsItem(undefined);
      setSelectedRecommenadtionsItem(undefined);
      setRecommendationsData([]);
    }
  };

  const addToRecommendations = (item: ProductModel) => {
    const newRecommendation = {
      name_1c: item.name_1c,
      product_id: item.product_id
    } as ProcreatorVariantType;

    setRecommendationsData((prev) => [...prev, newRecommendation]);
  };

  return (
    <div className={styles.table}>
      <div className={styles.goods}>
        <h3 className={styles.text}>Список загруженных товаров:</h3>
        <UploadGoodsTable
          isLoading={isLoading}
          onUploadSelectClick={onUploadSelectClick}
          dataSource={dataSourse}
        />
      </div>
      <div className={styles.optionsContainer}>
        <div className={styles.search}>
          <AutoSearch onAddToRecommendations={addToRecommendations} products={jsonData.data.products} />
        </div>
        <div className={styles.options}>
          <h3 className={styles.optionsText}>Окно предложенных вариантов</h3>
          <RecommendationsTable
            dataSource={recommendationsData}
            onSelectRecommendations={onRecommendationsSelect}
          />
        </div>
        <div className={styles.buttons}>
          <GradientButton onClick={approveBtnClick} disabled={!selectedRecommenadtionsItem}>
            Подтвердить
          </GradientButton>
          <GradientButton onClick={holdOverBtnClick} disabled={!selectedRecommenadtionsItem}>
            Отложить
          </GradientButton>
          <GradientButton
            disabled={recommendationsData.length === 0}
            onClick={rejectBtnClick}
          >
            Отклонить все
          </GradientButton>
        </div>
        <div className={styles.buttons}>
          {/* <button className={styles.historyBtn}>
            Посмотреть историю действий
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Matching;
