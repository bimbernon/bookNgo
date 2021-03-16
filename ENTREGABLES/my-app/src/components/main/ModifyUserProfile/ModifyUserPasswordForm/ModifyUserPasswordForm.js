import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../providers/UserProvider";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";
import "./ModifyUserPasswordForm.css";

export const ModifyUserPasswordForm = () => {
  const [token] = useContext(AuthContext);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [selectedUser] = useContext(UserContext);
  const [errorMsg, setErrorMsg] = useState("");
  console.log(currentPassword, newPassword);

  const handleChangeNewPassword = (e) => setNewPassword(e.target.value);
  const handleChangeCurrentPassword = (e) => setCurrentPassword(e.target.value);

  const handleUserProfile = async (e) => {
    e.preventDefault();

    console.log("ssss");

    const uploadUserPasswordResponse = await fetch(
      ` http://localhost:3080/api/v1/users/updatePassword/${selectedUser.idusuario}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          password: currentPassword,
          newPassword: newPassword,
        }),
      }
    );

    if (uploadUserPasswordResponse.ok) {
      await uploadUserPasswordResponse.json();
      if (currentPassword !== newPassword) {
        setCurrentPassword("");
        setNewPassword("");
      } else {
        Swal.fire({
          icon: "error",
          title: "¡Ooops!",
          text: "La contraseña introducida no puede ser igual a la anterior.",
        });
      }
    }
  };

  return (
    <div className="user-profile-container">
      <Link to={`/users/profile/${selectedUser.idusuario}`}>
        <img src={`/icons/back.png`} height="30" width="30" alt="Botón" />
      </Link>
      <h1 className="user-profile-title">Modificar contraseña</h1>
      <form className="form-user-profile" onSubmit={handleUserProfile}>
        <div className="input-user-modify-form-container">
          <h2 className="input-user-modify-form-title">Contraseña actual:</h2>
          <input
            type="password"
            placeholder="  **********"
            value={currentPassword}
            onChange={handleChangeCurrentPassword}
            className="input-user-modify-form"
          />
        </div>
        <div className="input-user-modify-form-container">
          <h2 className="input-user-modify-form-title">Nueva contraseña:</h2>
          <input
            type="password"
            placeholder="  **********"
            value={newPassword}
            onChange={handleChangeNewPassword}
            className="input-user-modify-form"
          />
          <p>{errorMsg}</p>
        </div>
        <div className="user-profile-button-container">
          <button type="submit" className="user-profile-button">
            ACTUALIZAR
          </button>
        </div>
      </form>
    </div>
  );
};
