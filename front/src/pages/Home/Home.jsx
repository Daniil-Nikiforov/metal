import React from "react";
import HeaderHome from "../../components/HeaderHome/HeaderHome";
import BlueHeaderNav from "../../components/BlueHeaderNav/BlueHeaderNav";
import "./Home.css";
import SliderHome from "../../components/SliderHome/SliderHome";
import GreyHeaderNav from "../../components/GreyHeaderNav/GreyHeaderNav";
import YandexMap from "../../components/YandexMap/YandexMap";
function Home() {
  return (
    <div className="home-page">
      <section className="home-page-section">
        <HeaderHome />
        <BlueHeaderNav />
        <SliderHome />
        <GreyHeaderNav />
      </section>
      <YandexMap />
    </div>
  );
}

export default Home;
