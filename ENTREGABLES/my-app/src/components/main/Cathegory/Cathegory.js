import React from "react";
import "./Cathegory.css";

const Cathegory = (props) => {
  const { cathegoryName, imageId } = props;

  return (
    <li className="cathegory-container">
      <img
        src={`/booksIcons/${imageId}.png`}
        className="cathegory-img"
        alt="cathegory"
      ></img>
      <h1 name={cathegoryName} className="cathegory-tittle">
        {cathegoryName}
      </h1>
    </li>
  );
};

export { Cathegory };
