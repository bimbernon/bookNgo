import React, { useState } from "react";
import "./RegisterForm.css";

export const RegisterForm = (props) => {
  return (
    <div className="register-container">
      <h1 className="register-form-title">Regístrate</h1>

      <form className="register-form" action="/">
        <div className="register-form-item">
          <input type="text" placeholder="  photo"></input>
        </div>
        <div className="register-form-item">
          <input type="text" placeholder="Nombre"></input>
        </div>
        <div className="register-form-item">
          <input type="text" placeholder="Nombre de perfil"></input>
        </div>
        <div className="register-form-item">
          <input type="text" placeholder="Contraseña"></input>
        </div>
        <div className="register-form-item">
          <input type="text" placeholder="Primer Apellido"></input>
        </div>
        <div className="register-form-item">
          <input type="text" placeholder="Segundo Apellido"></input>
        </div>
        <div className="register-form-item">
          <input type="text" placeholder="Email"></input>
        </div>
        <div className="register-form-item">
          <input type="text" placeholder="Direccion"></input>
        </div>
        <div className="register-button-container">
          <button className="register-form-submit-button" type="submit">
            <img
              className="register-button-logo"
              src="/logosProyecto/logoPrincipal/logo/logo_small_icon_only_inverted.png"
              alt="logo"
            />
          </button>
        </div>
      </form>
    </div>
  );
};
