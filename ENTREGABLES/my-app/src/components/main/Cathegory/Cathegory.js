import React from "react";
import "./Cathegory.css";

const Cathegory = (props) => {
  const { cathegoryName, imageId } = props;

  return (
    <li className="cathegoryContainer">
      <img
        src={`/booksIcons/${imageId}.png`}
        className="cathegory__img"
        alt="cathegory"
      ></img>
      <h1 name={cathegoryName} className="cathegory__tittle">
        {cathegoryName}
      </h1>
    </li>
  );
};

export { Cathegory };
