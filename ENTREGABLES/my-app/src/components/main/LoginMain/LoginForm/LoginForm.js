import React, { useState } from "react";
import "./LoginForm.css";
// import { useLocalStorage } from "../../../../Hooks/useLocalStorage";

const LoginForm = (props) => {
  const { url, onSuccess, onError } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);

  const loginUser = async (e) => {
    e.preventDefault();
    console.log(email, password, "prueba");

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      onSuccess(result);
      setEmail("");
      setPassword("");
      setErrorMsg("");
    } else {
      // const error = new Error('algo ha fallado.');
      // throw error;
      const errorMsg = await response.json();
      setErrorMsg("Usuario o contraseña incorrectos");
      onError(errorMsg);
      //mostrar mensaje de error
    }
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
        {errorMsg && (
          <div
            style={{
              color: "red",
              minHeight: "1.5em",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            {" "}
            {errorMsg}
          </div>
        )}
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
