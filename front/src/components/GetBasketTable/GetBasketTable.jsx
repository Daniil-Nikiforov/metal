import React, { useEffect, useState } from "react";
import "./GetBasketTable.css";
import { load } from "cheerio";

function GetBasketTable() {
  const [cart, setCart] = useState([]);
  const loadCart = () => {
    const cartId = localStorage.getItem("cartId");
    if (cartId) {
      fetch(`http://localhost:3000/api/cart/${cartId}`)
        .then((res) => res.json())
        .then((data) => setCart(data));
    }
  };

  useEffect(() => {
    loadCart();
  }, []);
  if (cart) console.log(cart);

  return (
    <div className="basket-table-container">
      {cart.map((row, i) => (
        <div className="basket-table-container-table">
          <div className="basket-table-container-row">
            {row.headers.map((col, j) => (
              <>
                <div className="basket-table-container-col">
                  <div className="basket-table-container-col-header">{col}</div>
                  <div className="basket-table-container-col-data">
                    {row.row_data[j]}
                  </div>
                </div>

                {j == row.headers.length - 1 && (
                  <div className="basket-table-container-col">
                    <div className="basket-table-container-col-header">
                      Количество
                    </div>
                    <div className="basket-table-container-col-data">
                      {row.quantity}
                    </div>
                  </div>
                )}
              </>
            ))}
          </div>
          {/* <div className="basket-table-container-row">
            Количество: {row.quantity}
          </div> */}
        </div>
      ))}
    </div>
  );
}

export default GetBasketTable;
