import React, { Component, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import s1 from "../../assets/slide1.jpg";
import s2 from "../../assets/slide2.jpg";
import s3 from "../../assets/slide3.jpg";
import s4 from "../../assets/slide4.jpg";
import s5 from "../../assets/slide5.jpg";
import s6 from "../../assets/slide6.jpg";
import slideLeft from "../../assets/slide-left.png";
import slideRight from "../../assets/slide-right.png";
import "./SliderHome.css";

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <img
      className={className}
      onClick={onClick}
      src={slideRight}
      style={{
        ...style,
        display: "block",
        width: "64px",
        height: "64px",
        marginRight: "32px",
      }}
    ></img>
  );
}
function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <img
      className={className}
      onClick={onClick}
      src={slideLeft}
      style={{
        ...style,
        display: "block",
        width: "64px",
        height: "64px",
        marginLeft: "32px",
        zIndex: "10",
      }}
    ></img>
  );
}

function SliderHome() {
  let settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 4500,
    arrows: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  let settingsNoArrows = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 4500,
  };
  const [v, setV] = useState(false);

  return (
    <div
      className="slider-home-container"
      onMouseEnter={() => {
        setV(true);
      }}
      onMouseLeave={() => {
        setV(false);
      }}
    >
      <Slider {...settingsNoArrows} className="slider-home-slider">
        <div className="slider-home-div" id="slider-home-div-1">
          <div className="slider-home-div-flex">
            <div className="slider-home-black-block">
              <h2>Компания ООО "Доминион"</h2>
              <p>
                В нашей компании вы можете купить металлопрокат, оптом и в
                розницу, любых марок стали и типоразмеров!
                <br /> Мы предлагаем доступные цены на металлопрокат, быструю
                доставку, услуги металлообработки. Качество <br />
                реализуемой продукции подтверждено сертификатами.
              </p>
            </div>
          </div>
        </div>

        <div className="slider-home-div" id="slider-home-div-2">
          <div className="slider-home-div-flex">
            <div className="slider-home-black-block">
              <h2>Штоки хромированные</h2>
              <p>
                ООО «Доминион» - крупный поставщик ХОНИНГОВАННЫХ ТРУБ и
                ХРОМИРОВАННЫХ ШТОКОВ для производства и ремонта гидроцилиндров.
              </p>
            </div>
          </div>
        </div>

        <div className="slider-home-div" id="slider-home-div-3">
          <div className="slider-home-div-flex">
            <div className="slider-home-black-block">
              <h2>Сетка от грызунов</h2>
              <p>
                Компания ООО "Доминион" предлагает сетку сварную оцинкованную,
                ячейка 6х6мм, проволока 0.6мм. Размер рулона 1х15м. Для защиты
                от грызунов. Самовывоз и Доставка.
              </p>
            </div>
          </div>
        </div>

        <div className="slider-home-div" id="slider-home-div-4">
          <div className="slider-home-div-flex">
            <div className="slider-home-black-block">
              <h2>Лист алюминиевый рифлёный</h2>
              <p>
                Компания "Доминион" предлагает широкий ассортимент АЛЮМИНИЕВОГО
                ЛИСТА КВИНТЕТ от 1 листа.
              </p>
            </div>
          </div>
        </div>

        <div className="slider-home-div" id="slider-home-div-5">
          <div className="slider-home-div-flex">
            <div className="slider-home-black-block">
              <h2>Перфорированный лист</h2>
              <p>
                Компания "Доминион" предлагает широкий выбор ПЕРФОРИРОВАННОГО
                АЛЮМИНИЕВОГО ЛИСТА по выгодной цене, как оптом так и в розницу
              </p>
            </div>
          </div>
        </div>

        <div className="slider-home-div" id="slider-home-div-6">
          <div className="slider-home-div-flex">
            <div className="slider-home-black-block">
              <h2>Лист из нержавеющей стали</h2>
              <p>
                Компания "Доминион" предлагает широкий ассортимент НЕРЖАВЕЮЩЕГО
                ЛИСТА из различных сплавов, со склада в Санкт-Петербурге по
                выгодной цене, как оптом так и в розницу.
              </p>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default SliderHome;
