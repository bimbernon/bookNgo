import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../../providers/UserProvider";
import { AuthContext } from "../../../providers/AuthProvider";
import "./ModifyUserPasswordForm.css";

export const ModifyUserPasswordForm = () => {
  const [token] = useContext(AuthContext);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [selectedUser] = useContext(UserContext);

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
      setCurrentPassword("");
      setNewPassword("");
    }
  };

  return (
    <div className="user-profile-container">
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
