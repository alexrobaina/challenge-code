import React from "react";
import NavLinkButton from "../commons/NavLinkButton";

const FiltersActions = ({ filterSelected, handleSelectFilter }) => (
  <ul className="nav nav-tabs">
    <li className="nav-item">
      <NavLinkButton
        text="All"
        selected={filterSelected === "All"}
        handleClick={() => handleSelectFilter("All")}
      />
    </li>
    <li className="nav-item">
      <NavLinkButton
        text="Payment is late"
        selected={filterSelected === "Payment is late"}
        handleClick={() => handleSelectFilter("Payment is late")}
      />
    </li>
    <li className="nav-item">
      <NavLinkButton
        text="Lease ends in less than a month"
        selected={filterSelected === "Lease ends in less than a month"}
        handleClick={() =>
          handleSelectFilter("Lease ends in less than a month")
        }
      />
    </li>
  </ul>
);

export default FiltersActions;
