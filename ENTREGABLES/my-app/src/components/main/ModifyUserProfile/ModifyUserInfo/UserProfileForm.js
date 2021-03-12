import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../../providers/UserProvider";
import { AuthContext } from "../../../providers/AuthProvider";
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
  const [selectedUser] = useContext(UserContext);

  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeLastName1 = (e) => setLastName1(e.target.value);
  const handleChangeAdress = (e) => setAdress(e.target.value);
  const handleChangeLastName2 = (e) => setLastName2(e.target.value);
  const handleChangeEmail = (e) => setEmail(e.target.value);

  const handleUserProfile = async (e) => {
    e.preventDefault();

    const uploadUserProfileResponse = await fetch(
      ` http://localhost:3080/api/v1/users/update/${selectedUser.idusuario}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...userProfile,
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
  };

  return (
    <div className="user-profile-container">
      <h1 className="user-profile-title">Modificar mis datos</h1>
      <form className="form-user-profile" onSubmit={handleUserProfile}>
        <div className="input-user-modify-form-container">
          <h2 className="input-user-modify-form-title">Nombre: </h2>
          <input
            type="text"
            value={`   ${userProfile.nombreusuario}`}
            onChange={handleChangeName}
            className="input-user-modify-form"
          />
        </div>
        <div className="input-user-modify-form-container">
          <h2 className="input-user-modify-form-title">Primer apellido:</h2>
          <input
            type="text"
            value={`   ${userProfile.apel1}`}
            onChange={handleChangeLastName1}
            className="input-user-modify-form"
          />
        </div>
        <div className="input-user-modify-form-container">
          <h2 className="input-user-modify-form-title">Segundo apellido:</h2>
          <input
            type="text"
            value={`   ${userProfile.apel2}`}
            onChange={handleChangeLastName2}
            className="input-user-modify-form"
          />
        </div>
        <div className="input-user-modify-form-container">
          <h2 className="input-user-modify-form-title">Dirección:</h2>
          <input
            type="text"
            value={`   ${userProfile.direccion}`}
            onChange={handleChangeAdress}
            className="input-user-modify-form"
          />
        </div>
        <div className="input-user-modify-form-container">
          <h2 className="input-user-modify-form-title">Email:</h2>
          <input
            type="email"
            value={`   ${userProfile.email}`}
            onChange={handleChangeEmail}
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
