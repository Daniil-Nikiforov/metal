import React, { useContext, useEffect, useState } from "react";
import MainHeader from "../../components/MainHeader/MainHeader";
import MainContentSection from "../../components/MainContentSection/MainContentSection";
import YandexMap from "../../components/YandexMap/YandexMap";
import { useParams } from "react-router-dom";
import { allMetals } from "../../jsDB/jsDb.js";
import "./MetalPage.css";
import { ModalContext } from "../../context/ModalContext.jsx";
import parser from "html-react-parser";

function MetalPage() {
  const { name } = useParams();
  const [metal, setMetal] = useState(null);
  const [loading, setLoading] = useState(true);

  const { openModal } = useContext(ModalContext);

  useEffect(() => {
    const fetchMetal = () => {
      setLoading(true);
      try {
        setTimeout(() => {
          let currentMetal = allMetals.filter((item) => item.url === name);
          if (currentMetal && currentMetal.length > 0) {
            setMetal(currentMetal[0]);
            setLoading(false);
          } else {
            setLoading(false);
            return (
              <div className="metal-page">
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
    fetchMetal();
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
                src={metal.img}
                alt={metal.url}
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

            {/* <div className="matal-page-content-description">
              <p>
                Компания "СОЮЗМЕТАЛЛ" предлагает широкий ассортимент АЛЮМИНИЕВОЙ
                ПРОВОЛОКИ&nbsp; различных сплавов и размеров<strong>.</strong>{" "}
                Продажа осуществляется как оптом, так и в розницу, по выгодной
                цене, со склада в Санкт-Петербурге. По Вашему желанию
                производится <strong>резка в размер</strong> от 5кг.{" "}
                <strong>Доставка.</strong>{" "}
              </p>

              <p>
                <em>
                  <strong>Работаем с физическими и юридическими лицами.</strong>
                </em>
              </p>

              <p>
                Алюминиевая проволока представляет собой сплошной полуфабрикат
                постоянного сечения в поперечном размере, свернутый в бухту или
                намотанный на катушку, изготовляемый прокаткой, прессованием или
                волочением. В зависимости от сплава и состояния свойства
                алюминиевой проволоки варьируется, но к общим можно отнести
                характерные качества: высокую коррозионную стойкость и легкий
                вес в сочетании с относительно повышенными конструкционными
                свойствами.&nbsp;
              </p>

              <p>
                <strong>
                  Подробную информацию по стоимости, размерам и доставке можно
                  получить по телефону у наших менеджеров. Или отправив заявку
                  на электронную почту. Или в сообщении - мы Вам перезвоним!
                </strong>
              </p>

              <p>
                <strong>
                  Наша Компания гарантирует качество поставляемого
                  металлопроката наличием сертификатов качества заводов
                  изготовителей.
                </strong>
              </p>

              <p>
                <strong>
                  <em>Отправка в любой регион РФ транспортной компанией</em>
                </strong>
              </p>

              <p>
                <strong>☎&nbsp;Звоните.</strong>
              </p>

              <table>
                {" "}
                <tbody>
                  <tr>
                    {" "}
                    <td>
                      <strong>
                        <em>Сплав</em>
                      </strong>
                    </td>{" "}
                    <td>
                      <strong>
                        <em>Диаметр </em>
                      </strong>
                    </td>{" "}
                  </tr>{" "}
                  <tr>
                    {" "}
                    <td>
                      <a href="https://almet.ru/alyuminii/alyuminievaja-provoloka/alyuminievaja-provoloka-a5-a7-ad1.html"></a>
                      СвА5, СвА7, АД1 <br />
                    </td>{" "}
                    <td>от 1,0 до 8,0 мм </td>{" "}
                  </tr>{" "}
                  <tr>
                    {" "}
                    <td>СвАМц, АМц</td> <td>от 1,6 до 4,0 мм </td>{" "}
                  </tr>{" "}
                  <tr>
                    {" "}
                    <td>АМг2, СвАМг3 </td> <td>от 1,2 до 4,0 мм</td>{" "}
                  </tr>{" "}
                  <tr>
                    {" "}
                    <td>СвАМг5, АМг5П</td> <td>от 0,8 до 8,0 мм </td>{" "}
                  </tr>{" "}
                  <tr>
                    {" "}
                    <td>СвАМг6, СвАМг61, СвАМг63</td> <td>от 1,2 до 8,0 мм </td>{" "}
                  </tr>{" "}
                  <tr>
                    {" "}
                    <td>Д1П, Д16П, Д18, В65</td> <td>от 2,0 до 6,0 мм </td>{" "}
                  </tr>{" "}
                  <tr>
                    {" "}
                    <td>СвАК5, СвАК10, Св1201</td> <td>от 1,2 до 6,0 мм</td>{" "}
                  </tr>{" "}
                </tbody>
              </table>
            </div> */}
            <div className="matal-page-content-description">
              {parser(metal.htmlContent.replaceAll(`{" "}`, ""))}
            </div>
          </div>
        </MainContentSection>
        <YandexMap />
      </div>
    );
  }
}

export default MetalPage;
