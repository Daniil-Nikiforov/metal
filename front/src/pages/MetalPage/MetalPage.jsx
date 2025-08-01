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
import AddToBasket from "../../components/AddToBucket/AddToBasket.jsx";
import { renderToString } from "react-dom/server";
import TableForTypes from "../../components/TableForTypes/TableForTypes.jsx";

function MetalPage() {
  const { name } = useParams();
  const [metal, setMetal] = useState(null);
  const [loading, setLoading] = useState(true);

  const { openModal } = useContext(ModalContext);

  const location = useLocation();

  let cher = null;
  let firstTd = null;
  let addToFirstTdPrice = null;
  let allTrWherePrice = null;
  let withoutTables = null;
  let resultHtml = [];

  let addToBasketHtml = renderToString(<AddToBasket />);

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
        setLoading(false);
      } catch (error) {
        console.error("Ошибка загрузки:", error);
        setLoading(false);
      }
    };
    loadData();
  }, [name]);

  //Добавить колонку в самый верх цена, в каждом tr добавить колонку колво штук и купить
  const madeHtml = () => {
    if (metal && metal?.html_content.length > 0) {
      //console.log(htmlMetalContent);
      cher = cheerio.load(metal.html_content);

      //получаем первую строку каждой таблицы если у нее не класс n
      firstTd = cher("table:not(.n) tr:first-child");
      //получаем каждую строчку с товаром
      allTrWherePrice = cher(
        "table:not(.n) tr:not(:first-child):has(td:not([colspan])):not([rowspan])"
      );
      //добавляем к каждой строчке с товаром корзину
      allTrWherePrice = allTrWherePrice.append(`<td>${addToBasketHtml}</td>`);
      //добавляем к первой строчке корзину
      firstTd = firstTd.append(`<td>Корзина</td>`);
      //изменяем весь html
      cher("table:not(.n) tr").first().html(firstTd.html());
      cher.html(cher.html().replaceAll(`{" "}`, ""));
    }
  };
  const madeReactFromHtml = () => {
    if (metal && metal?.html_content.length > 0) {
      cher = cheerio.load(metal.html_content);

      cher("table:not([class*='n'])").each((tableIndex, table) => {
        const tableClass = tableIndex;
        resultHtml[tableClass] = [];

        cher(table)
          .find("tr")
          .each((rowIndex, row) => {
            const rowData = [];

            cher(row)
              .find("td")
              .each((cellIndex, cell) => {
                rowData[cellIndex] = cher(cell).text().trim();
              });
            resultHtml[tableClass].push(rowData);
          });
      });

      resultHtml = Array(resultHtml);
      console.log(resultHtml);
      cher('table:not([class*="n"])').remove();
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
    //madeHtml();
    madeReactFromHtml();

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
              {/* <li className="metal-page-content-ul-li">
                <a href="" className="metal-page-content-ul-li-a">
                  Прайсы
                </a>
              </li> */}
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
                __html: cher.html().replaceAll(`{" "}`, ""),
              }}
              className="matal-page-content-description"
            >
              {/* {parser(metal.html_content.replaceAll(`{" "}`, ""))} */}
              {/* {parser(cher.html())} */}
            </div>
            <div className="matal-page-content-description-tables">
              {resultHtml.map((table) =>
                table.map((t) => <TableForTypes table={t} />)
              )}
            </div>
          </div>
        </MainContentSection>
        <YandexMap />
      </div>
    );
  }
}

export default MetalPage;
