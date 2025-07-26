import React, { useEffect, useState } from "react";
import "./MetalTable.css";
import { Link } from "react-router-dom";

function MetalTable(props) {
  let groupedMetals = null;
  groupedMetals = [...new Set(props.metals.map((item) => item.main_type_ru))];

  const [activeTab, setActiveTab] = useState({
    metals: groupedMetals[0],
    currentMetals: props.metals
      .filter((i) => i.main_type_ru == groupedMetals[0])
      .sort((a, b) => a.id - b.id),
  });

  console.log(activeTab);

  return (
    <div className="metal-table-container">
      <div className="metal-table-tabs">
        {groupedMetals.map((item) => (
          <button
            onClick={() =>
              setActiveTab({
                metals: item,
                currentMetals: props.metals.filter(
                  (i) => i.main_type_ru == item
                ),
              })
            }
            className={`metal-table-tab ${
              activeTab.metals == item ? `active-tab` : ``
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="metal-table-grid">
        {activeTab.currentMetals.map((item) => (
          <div className="metal-table-item">
            <Link
              to={`/metals/${item.url_slug}`}
              className="metal-table-item-img"
            >
              <img src={item.image_path} alt="item.image_path" />
            </Link>
            <Link
              to={`/metals/${item.url_slug}`}
              className="metal-table-item-name"
            >
              {item.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MetalTable;
