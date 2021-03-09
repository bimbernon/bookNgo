import React, { useEffect, useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import "./Profile.css";

const Profile = () => {
  const [token] = useContext(AuthContext);
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

  return (
    <>
      <h1>{`Hola, ${userProfile.nombreusuario}`}</h1>
      <div className="user-info-item">
        Nombre:
        <p>{`${userProfile.nombreusuario} ${userProfile.apel1} ${userProfile.apel2}`}</p>
      </div>
      <div className="user-info-item">
        Dirección:
        <p>{userProfile.direccion}</p>
      </div>
      <div className="user-info-item">
        Nombre de perfil:
        <p>{userProfile.nombreperfilusuario}</p>
      </div>
      <div className="user-info-item">
        Email:
        <p>{userProfile.email}</p>
        <Link to={`/users/profile/modify/${userId}`}>
          <button>MODIFICAR</button>
        </Link>
      </div>
    </>
  );
};

export { Profile };
