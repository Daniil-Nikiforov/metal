import React from "react";
import MainHeader from "../../components/MainHeader/MainHeader";
import MainContentSection from "../../components/MainContentSection/MainContentSection";
import YandexMap from "../../components/YandexMap/YandexMap";
import "./Rules.css";

function Rules() {
  return (
    <div className="rules-page">
      <MainHeader />
      <MainContentSection
        header="Правила сайта
"
      >
        <div className="rules-page-content">
          <p>
            1. Запрещены любые формы оскорблений участников сообщества или
            администрации, в том числе нецензурные логины и никнеймы.
          </p>

          <p>2. Запрещен мат, в том числе завуалированный.</p>

          <p>
            3. Запрещено публичное обсуждение действий администрации и ее
            представителей.
          </p>

          <p>
            4. Администрация проекта оставляет за собой право изменять и
            дополнять данные правила в любой момент времени.
          </p>

          <p>
            5. В общении на сайте придерживайтесь норм грамматики русского языка
            и общепринятой вежливости. Запрещено осознанное коверканье слов,
            жаргон. Избегайте необоснованного перехода на "ты".
          </p>
        </div>
      </MainContentSection>
      <YandexMap />
    </div>
  );
}

export default Rules;
