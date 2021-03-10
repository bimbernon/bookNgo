import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../providers/UserProvider";
import { AuthContext } from "../../providers/AuthProvider";
import "./UserProfileForm.css";

export const UserProfileForm = () => {
  const [userProfile, setUserProfile] = useState({});
  const [token] = useContext(AuthContext);

  useEffect(() => {
    async function getUserProfile() {
      const userResponse = await (
        await fetch(
          `http://localhost:3080/api/v1/users/profile/${selectedUser.idusuario}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
      ).json();
      setUserProfile(userResponse);
    }
    getUserProfile();
  }, []);

  const [name, setName] = useState("");
  const [lastName1, setLastName1] = useState("");
  const [lastName2, setLastName2] = useState("");
  const [address, setAdress] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [selectedUser] = useContext(UserContext);

  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeLastName1 = (e) => setLastName1(e.target.value);
  const handleChangeAdress = (e) => setAdress(e.target.value);
  const handleChangeLastName2 = (e) => setLastName2(e.target.value);
  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangeNewPassword = (e) => setNewPassword(e.target.value);
  const handleChangeCurrentPassword = (e) => setCurrentPassword(e.target.value);

  const handleUserProfile = async (e) => {
    e.preventDefault();

    const {
      name,
      lastName1,
      lastName2,
      address,
      email,
      currentPassword,
    } = userProfile;

    const uploadUserProfileResponse = await fetch(
      ` http://localhost:3080/api/v1/users/update/${selectedUser.idusuario}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({coge lo que venga del body}),
      }
    );

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

    if (uploadUserProfileResponse.ok) {
      await uploadUserProfileResponse.json();
      setName("");
      setLastName1("");
      setLastName2("");
      setAdress("");
      setEmail("");
    }

    if (uploadUserPasswordResponse.ok) {
      await uploadUserPasswordResponse.json();
      setCurrentPassword("");
      setNewPassword("");
    }

    console.log(currentPassword);
    console.log(newPassword);
  };

  return (
    <div className="user-profile-container">
      <h1 className="user-profile-title">Mi perfil</h1>
      <form className="form-user-profile" onSubmit={handleUserProfile}>
        <div className="input-user-modify-form-container">
          <h2 className="input-user-modify-form-title">Nombre: </h2>
          <input
            type="text"
            placeholder={`   ${userProfile.nombreusuario}`}
            value={name}
            onChange={handleChangeName}
            className="input-user-modify-form"
          />
        </div>
        <div className="input-user-modify-form-container">
          <h2 className="input-user-modify-form-title">Primer apellido:</h2>
          <input
            type="text"
            placeholder={`   ${userProfile.apel1}`}
            value={lastName1}
            onChange={handleChangeLastName1}
            className="input-user-modify-form"
          />
        </div>
        <div className="input-user-modify-form-container">
          <h2 className="input-user-modify-form-title">Segundo apellido:</h2>
          <input
            type="text"
            placeholder={`   ${userProfile.apel2}`}
            value={lastName2}
            onChange={handleChangeLastName2}
            className="input-user-modify-form"
          />
        </div>
        <div className="input-user-modify-form-container">
          <h2 className="input-user-modify-form-title">Dirección:</h2>
          <input
            type="text"
            placeholder={`   ${userProfile.direccion}`}
            value={address}
            onChange={handleChangeAdress}
            className="input-user-modify-form"
          />
        </div>
        <div className="input-user-modify-form-container">
          <h2 className="input-user-modify-form-title">Email:</h2>
          <input
            type="email"
            placeholder={`   ${userProfile.email}`}
            value={email}
            onChange={handleChangeEmail}
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
