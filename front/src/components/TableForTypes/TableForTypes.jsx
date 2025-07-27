import React from "react";
import "./TableForTypes.css";
import AddToBasket from "../AddToBucket/AddToBasket";

function TableForTypes({ table }) {
  return (
    <table className="table-for-types-container">
      {table.map((row, i) => (
        <tr key={i} className="table-for-types-container-row">
          {row.map((col, j) => (
            <td key={j} className="table-for-types-container-col">
              {col}
            </td>
          ))}
          <td className="table-for-types-container-col">
            {i == 0 ? (
              "Корзина"
            ) : (
              <AddToBasket
                add={() => {
                  console.log(row);
                }}
              />
            )}
          </td>
        </tr>
      ))}
    </table>
  );
}

export default TableForTypes;
