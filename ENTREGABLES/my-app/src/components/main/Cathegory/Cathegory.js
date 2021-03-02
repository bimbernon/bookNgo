import React from "react";
import "./Cathegory.css";

const Cathegory = (props) => {
  const { cathegoryName, imageId } = props;

  return (
    <li className="cathegory-item">
      <a href="nunca">
        {cathegoryName}
        <img
          src={`/booksIcons/${imageId}.png`}
          className="cathegory-img"
          alt="cathegory"
        />
      </a>
      {/* <h1 name={cathegoryName} className="cathegory-tittle">
      </h1> */}
    </li>
  );
};

export { Cathegory };
