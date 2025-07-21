import React, { useContext, useEffect, useState } from "react";
import MainHeader from "../../components/MainHeader/MainHeader";
import MainContentSection from "../../components/MainContentSection/MainContentSection";
import YandexMap from "../../components/YandexMap/YandexMap";
import { useParams } from "react-router-dom";
import { allMetals } from "../../jsDB/jsDb.js";
import "./MetalPage.css";
import { ModalContext } from "../../context/ModalContext.jsx";
import parser from "html-react-parser";
import { fetchSingleMetal } from "../../api/metalApi.js";

function MetalPage() {
  const { name } = useParams();
  const [metal, setMetal] = useState(null);
  const [loading, setLoading] = useState(true);

  const { openModal } = useContext(ModalContext);

  useEffect(() => {
    // const fetchMetal = () => {

    //   setLoading(true);
    //   try {
    //     setTimeout(() => {
    //       let currentMetal = allMetals.filter((item) => item.url === name);
    //       if (currentMetal && currentMetal.length > 0) {
    //         setMetal(currentMetal[0]);
    //         setLoading(false);
    //       } else {
    //         setLoading(false);
    //         return (
    //           <div className="metal-page">
    //             <MainHeader />
    //             <MainContentSection header="Загрузка..."></MainContentSection>
    //             <YandexMap />
    //           </div>
    //         );
    //       }
    //     }, 0);
    //   } catch (error) {
    //     setLoading(false);
    //     console.log(error.message);
    //   }
    // };
    // fetchMetal();
    const loadData = async () => {
      try {
        const response = await fetchSingleMetal(name);
        setMetal(response.data[0]);
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
      <div className="metal-page">
        <MainHeader />
        <MainContentSection header="Загрузка..."></MainContentSection>
        <YandexMap />
      </div>
    );
  } else if (loading == false && !metal) {
    return (
      <div className="metal-page">
        <MainHeader />
        <MainContentSection header="Товар не найден"></MainContentSection>
        <YandexMap />
      </div>
    );
  } else {
    return (
      <div className="metal-page">
        <MainHeader />
        <MainContentSection header={metal.name}>
          <div className="metal-page-content">
            <ul className="metal-page-content-ul">
              <li className="metal-page-content-ul-li">
                <a href="" className="metal-page-content-ul-li-a active">
                  Товар
                </a>
              </li>
              <li className="metal-page-content-ul-li">
                <a href="" className="metal-page-content-ul-li-a">
                  Прайсы
                </a>
              </li>
            </ul>

            <div className="matal-page-content-img-button">
              <img
                src={metal.image_path}
                alt={metal.image_path}
                className="matal-page-content-img"
              />
              <div className="matal-page-content-space"></div>
              <button
                className="metal-page-content-btn-zayavka"
                onClick={() => {
                  openModal();
                }}
              >
                ЗАЯВКА НА МЕТАЛЛОПРОКАТ
              </button>
            </div>

            <div className="matal-page-content-description">
              {parser(metal.html_content.replaceAll(`{" "}`, ""))}
            </div>
          </div>
        </MainContentSection>
        <YandexMap />
      </div>
    );
  }
}

export default MetalPage;
