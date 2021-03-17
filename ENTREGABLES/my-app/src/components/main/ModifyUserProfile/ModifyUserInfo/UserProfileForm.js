import React, { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../../providers/UserProvider";
import { AuthContext } from "../../../providers/AuthProvider";
import "./UserProfileForm.css";

export const UserProfileForm = () => {
  const [userProfile, setUserProfile] = useState({});
  const [token] = useContext(AuthContext);
  const { userId } = useParams();
  console.log(userId);

  useEffect(() => {
    async function getUserProfile() {
      const userResponse = await (
        await fetch(`http://localhost:3080/api/v1/users/profile/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      ).json();
      setUserProfile(userResponse);
    }
    getUserProfile();
  }, []);

  const [name, setName] = useState(userProfile.nombreusuario);
  const [lastName1, setLastName1] = useState(userProfile.apel1);
  const [lastName2, setLastName2] = useState(userProfile.apel2);
  const [address, setAdress] = useState(userProfile.direccion);
  const [selectedUser] = useContext(UserContext);

  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeLastName1 = (e) => setLastName1(e.target.value);
  const handleChangeAdress = (e) => setAdress(e.target.value);
  const handleChangeLastName2 = (e) => setLastName2(e.target.value);

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
          name: name,
          lastName1: lastName1,
          lastName2: lastName2,
          address: address,
        }),
      }
    );

    if (uploadUserProfileResponse.ok) {
      await uploadUserProfileResponse.json();
    }
  };

  return (
    <div className="user-profile-container">
      <Link to={`/users/profile/${selectedUser.idusuario}`}>
        <img src={`/icons/back.png`} height="30" width="30" alt="Botón" />
      </Link>
      <h1 className="user-profile-title">Modificar datos</h1>
      <form className="form-user-profile" onSubmit={handleUserProfile}>
        <div className="input-user-modify-form-container">
          <h2 className="input-user-modify-form-title">Nombre: </h2>
          <input
            type="text"
            value={name}
            placeholder={userProfile.nombreusuario}
            onChange={handleChangeName}
            className="input-user-modify-form"
          />
        </div>
        <div className="input-user-modify-form-container">
          <h2 className="input-user-modify-form-title">Primer apellido:</h2>
          <input
            type="text"
            value={lastName1}
            placeholder={userProfile.apel1}
            onChange={handleChangeLastName1}
            className="input-user-modify-form"
          />
        </div>
        <div className="input-user-modify-form-container">
          <h2 className="input-user-modify-form-title">Segundo apellido:</h2>
          <input
            type="text"
            value={lastName2}
            placeholder={userProfile.apel2}
            onChange={handleChangeLastName2}
            className="input-user-modify-form"
          />
        </div>
        <div className="input-user-modify-form-container">
          <h2 className="input-user-modify-form-title">Dirección:</h2>
          <input
            type="text"
            value={address}
            placeholder={userProfile.direccion}
            onChange={handleChangeAdress}
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
