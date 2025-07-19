import React, { useState } from "react";
import "./DropDownGreyHeader.css";
import { Link } from "react-router";

function DropDownGreyHeader(props) {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);

  return (
    <Link
      to={props.url}
      className={`dropdown-button ${props.className}`}
      onMouseEnter={() => {
        setIsOpenDropDown(true);
      }}
      onMouseLeave={() => {
        setIsOpenDropDown(false);
      }}
    >
      {props.name}
      {isOpenDropDown && (
        <div
          className="dropdown-content"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {props.links.map((item) => (
            <Link
              to={item.url}
              className="dropdown-content-link"
              onClick={(e) => e.stopPropagation()}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </Link>
  );
}

export default DropDownGreyHeader;
