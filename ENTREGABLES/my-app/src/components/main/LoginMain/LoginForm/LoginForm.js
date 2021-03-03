import React, { useState } from "react";
import "./LoginForm.css";

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-container">
      <h1 className="login-form-title">¡Hola, booker!</h1>

      <form className="login-form" action="/">
        <div className="login-form-item">
          <input type="text" placeholder="  email" />
        </div>
        <div className="login-form-item">
          <input type="password" placeholder="  contraseña" />
        </div>
        <div className="login-button-container">
          <button className="login-submit-button" type="submit">
            <img
              className="login-button-logo"
              src="/logosProyecto/logoPrincipal/logo/logo_small_icon_only_inverted.png"
              alt="logo"
            />
          </button>
        </div>
      </form>
    </div>
  );
};

export { LoginForm };
