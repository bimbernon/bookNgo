import React from "react";
import "./DonationsForm.css";

export const DonationsForm = () => {
  return (
    <div className="donations-container">
      <form className="donations-form">
        <h1 className="donations-form-title">Envíanos tus libros</h1>
        <input
          type="text"
          className="donations-input"
          placeholder="  Título del libro"
        ></input>
        <input
          type="text"
          className="donations-input"
          placeholder="  Nombre del autor"
        ></input>
        <p className="donations-form-direction">
          Envíanos tu libro a Evergreen Terrace 123, Springfield (Colorado).
          United States.
        </p>
        <button className="donations-form-button" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
};
