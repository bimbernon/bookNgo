import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { UserContext } from "../../providers/UserProvider";
import "./Profile.css";

const Profile = () => {
  const [token] = useContext(AuthContext);
  const [selectedUser] = useContext(UserContext);
  const [userProfile, setUserProfile] = useState({});

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

  const sytle = {
    backgroundImage: `url("/images/users/${selectedUser.idusuario}.jpg")`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    border: '1px solid black',
    borderRadius: '1rem',
    boxShadow: '5px 5px 5px rgb(58, 55, 55',
    width: "7rem",
    height: "9rem",
  };

  return (
    <>
      <h1>{`Hola, ${userProfile.nombreusuario}`}</h1>
      <div className="user-image-profile" style={sytle} alt="user"></div>
      <div className="user-info-item">
        <h3>Nombre:</h3>
        <p>{`  ${userProfile.nombreusuario} ${userProfile.apel1} ${userProfile.apel2}`}</p>
      </div>
      <div className="user-info-item">
        <h3>Dirección:</h3>
        <p>{userProfile.direccion}</p>
      </div>
      <div className="user-info-item">
        <h3>Nombre de perfil:</h3>
        <p>{userProfile.nombreperfilusuario}</p>
      </div>
      <div className="user-info-item">
        <h3>Email:</h3>
        <p>{userProfile.email}</p>
      </div>
      <Link to={`/user/profile/modify/modifyProfile/${selectedUser.idusuario}`}>
        <button className="user-info-button">MODIFICAR</button>
      </Link>
    </>
  );
};

export { Profile };