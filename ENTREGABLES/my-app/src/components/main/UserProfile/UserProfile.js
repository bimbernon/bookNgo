import React, { useState } from "react";
import { useParams } from "react-router";
import "./UserProfile.css";

export const UserProfileForm = () => {
  const [name, setName] = useState("");
  const [lastName1, setLastName1] = useState("");
  const [lastName2, setLastName2] = useState("");
  const [address, setAdress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let { userId } = useParams;

  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeLastName1 = (e) => setLastName1(e.target.value);
  const handleChangeAdress = (e) => setAdress(e.target.value);
  const handleChangeLastName2 = (e) => setLastName2(e.target.value);
  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);

  const handleUserProfile = async (e) => {
    e.preventDefault();

    const response = await fetch(
      ` http://localhost:3080/api/v1/users/update/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          lastName1: lastName1,
          lastName2: lastName2,
          address: address,
          email: email,
          password: password,
        }),
      }
    );
    if (response.ok) {
      const responseBody = await response.json();
      setName("");
      setLastName1("");
      setLastName2("");
      setAdress("");
      setEmail("");
      setPassword("");
    }
  };
  return (
    <div className="user-profile-container">
      <h1 className="user-profile-title">Mi perfil</h1>
      <form className="form-user-profile" onSubmit={handleUserProfile}>
        <input
          type="text"
          placeholder="  Nombre"
          value={name}
          onChange={handleChangeName}
        ></input>
        <input
          type="text"
          placeholder="  Primer apellido"
          value={lastName1}
          onChange={handleChangeLastName1}
        ></input>
        <input
          type="text"
          placeholder="  Segundo apellido"
          value={lastName2}
          onChange={handleChangeLastName2}
        ></input>
        <input
          type="text"
          placeholder="  Direccion"
          value={address}
          onChange={handleChangeAdress}
        ></input>
        <input
          type="email"
          placeholder="  Email"
          value={email}
          onChange={handleChangeEmail}
        ></input>
        <input
          type="password"
          placeholder="  Password"
          value={password}
          onChange={handleChangePassword}
        ></input>
        <div className="user-profile-button-container">
          <button type="submit" className="user-profile-button">
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
