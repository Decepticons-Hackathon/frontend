import React, { useState } from "react";
import { AutoComplete } from "antd";
import { ProductModel } from "../../api/models/ProductModel";

interface IAutoSearchProps {
  products: ProductModel[],
  onAddToRecommendations: (item: ProductModel) => void;
}

const AutoSearch: React.FC<IAutoSearchProps> = (props) => {
  const [options, setOptions] = useState<{ value: string }[]>();

  const searchResult = (query: string) =>{
    return props.products.filter(x => x.name_1c.toLowerCase().includes(query.toLowerCase())).map(x => ({value: x.name_1c}));
  }

  const handleSearch = (value: string) => {
    setOptions(value ? searchResult(value) : []);
  };

  const onSelect = (value: string) => {
    const item = props.products.find(x => x.name_1c === value);
    if(item){
      props.onAddToRecommendations(item);
    }
  };

  return (
    <AutoComplete
      popupMatchSelectWidth={600}
      style={{ width: 600 }}
      options={options}
      onSelect={onSelect}
      onSearch={handleSearch}
      size="large"
      allowClear
      placeholder="Введите товар Просепт"
    />
  );
};

export default AutoSearch;
