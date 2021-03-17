import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { UserContext } from "../../../providers/UserProvider";
import Swal from "sweetalert2";
import "./LoginForm.css";

const LoginForm = (props) => {
  const { url } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setErrorMsg] = useState("");
  const [, setSelectedUser] = useContext(UserContext);
  const [, setToken] = useContext(AuthContext);

  const history = useHistory();

  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);

  const loginUser = async (e) => {
    e.preventDefault();

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
      setEmail("");
      setPassword("");
      setErrorMsg("");

      setSelectedUser(result.user);
      setToken(result.accessToken);

      history.push("/");
    } else {
      await response.json();
      setErrorMsg(
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Usuario o contraseña insocrrectos.!",
          button: true,
        })
      );
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-form-title">¡Hola, booker!</h1>

      <form className="login-form" onSubmit={loginUser} action="/">
        <div className="login-form-item">
          <input
            required
            type="email"
            placeholder="  email"
            value={email}
            onChange={handleChangeEmail}
          />
        </div>
        <div className="login-form-item">
          <input
            required
            type="password"
            placeholder="  contraseña"
            value={password}
            onChange={handleChangePassword}
          />
        </div>
        <div className="register-advice-container">
          <p className="advice-text">¿Todavía no eres booker?</p>
          <Link to="/users/register" className="link-to-register">
            ¡Regístrate ya!
          </Link>
        </div>
        <div className="login-button-container">
          <button className="login-submit-button" type="submit">
            INICIAR SESION
          </button>
        </div>
      </form>
    </div>
  );
};

export { LoginForm };
