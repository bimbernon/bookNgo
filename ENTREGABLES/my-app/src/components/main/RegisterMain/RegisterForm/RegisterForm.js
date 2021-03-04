import React, { useState } from "react";
import "./RegisterForm.css";

export const RegisterForm = (props) => {
  const [name, setName] = useState("");
  const [userProfileName, setUserProfileName] = useState("");
  const [password, setPassword] = useState("");
  const [lastName1, setlastName1] = useState("");
  const [lastName2, setLastName2] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAdress] = useState("");

  const handleChange = (stateSetter) => (e) => {
    stateSetter(e.target.value);
  };

  const handleEmail = handleChange(setEmail(email));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resp = await fetch("http://localhost:3080/api/v1/users/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        userProfileName: userProfileName,
        password: password,
        lastName1: lastName1,
        lastName2: lastName2,
        email: email,
        address: address,
      }),
    });
    if (resp.ok) {
      const respBody = await resp.json();
      setName("");
      setUserProfileName("");
      setPassword("");
      setlastName1("");
      setLastName2("");
      setEmail("");
      setAdress("");
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-form-title">Regístrate</h1>

      <form className="register-form" action="/">
        <div className="register-form-item">
          <input type="text" placeholder="  photo"></input>
        </div>
        <div className="register-form-item">
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            //onChange={handleChange(setName(name))}
          ></input>
        </div>
        <div className="register-form-item">
          <input
            type="text"
            placeholder="Nombre de perfil"
            value={userProfileName}
            //onChange={handleChange(setUserProfileName(userProfileName))}
          ></input>
        </div>
        <div className="register-form-item">
          <input
            type="text"
            placeholder="Contraseña"
            value={password}
            //onChange={handleChange(setPassword(password))}
          ></input>
        </div>
        <div className="register-form-item">
          <input
            type="text"
            placeholder="Primer Apellido"
            value={lastName1}
            //onChange={handleChange(setlastName1(lastName1))}
          ></input>
        </div>
        <div className="register-form-item">
          <input
            type="text"
            placeholder="Segundo Apellido"
            value={lastName2}
            //onChange={handleChange(setLastName2(lastName2))}
          ></input>
        </div>
        <div className="register-form-item">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={handleEmail}
          ></input>
        </div>
        <div className="register-form-item">
          <input
            type="text"
            placeholder="Direccion"
            value={address}
            // onChange={handleChange(setAdress(address))}
          ></input>
        </div>
        <div className="register-button-container">
          <button
            className="register-form-submit-button"
            type="submit"
            onSubmit={handleSubmit}
          >
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
