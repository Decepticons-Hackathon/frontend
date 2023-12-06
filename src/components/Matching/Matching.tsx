import React from "react";
import GradientButton from "../GradientButton/GradientButton";
import styles from "./Matching.module.scss";
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
import { ProductListResult } from "../../api/models/ProductListResult";
import { ProductDetailRequest } from "../../api/models/ProductDetailRequest";

export type ParsingType = {
  key: number;
  dealer_name: string;
  dealer_id: number;
  product_name: string;
  price: number;
  product_url: string;
  date: string;
  status: string;
  procreator_variants: ProcreatorVariantType[];
};

const Matching: React.FC = () => {
  const [dataSourse, setDataSourse] = useState<ParsingType[]>([]);
  const [recommendationsData, setRecommendationsData] = useState<ProcreatorVariantType[]>([]);
  const [proseptProducts, setProseptProducts] = useState<ProductModel[]>([]);
  const [procreatorVariantsNumber, setProcreatorVariantsNumber] = useState<any | undefined>(undefined);

  const [selectedUploadGoodsItem, setSelectedUploadGoodsItem] = useState<ParsingType>();
  const [selectedRecommenadtionsItem, setSelectedRecommenadtionsItem] = useState<ProcreatorVariantType | undefined>();

  const [approvedItems, setApprovedItems] = useState([]);
  const [holdOverdItems, setholdOverdItems] = useState([]);
  const [rejectedItems, setRejectedItems] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    setIsLoading(true)
    api.getProductToMatching()
      .then((data: DealerDetailResult) => {
        message.success('Загрузка данных завершена')
        const ds = data.dealer_products.map(
          (item: DealerProductDetail) => ({
            key: item.dealer_product.id,
            dealer_name: item.dealer_product.dealer.name,
            dealer_id: item.dealer_product.dealer.id,
            date: item.dealer_product.date,
            status: item.dealer_product.dealer_product_status.status,
            price: item.dealer_product.price,
            product_name: item.dealer_product.product_name,
            product_url: item.dealer_product.product_url,
            procreator_variants: item.procreator_variants
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

    api.getProductList()
      .then((data: ProductListResult) => {
        message.success('Загрузка данных завершена')
        setProseptProducts(data.products);
      })
      .catch(() => {
        message.error('Что-то пошло не так...');
      })
  }, [])

  const onUploadSelectClick = (item: ParsingType) => {
    console.log(item)
    setSelectedUploadGoodsItem(item); // вариант дилера
    setRecommendationsData(item.procreator_variants); // ML
  };

  const onRecommendationsSelect = (item: ProcreatorVariantType | undefined) => {
    setSelectedRecommenadtionsItem(item); // продукт просепта
    setProcreatorVariantsNumber(item?.id); // id продукта просепта
  };

  const approveBtnClick: any = () => {
    if (selectedUploadGoodsItem && selectedRecommenadtionsItem) {
      console.log(selectedUploadGoodsItem)
      console.log(selectedRecommenadtionsItem)

      const request = {
        button: 'approve',
        dealer_product_id: selectedUploadGoodsItem.key,
        product_id: selectedRecommenadtionsItem.id,
        is_manual: procreatorVariantsNumber === selectedRecommenadtionsItem.id ? 'False' : 'True',
      } as ProductDetailRequest;
      api.postProductDetail(request);

      setSelectedUploadGoodsItem(undefined);
      setSelectedRecommenadtionsItem(undefined);
      setRecommendationsData([]);
      setProcreatorVariantsNumber(undefined);
    }
  };

  const holdOverBtnClick: any = () => {
    if (selectedUploadGoodsItem && selectedRecommenadtionsItem) {
      console.log(selectedUploadGoodsItem)
      console.log(selectedRecommenadtionsItem)

      const request = {
        button: 'aside',
        dealer_product_id: selectedUploadGoodsItem.key,
        product_id: selectedRecommenadtionsItem.id,
        is_manual: procreatorVariantsNumber === selectedRecommenadtionsItem.id ? 'False' : 'True',
      } as ProductDetailRequest;
      api.postProductDetail(request);

      setSelectedUploadGoodsItem(undefined);
      setSelectedRecommenadtionsItem(undefined);
      setRecommendationsData([]);
      setProcreatorVariantsNumber(undefined);
    }
  };

  const rejectBtnClick: any = () => {
    if (selectedUploadGoodsItem && selectedRecommenadtionsItem) {
      console.log(selectedUploadGoodsItem)
      console.log(selectedRecommenadtionsItem)

      const request = {
        button: 'disapprove',
        dealer_product_id: selectedUploadGoodsItem.key,
        product_id: selectedRecommenadtionsItem.id,
        is_manual: procreatorVariantsNumber === selectedRecommenadtionsItem.id ? 'False' : 'True',
      } as ProductDetailRequest;
      api.postProductDetail(request);

      setSelectedUploadGoodsItem(undefined);
      setSelectedRecommenadtionsItem(undefined);
      setRecommendationsData([]);
      setProcreatorVariantsNumber(undefined);
    }
  };

  const addToRecommendations = (item: ProductModel) => {
    const newRecommendation = {
      name_1c: item.name_1c,
      id: item.product_id
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
          <AutoSearch onAddToRecommendations={addToRecommendations} products={proseptProducts} />
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
