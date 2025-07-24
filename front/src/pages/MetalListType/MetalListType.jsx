import React, { useEffect, useState } from "react";
import MainHeader from "../../components/MainHeader/MainHeader";
import MainContentSection from "../../components/MainContentSection/MainContentSection";
import YandexMap from "../../components/YandexMap/YandexMap";
import { Link, useLocation, useParams } from "react-router";
import { fetchMetalType } from "../../api/metalApi";

function MetalListType() {
  const { name } = useParams();
  const [metalList, setMetalList] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    const loadData = async () => {
      window.scrollTo(0, 0);
      try {
        const response = await fetchMetalType(name);
        setMetalList(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Ошибка загрузки:", error);
        setLoading(false);
      }
    };
    loadData();
  }, [name]);

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
      <MainContentSection header={metalList["0"].main_type_ru}>
        <div className="metal-list-page-content">
          {metalList.map((metal, index) => (
            <div key={metal.id} className="metal-list-page-content-metal">
              <Link
                to={`/metals/${metal.url_slug}`}
                className="metal-list-page-content-metal-img-link"
              >
                <img
                  src={metal.image_path}
                  alt={metal.image_path}
                  className="metal-list-page-content-metal-img"
                />
              </Link>

              <Link
                to={`/metals/${metal.url_slug}`}
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

export default MetalListType;
