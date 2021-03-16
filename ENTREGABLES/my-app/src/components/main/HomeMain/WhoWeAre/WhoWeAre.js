import React from "react";
import { Link } from "react-router-dom";
import "./WhoWeAre.css";

export const HowItWorks = () => {
  const style = {
    backgroundImage: `url("/icons/arrow.svg")`,
    backgroundRepeat: "no-repeat",
    margin: " 0 15px 0 23px",
    height: "60px",
    width: "87px",
  };

  return (
    <div className="whoWeAre-container">
      <h2 className="title-howItWorks">¿Cómo funciona?</h2>
      <div className="main-howItWorks">
        <div className="body-howItWorks">
          <p>Todos tenemos libros que ya hemos leído una y otra vez...</p>
          <p className="title-bold">¿Por qué no darles una segunda vida?</p>
        </div>
        <div className="img-arrow" style={style}></div>
        <div className="div-list-howItWorks">
          <ul className="list-howItWorks">
            <li className="list-item">1. Registrate</li>
            <li className="list-item">
              <Link
                to="donations/create"
                style={{ textDecoration: "underline" }}
              >
                2. Dona tus libros
              </Link>
            </li>
            <li className="list-item">3. Recarga tu saldo</li>
            <li className="list-item">
              4. Escoge un libro de nuestra biblioteca
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
