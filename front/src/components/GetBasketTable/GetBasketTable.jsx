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
    // <div className="basket-table-container">
    //   {cart.map((row, i) => (
    //     <div className="basket-table-container-table">
    //       <div className="basket-table-container-row">
    //         {row.headers.map((col, j) => (
    //           <>
    //             <div className="basket-table-container-col">
    //               <div className="basket-table-container-col-header">{col}</div>
    //               <div className="basket-table-container-col-data">
    //                 {row.row_data[j]}
    //               </div>
    //             </div>

    //             {j == row.headers.length - 1 && (
    //               <div className="basket-table-container-col">
    //                 <div className="basket-table-container-col-header">
    //                   Количество
    //                 </div>
    //                 <div className="basket-table-container-col-data">
    //                   {row.quantity}
    //                 </div>
    //               </div>
    //             )}
    //           </>
    //         ))}
    //       </div>
    //       {/* <div className="basket-table-container-row">
    //         Количество: {row.quantity}
    //       </div> */}
    //     </div>
    //   ))}
    // </div>

    <div className="basket-container">
      <div className="basket-items">
        {cart.map((item, index) => (
          <div key={index} className="basket-item">
            <div className="item-details">
              <h3 className="item-name">{item?.row_data[0]}</h3>

              <div className="item-specs">
                {item?.headers.slice(1).map((header, i) => {
                  if (
                    header.toLowerCase().trim().includes("цена") ||
                    header.toLowerCase() === "цена за тонну (руб)" ||
                    header.toLowerCase() === "цена за 1 тонну" ||
                    header.toLowerCase() === "цена за тонну руб."
                  )
                    return null;

                  const value = item?.row_data[i + 1];

                  if (header.includes("Вес")) {
                    return (
                      <div key={i} className="spec-row">
                        <span className="spec-name">{header}:</span>
                        <span className="spec-value">{value} кг</span>
                      </div>
                    );
                  }

                  // Общий случай
                  return (
                    <div key={i} className="spec-row">
                      <span className="spec-name">{header}:</span>
                      <span className="spec-value">{value}</span>
                    </div>
                  );
                })}
              </div>

              {/* Отдельно выводим цену, если она есть */}
            </div>

            <div className="item-quantity">
              <div className="quantity-controls">
                Кол-во:
                <span className="quantity-value">{item.quantity}</span>
              </div>
            </div>

            <button className="item-remove">&times;</button>
          </div>
        ))}
      </div>

      <div className="basket-summary">
        <button className="checkout-button">Оформить заказ</button>
      </div>
    </div>
  );
}

export default GetBasketTable;
