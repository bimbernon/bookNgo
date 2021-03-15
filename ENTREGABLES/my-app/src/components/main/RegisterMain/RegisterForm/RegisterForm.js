import React, { useState } from "react";
import "./RegisterForm.css";

export const RegisterForm = () => {
  const [name, setName] = useState("");
  const [userProfileName, setUserProfileName] = useState("");
  const [password, setPassword] = useState("");
  const [lastName1, setLastName1] = useState("");
  const [lastName2, setLastName2] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAdress] = useState("");

  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeUserProfileName = (e) => setUserProfileName(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);
  const handleChangeLastName1 = (e) => setLastName1(e.target.value);
  const handleChangeLastName2 = (e) => setLastName2(e.target.value);
  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangeAdress = (e) => setAdress(e.target.value);

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
      setLastName1("");
      setLastName2("");
      setEmail("");
      setAdress("");
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-form-title">Regístrate</h1>

      <form className="register-form" onSubmit={handleSubmit} action="/">
        <div className="register-form-item">
          <input
            required
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={handleChangeName}
          ></input>
        </div>
        <div className="register-form-item">
          <input
            required
            type="text"
            placeholder="Nombre de perfil"
            value={userProfileName}
            onChange={handleChangeUserProfileName}
          ></input>
        </div>
        <div className="register-form-item">
          <input
            required
            type="text"
            placeholder="Contraseña"
            value={password}
            onChange={handleChangePassword}
          ></input>
        </div>
        <div className="register-form-item">
          <input
            required
            type="text"
            placeholder="Primer Apellido"
            value={lastName1}
            onChange={handleChangeLastName1}
          ></input>
        </div>
        <div className="register-form-item">
          <input
            required
            type="text"
            placeholder="Segundo Apellido"
            value={lastName2}
            onChange={handleChangeLastName2}
          ></input>
        </div>
        <div className="register-form-item">
          <input
            required
            type="text"
            placeholder="Email"
            value={email}
            onChange={handleChangeEmail}
          ></input>
        </div>
        <div className="register-form-item">
          <input
            required
            type="text"
            placeholder="Direccion"
            value={address}
            onChange={handleChangeAdress}
          ></input>
        </div>
        <div className="register-button-container">
          <button className="register-submit-button" type="submit">
            INICIAR SESION
          </button>
        </div>
      </form>
    </div>
  );
};
