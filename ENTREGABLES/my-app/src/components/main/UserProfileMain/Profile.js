import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { UserContext } from "../../providers/UserProvider";
import { useParams } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const [token] = useContext(AuthContext);
  const [selectedUser] = useContext(UserContext);
  const [userProfile, setUserProfile] = useState({});
  let { userId } = useParams();

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

  const sytle = {
    backgroundImage: `url("/images/users/${userId}.jpg")`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    border: "1px solid black",
    borderRadius: "1rem",
    boxShadow: "5px 5px 5px rgb(58, 55, 55",
    width: "7rem",
    height: "9rem",
  };

  return (
    <>
      <h1>{`Hola, ${userProfile.nombreusuario}`}</h1>
      <div className="user-image-profile" style={sytle} alt="user"></div>
      <div className="user-info-item">
        <h3 className="user-item-title">Nombre:</h3>
        <p>{`  ${userProfile.nombreusuario} ${userProfile.apel1} ${userProfile.apel2}`}</p>
      </div>
      <div className="user-info-item">
        <h3 className="user-item-title">Dirección:</h3>
        <p>{userProfile.direccion}</p>
      </div>
      <div className="user-info-item">
        <h3 className="user-item-title">Nombre de perfil:</h3>
        <p>{userProfile.nombreperfilusuario}</p>
      </div>
      <div className="user-info-item">
        <h3 className="user-item-title">Email:</h3>
        <p>{userProfile.email}</p>
      </div>
      <div className="modify-buttons-container">
        <Link
          to={`/user/profile/modify/modifyProfile/${selectedUser.idusuario}`}
        >
          <button className="modify-user-info-button">MODIFICAR PERFIL</button>
        </Link>
        <Link to={`/user/profile/modify/${selectedUser.idusuario}`}>
          <button className="modify-user-password-button">
            CAMBIAR CONTRASEÑA
          </button>
        </Link>
      </div>
    </>
  );
};

export { Profile };
