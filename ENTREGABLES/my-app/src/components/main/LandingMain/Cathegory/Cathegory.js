import React from "react";
import "./Cathegory.css";

const Cathegory = (props) => {
  const { cathegoryId, cathegoryName } = props;

  return (
    <li className="cathegory-item">
      <img
        src={`/booksIcons/${cathegoryId}.png`}
        className="cathegory-img"
        alt="cathegory"
      />
      <h1 name={cathegoryName} className="cathegory-tittle">
        {cathegoryName}
      </h1>
    </li>
  );
};

export { Cathegory };
