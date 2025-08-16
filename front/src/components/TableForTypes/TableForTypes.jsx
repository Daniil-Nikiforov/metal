import React, { useState } from "react";
import "./TableForTypes.css";
import AddToBasket from "../AddToBucket/AddToBasket";
import ModalNotification from "../ModalNotification/ModalNotification";
import { v4 as uuidv4 } from 'uuid';

function TableForTypes({ table }) {
  let firstRow = null;
  const [quan, setQuan] = useState(1);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 700);
  };
  

  return (
    <table className="table-for-types-container">
      {notification && (
        <ModalNotification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      {table.map((row, i) =>
        i === 100000 ? (
          ""
        ) : (
          <tr
            key={i}
            className={
              i == 0
                ? `table-for-types-container-row col-item-head`
                : `table-for-types-container-row`
            }
          >
            <td className="table-for-types-container-col">
              {/* {row.map((col, j) => ({ col }))} */}
              {row.map(
                (col, j) =>
                  !col.toLowerCase().trim().includes("цена") && (
                    <div
                      className={
                        i == 0
                          ? `table-for-types-container-col-item col-item-head-text`
                          : `table-for-types-container-col-item`
                      }
                    >
                      {i == 0
                        ? col.toLowerCase().trim().includes("цена") ||
                          col.toLowerCase().trim() === "цена за тонну (руб)" ||
                          col.toLowerCase().trim() === "цена за 1 тонну" ||
                          col.toLowerCase().trim() === "цена за тонну руб." ||
                          col.toLowerCase().trim() === "цена по запросу"
                          ? null
                          : col
                        : col.toLowerCase().trim().includes("цена") ||
                          col.toLowerCase().trim() === "цена за тонну (руб)" ||
                          col.toLowerCase().trim() === "цена за 1 тонну" ||
                          col.toLowerCase().trim() === "цена за тонну руб." ||
                          col.toLowerCase().trim() === "цена по запросу"
                        ? null
                        : col}
                    </div>
                  )
              )}
              <div className="table-for-types-container-col">
                {i == 0 ? (
                  <div className="table-for-types-container-input">
                    <input
                      style={{ visibility: "hidden" }}
                      type="number"
                      className="add-to-basket-input"
                      min={1}
                      defaultValue={1}
                    />

                    <div style={{ visibility: "hidden" }}>
                      <AddToBasket
                        style={{ visibility: "hidden" }}
                        add={() => {
                        
                          const cartId = localStorage.getItem("cartId") || `anon_${uuidv4()}`;

                          localStorage.setItem("cartId", cartId);
                          const header = table[0];
                          const selectedRow = row;

                          const dataToSend = {
                            cart_id: cartId,
                            headers: JSON.stringify(header),
                            row_data: JSON.stringify(selectedRow),
                          };

                          // fetch("http://localhost:3000/api/cart/add", {
                          //   method: "POST",
                          //   headers: {
                          //     "Content-Type": "application/json",
                          //   },
                          //   body: JSON.stringify(dataToSend),
                          // })
                          //   .then((response) => response.json())
                          //   .then((data) => {
                          //     console.log("Товар добавлен в корзину", data);
                          //     alert("Товар добавлен в корзину");
                          //   })
                          //   .catch((error) => {
                          //     console.error("Ошибка:", error);
                          //     alert("Ошибка при добавлении в корзину");
                          //   });
                          console.log(table[0]);
                          console.log(row[0]);
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="table-for-types-container-input">
                    <input
                      type="number"
                      className="add-to-basket-input"
                      min={1}
                      defaultValue={1}
                      onChange={(e) => {
                        setQuan(e.target.value);
                      }}
                    />
                    <AddToBasket
                      add={() => {
                        const cartId = localStorage.getItem("cartId") || `anon_${uuidv4()}`;
                        localStorage.setItem("cartId", cartId);
                        const header = table[0];
                        const selectedRow = row;

                        const itemId = cartId + uuidv4();
                        console.log(itemId);

                        const dataToSend = {
                          cart_id: cartId,
                          headers: JSON.stringify(header),
                          row_data: JSON.stringify(selectedRow),
                          quantity: quan,
                          item_id: itemId,
                        };

                        fetch("http://185.23.35.28:3000/api/cart/add", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(dataToSend),
                        })
                          .then((response) => response.json())
                          .then((data) => {
                            console.log("Товар добавлен в корзину", data);
                            showNotification(
                              "Товар добавлен в корзину",
                              "success"
                            );
                          })
                          .catch((error) => {
                            console.error("Ошибка:", error);
                            alert("Ошибка при добавлении в корзину");
                          });
                        console.log(dataToSend);
                      }}
                    />
                  </div>
                )}
              </div>
            </td>
          </tr>
        )
      )}
    </table>
  );
}

export default TableForTypes;
