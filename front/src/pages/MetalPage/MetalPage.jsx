import React, { useContext, useEffect, useState } from "react";
import MainHeader from "../../components/MainHeader/MainHeader";
import MainContentSection from "../../components/MainContentSection/MainContentSection";
import YandexMap from "../../components/YandexMap/YandexMap";
import { useLocation, useParams } from "react-router-dom";
import { allMetals } from "../../jsDB/jsDb.js";
import "./MetalPage.css";
import { ModalContext } from "../../context/ModalContext.jsx";
import parser from "html-react-parser";
import { fetchSingleMetal } from "../../api/metalApi.js";
import * as cheerio from "cheerio";

function MetalPage() {
  const { name } = useParams();
  const [metal, setMetal] = useState(null);
  const [htmlMetalContent, setHtmlMetalContent] = useState(null);
  const [loading, setLoading] = useState(true);

  const { openModal } = useContext(ModalContext);

  const location = useLocation();

  let cher = null;
  let firstTd = null;
  let addToFirstTdPrice = null;

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
      window.scrollTo(0, 0);
      try {
        const response = await fetchSingleMetal(name);
        const data = await response.data[0];
        setMetal(await data);
        setHtmlMetalContent(await data.html_content);
        setLoading(false);
      } catch (error) {
        console.error("Ошибка загрузки:", error);
        setLoading(false);
      }
    };
    loadData();
  }, [name]);
  //console.log(htmlMetalContent);
  //console.log(htmlMetalContent);
  //Добавить колонку в самый верх цена, в каждом tr добавить колонку колво штук и купить
  const madeHtml = () => {
    if (metal && metal?.html_content.length > 0) {
      //console.log(htmlMetalContent);
      cher = cheerio.load(metal.html_content);

      firstTd = cher("tr").first();
      addToFirstTdPrice = cher('td:contains("Диаметр")');
      //addToFirstTdPrice.text("Цена");
      //firstTd = firstTd.append(`<td>${addToFirstTdPrice.html()}</td>`);
      firstTd = firstTd.append(`<td>Цена</td>`);
      cher("tr").first().html(firstTd.html());
      cher.html(cher.html().replaceAll(`{" "}`, ""));
      //console.log(firstTd.html());
      //console.log(cher.html());
    }
  };

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
    madeHtml();
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

            <div
              dangerouslySetInnerHTML={{
                __html: cher.html(),
              }}
              className="matal-page-content-description"
            >
              {/* {parser(metal.html_content.replaceAll(`{" "}`, ""))} */}
              {/* {parser(cher.html())} */}
            </div>
          </div>
        </MainContentSection>
        <YandexMap />
      </div>
    );
  }
}

export default MetalPage;
