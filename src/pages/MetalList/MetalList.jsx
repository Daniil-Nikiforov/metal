import React, { useEffect, useState } from "react";
import MainHeader from "../../components/MainHeader/MainHeader";
import MainContentSection from "../../components/MainContentSection/MainContentSection";
import YandexMap from "../../components/YandexMap/YandexMap";
import { Link, useParams } from "react-router";
import { allMetals } from "../../jsDB/jsDb.js";
import "./MetalList.css";

function MetalList() {
  const { name } = useParams();
  const [metalList, setMetalList] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetalList = () => {
      setLoading(true);
      try {
        setTimeout(() => {
          let currentMetalList = allMetals.filter(
            (item) => item.subType === name
          );
          if (currentMetalList && currentMetalList.length > 0) {
            setMetalList(currentMetalList);
            setLoading(false);
          } else {
            setLoading(false);
            return (
              <div className="metal-list-page">
                <MainHeader />
                <MainContentSection header="Загрузка..."></MainContentSection>
                <YandexMap />
              </div>
            );
          }
        }, 0);
      } catch (error) {
        setLoading(false);
        console.log(error.message);
      }
    };
    fetchMetalList();
  }, [name]);
  console.log(metalList);
  if (loading) {
    return (
      <div className="metal-list-page">
        <MainHeader />
        <MainContentSection header="Загрузка..."></MainContentSection>
        <YandexMap />
      </div>
    );
  } else if (loading == false && !metalList) {
    return (
      <div className="metal-list-page">
        <MainHeader />
        <MainContentSection header="Товар не найден"></MainContentSection>
        <YandexMap />
      </div>
    );
  }

  return (
    <div className="metal-list-page">
      <MainHeader />
      <MainContentSection header={metalList[0].subTypeRu}>
        <div className="metal-list-page-content">
          {metalList.map((metal, index) => (
            <div key={metal.id} className="metal-list-page-content-metal">
              <Link
                to={`/metals/${metal.url}`}
                className="metal-list-page-content-metal-img-link"
              >
                <img
                  src={metal.img}
                  alt={metal.img}
                  className="metal-list-page-content-metal-img"
                />
              </Link>

              <Link
                to={`/metals/${metal.url}`}
                className="metal-list-page-content-metal-link"
              >
                {metal.name}
              </Link>
            </div>
          ))}
        </div>
      </MainContentSection>
      <YandexMap />
    </div>
  );
}

export default MetalList;
