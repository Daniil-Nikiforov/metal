import React, { useState } from "react";
import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (newQuery) => {
    if (newQuery.length < 2) {
      setResults([]);
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:3000/api/metals/search/bar?query=${encodeURIComponent(
          newQuery
        )}`
      );
      setResults(response.data);
    } catch (error) {
      console.log("Ошибка поиска товаров", error);
    }
  };

  return (
    <div className="search-metal-div">
      <div className="search-metal-div-flex">
        <input
          className="search-metal-div-input"
          type="text"
          value={query}
          onChange={(e) => {
            const newQuery = e.target.value;
            setQuery(newQuery);
            console.log(newQuery);
            handleSearch(newQuery);
          }}
          placeholder="Поиск товаров..."
        />
        {/* <button onClick={handleSearch} className="search-metal-div-button">
          <FaSearch />
        </button> */}
      </div>

      {results.length > 0 ? (
        <ul className="search-metal-div-ul">
          {results.map((product) => (
            <Link
              to={`/metals/${product.url_slug}`}
              className="search-metal-div-ul-li"
              key={product.id}
            >
              {product.name.length > 27
                ? product.name.substring(0, 27) + "..."
                : product.name}
            </Link>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default SearchBar;
