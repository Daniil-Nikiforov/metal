import React from "react";
import HeaderHome from "../../components/HeaderHome/HeaderHome";
import MainHeader from "../../components/MainHeader/MainHeader";
import MainContentSection from "../../components/MainContentSection/MainContentSection";
import YandexMap from "../../components/YandexMap/YandexMap";
import GetBasketTable from "../../components/GetBasketTable/GetBasketTable";

function BasketPage() {
  return (
    <div className="basket-page">
      <MainHeader />
      <MainContentSection header="Корзина">
        <GetBasketTable />
      </MainContentSection>
      <YandexMap />
    </div>
  );
}

export default BasketPage;
