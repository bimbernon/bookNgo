import React, { useState } from "react";
import "./LoginForm.css";
import { useLocalStorage} from "../../../../Hooks/useLocalStorage";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);

  const loginUser = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3080/api/v1/users/login", {
      method: "POST",
      header: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    await response.json();
    setEmail("");
    setPassword("");
  };

  return (
    <div className="login-container">
      <h1 className="login-form-title">¡Hola, booker!</h1>

      <form className="login-form" onSubmit={loginUser} action="/">
        <div className="login-form-item">
          <input
            type="email"
            placeholder="  email"
            value={email}
            onChange={handleChangeEmail}
          />
        </div>
        <div className="login-form-item">
          <input
            type="password"
            placeholder="  contraseña"
            value={password}
            onChange={handleChangePassword}
          />
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
