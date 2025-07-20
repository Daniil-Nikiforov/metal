import React, { useContext } from "react";
import "./GreyHeaderNav.css";
import { Link } from "react-router-dom";
import DropDownGreyHeader from "../DropDownGreyHeader/DropDownGreyHeader";
import { allLinks } from "../../jsDB/jsDb.js";

function GreyHeaderNav() {
  return (
    <div className="grey-header-nav">
      <ul>
        <DropDownGreyHeader
          url={allLinks[0].link}
          name={allLinks[0].name}
          links={allLinks[0].links}
        />
        <DropDownGreyHeader
          url={allLinks[1].link}
          name={allLinks[1].name}
          links={allLinks[1].links}
        />
        <DropDownGreyHeader
          url={allLinks[2].link}
          name={allLinks[2].name}
          links={allLinks[2].links}
        />
        <DropDownGreyHeader
          url={allLinks[3].link}
          name={allLinks[3].name}
          links={allLinks[3].links}
        />
        <DropDownGreyHeader
          url={allLinks[4].link}
          name={allLinks[4].name}
          links={allLinks[4].links}
        />
        <DropDownGreyHeader
          url={allLinks[5].link}
          name={allLinks[5].name}
          links={allLinks[5].links}
        />
      </ul>
    </div>
  );
}

export default GreyHeaderNav;
