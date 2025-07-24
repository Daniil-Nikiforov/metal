import React from "react";
import "./HeaderHome.css";
import logoImg from "../../assets/logo.png";
import logoImgWhite from "../../assets/logoWhite.png";

function HeaderHome() {
  return (
    <div className="header-home">
      <div className="header-home-grid">
        <div className="header-home-img">
          <a href="/">
            <img src={logoImgWhite} alt="logo" className="header-home-logo" />
          </a>
        </div>

        <p className="header-home-p">
          г. Санкт-Петербург ул Бухарестская, д 24, к 2 лит А, оф 8
          <br />
          <div className="header-home-line-text">
            Тел:&nbsp;
            <strong>
              <a
                className="header-home-a"
                href="tel:+78126797730"
                style={{ fontWeight: "600" }}
              >
                +7 (812) 679-77-30
              </a>
            </strong>
          </div>
          <div className="header-home-line-text">
            E-mail:&nbsp;
            <a
              className="header-home-a"
              href="mailto:zakaz@spbmetalloprokat.ru "
              style={{ fontWeight: "600" }}
            >
              zakaz@spbmetalloprokat.ru
            </a>
          </div>
        </p>
      </div>
    </div>
  );
}

export default HeaderHome;
