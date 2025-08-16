import React, { useEffect, useState } from "react";
import "./GetBasketTable.css";
import { load } from "cheerio";
import { deleteCartItem } from "../../api/metalApi";
import ModalNotification from "../ModalNotification/ModalNotification";
import DeliveryFrom from "../DeliveryForm/DeliveryFrom";

function GetBasketTable() {
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type) => {
    if (notification == null) {
      setNotification({ message, type });
      setTimeout(() => {
        setNotification(null);
      }, 700);
    }
  };
  const loadCart = () => {
    const cartId = localStorage.getItem("cartId");
    if (cartId) {
      fetch(`http://185.23.35.28:3000/api/cart/${cartId}`)
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
      {notification && (
        <ModalNotification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
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

                  return (
                    <div key={i} className="spec-row">
                      <span className="spec-name">{header}:</span>
                      <span className="spec-value">{value}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="item-quantity">
              <div className="quantity-controls">
                Кол-во:
                <span className="quantity-value">{item.quantity}</span>
              </div>
            </div>

            <button
              className="item-remove"
              onClick={() => {
                showNotification(null);
                deleteCartItem(item.item_id);
                setCart(cart.filter((p) => p.item_id !== item.item_id));
                showNotification("Товар удален", "success");
              }}
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      {cart && cart.length >= 1 ? (
        // <div className="basket-summary">
        //   <button className="checkout-button">Оформить заказ</button>
        // </div>
        <DeliveryFrom basket={cart} />
      ) : (
        <div style={{ fontSize: "20px", marginTop: "10px" }}>Корзина пуста</div>
      )}
    </div>
  );
}

export default GetBasketTable;
