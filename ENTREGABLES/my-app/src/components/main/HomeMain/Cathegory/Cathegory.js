import React from "react";
import "./Cathegory.css";

const Cathegory = (props) => {
  const { cathegoryId, cathegoryName } = props;

  const style = {
    // backgroundImage: `url("/booksIcons/9.jpeg")`,
    backgroundImage: `url("/booksIcons/${cathegoryId}.png")`,
    backgroundSize: "cover",
    backgroundPosition: "33%",
    backgroundRepeat: "no-repeat",
  };

  return (
    <li className="cathegory-item">
      <div className="div-cathegory-container" style={style}>
        <h1 name={cathegoryName} className="cathegory-tittle">
          {cathegoryName}
        </h1>
      </div>
    </li>
  );
};

export { Cathegory };
