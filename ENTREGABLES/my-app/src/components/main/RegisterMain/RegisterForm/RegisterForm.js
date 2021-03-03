import "./RegisterForm.css";
import React, { useState } from "react";

export const RegisterForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="register-container">
      <form className="register-form" action="/">
        <h1 className="register-form-title">Hazte Booker!</h1>
        <div className="form-item">
          <input type="text" placeholder="  photo"></input>
        </div>
        <div className="form-item">
          <input type="text" placeholder="Nombre"></input>
        </div>
        <div className="form-item">
          <input type="text" placeholder="Nombre de perfil"></input>
        </div>
        <div className="form-item">
          <input type="text" placeholder="Contraseña"></input>
        </div>
        <div className="form-item">
          <input type="text" placeholder="Primer Apellido"></input>
        </div>
        <div className="form-item">
          <input type="text" placeholder="Segundo Apellido"></input>
        </div>
        <div className="form-item">
          <input type="text" placeholder="Email"></input>
        </div>
        <div className="form-item">
          <input type="text" placeholder="Direccion"></input>
        </div>
        <div className="button-container">
          <button className="form-submit-button" type="submit">
            <img
              className="button-logo"
              src="/logosProyecto/logoPrincipal/logo/logo_small_icon_only_inverted.png"
              alt="logo"
            />
          </button>
        </div>
      </form>
    </div>
  );
};
