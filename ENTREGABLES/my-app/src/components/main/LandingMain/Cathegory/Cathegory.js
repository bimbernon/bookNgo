import React from "react";
import "./Cathegory.css";
import { Link } from "react-router-dom";

const Cathegory = (props) => {
  const { imageId } = props;

  return (
    <li className="cathegory-item">
      <Link to="/cathegory/books" className="cathegory-navigation-link">
      <img
        src={`/booksIcons/${imageId}.png`}
        className="cathegory-img"
        alt="cathegory"
      />
      </Link>
      {/* <h1 name={cathegoryName} className="cathegory-tittle">
      </h1> */}
    </li>
  );
};

export { Cathegory };
