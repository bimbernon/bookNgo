import React from "react";

export const HowItWorks = () => {
  return (
    <div>
      <h2 className="title-howItWorks">¿Cómo funciona?</h2>
      <div className="main-howItWorks">
        <div className="body-howItWorks">
          <p>Todos tenemos libros que ya hemos leído una y otra vez...</p>
          <p className="title-bold">¿Por qué no darles una segunda vida?</p>
        </div>
        <div className="arrow">
          <img className="img-arrow" src="frefer" alt="arrow"></img>
        </div>
        <div className="div-list-howItWorks">
          <ol className="list-howItWorks">
            <li className="list-item">
              <a href="ferfer">Registrate</a>
            </li>
            <li className="list-item">
              <a href="fererg">Dona tus libros</a>
            </li>
            <li className="list-item">
              <a href="frfref">Recarga tu saldo</a>
            </li>
            <li className="list-item">
              <a href="gfregrg">Escoge un libro de nuestra biblioteca</a>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};
