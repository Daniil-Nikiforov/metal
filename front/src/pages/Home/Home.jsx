import React, { useEffect, useState } from "react";
import HeaderHome from "../../components/HeaderHome/HeaderHome";
import BlueHeaderNav from "../../components/BlueHeaderNav/BlueHeaderNav";
import "./Home.css";
import SliderHome from "../../components/SliderHome/SliderHome";
import GreyHeaderNav from "../../components/GreyHeaderNav/GreyHeaderNav";
import YandexMap from "../../components/YandexMap/YandexMap";
import MetalTable from "../../components/MetalTable/MetalTable";
import { fetchAllMetals } from "../../api/metalApi";

function Home() {
  const [allMetals, setAllMetals] = useState(null);
  const [loading, setLoading] = useState(true);
  let cvetnoiMetal = null;
  let chernyMetal = null;
  let nershavMetal = null;
  let setkaMetal = null;
  let pervMetal = null;
  let shtokMetal = null;
  // let aluminiMetal = null;
  // let bronzaMetal = null;
  // let medMetal = null;
  // let latunMetal = null;
  // let nihromFehralMetal = null;
  // let svinecMetal = null;

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchAllMetals();
        const data = await response.data;
        setAllMetals(data);
        setLoading(false);
      } catch (error) {
        console.error("Ошибка загрузки:", error);
        setLoading(false);
      }
    };
    loadData();
  }, []);
  if (allMetals && allMetals.length > 1) {
    cvetnoiMetal = allMetals.filter((item) => item.sub_type == "cvetnoi");
    chernyMetal = allMetals.filter((item) => item.sub_type == "chernyi");
    nershavMetal = allMetals.filter(
      (item) => item.sub_type == "nerzhaveyuschaja-stal"
    );
    setkaMetal = allMetals.filter((item) => item.sub_type == "setka");
    pervMetal = allMetals.filter(
      (item) => item.sub_type == "perforirovannyi-list"
    );
    shtokMetal = allMetals.filter(
      (item) =>
        item.sub_type == "truby-honingovannye-besshovnye-i-shtoki-hromirovannye"
    );
    // aluminiMetal = allMetals.filter((item) => item.main_type == "alumini");
    // bronzaMetal = allMetals.filter((item) => item.main_type == "bronza");
    // medMetal = allMetals.filter((item) => item.main_type == "med");
    // latunMetal = allMetals.filter((item) => item.main_type == "latun");
    // nihromFehralMetal = allMetals.filter(
    //   (item) => item.main_type == "nihrom-fehral"
    // );
    // svinecMetal = allMetals.filter((item) => item.main_type == "svinec");

    // console.log(aluminiMetal);
    // console.log(bronzaMetal);
    // console.log(medMetal);
    // console.log(latunMetal);
    // console.log(nihromFehralMetal);
    // console.log(svinecMetal);
  }
  if (loading) {
    return (
      <div className="home-page">
        <section className="home-page-section">
          <HeaderHome />
          <BlueHeaderNav />
          <SliderHome />
          <GreyHeaderNav />
        </section>
        <div className="home-page-loading">Загрузка...</div>

        <YandexMap />
      </div>
    );
  } else if (loading == false && !allMetals) {
    return (
      <div className="home-page">
        <section className="home-page-section">
          <HeaderHome />
          <BlueHeaderNav />
          <SliderHome />
          <GreyHeaderNav />
        </section>
        <div className="home-page-loading">Не удалось загрузить товар</div>

        <YandexMap />
      </div>
    );
  } else {
    return (
      <div className="home-page">
        <section className="home-page-section">
          <HeaderHome />
          <BlueHeaderNav />
          <SliderHome />
          <GreyHeaderNav />
        </section>
        <div className="home-page-tables">
          <MetalTable metals={cvetnoiMetal} />
          <MetalTable metals={chernyMetal} />
          <MetalTable metals={nershavMetal} />
          <MetalTable metals={setkaMetal} />
          <MetalTable metals={pervMetal} />
          <MetalTable metals={shtokMetal} />
        </div>
        <YandexMap />
      </div>
    );
  }
}

export default Home;
