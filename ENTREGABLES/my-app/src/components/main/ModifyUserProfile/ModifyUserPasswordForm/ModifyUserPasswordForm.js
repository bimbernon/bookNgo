import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { UserContext } from "../../../providers/UserProvider";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";
import "./ModifyUserPasswordForm.css";

export const ModifyUserPasswordForm = () => {
  const [token] = useContext(AuthContext);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [selectedUser] = useContext(UserContext);
  const [errorMessage, setErrorMsg] = useState(null);

  const handleChangeNewPassword = (e) => setNewPassword(e.target.value);
  const handleChangeCurrentPassword = (e) => setCurrentPassword(e.target.value);

  const handleUserProfile = async (e) => {
    e.preventDefault();

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
        Swal.fire({
          icon: "success",
          title: "¡Enhorabuena!",
          text: "Tu contraseña ha sido modificada con éxito.",
        });
        setCurrentPassword("");
        setNewPassword("");
        setErrorMsg("");
      } else {
        Swal.fire({
          icon: "error",
          title: "¡Ooops!",
          text: "La contraseña introducida no puede ser igual a la anterior.",
        });
      }
    } else {
      const errorResponse = await uploadUserPasswordResponse.json();
      setErrorMsg(errorResponse.error);
      Swal.fire({
        icon: "error",
        title: "¡Ooops!",
        text: errorResponse.error,
      });
    }
  };

  if (errorMessage === "")
    return <Redirect to={`/users/profile/${selectedUser.idusuario}`} />;

  return (
    <div className="user-profile-container">
      <Link to={`/users/profile/${selectedUser.idusuario}`}>
        <img
          src={`/icons/back.png`}
          height="30"
          width="30"
          alt="Botón"
          style={{ right: "9rem", top: "1rem", position: "relative" }}
        />
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
