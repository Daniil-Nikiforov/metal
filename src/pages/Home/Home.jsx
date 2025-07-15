import React from "react";
import HeaderHome from "../../components/HeaderHome/HeaderHome";
import BlueHeaderNav from "../../components/BlueHeaderNav/BlueHeaderNav";
import "./Home.css";
import SliderHome from "../../components/SliderHome/SliderHome";
function Home() {
  return (
    <div className="home-page">
      <section className="home-page-section">
        <HeaderHome />
        <BlueHeaderNav />
        <SliderHome />
      </section>
    </div>
  );
}

export default Home;
