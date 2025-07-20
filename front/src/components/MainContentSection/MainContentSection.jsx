import React from "react";
import "./MainContentSection.css";

function MainContentSection({ children, header }) {
  return (
    <section className="main-content-section">
      <div className="main-content-section-white-box">
        <h1 className="main-content-section-white-box-h1">{header}</h1>
        {children}
      </div>
    </section>
  );
}

export default MainContentSection;
