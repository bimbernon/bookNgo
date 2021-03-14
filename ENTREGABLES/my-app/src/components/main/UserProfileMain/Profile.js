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
  const [errorMsg, setErrorMsg] = useState("");

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
    // backgroundImage: `url("/images/users/${userId}.jpg")`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    // border: "1px solid black",
    borderRadius: "50rem",
    boxShadow: "5px 5px 5px rgb(58, 55, 55",
    width: "7rem",
    height: "7rem",
  };

  const deleteUserById = async (e) => {
    // e.preventDefault();

    const userResponse = await fetch(
      `http://localhost:3080/api/v1/users/delete/${userProfile.idusuario}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (userResponse.ok) {
      await userResponse.json();
    } else {
      const errorMsg = await userResponse.json();
      setErrorMsg("Algo ha salido mal...");
    }
  };
  deleteUserById();

  return (
    <>
      <h1>{`Hola, ${userProfile.nombreusuario}`}</h1>

      <div className="user-image-profile" alt="user">
        <img src={`/images/users/${userId}.jpg`} alt="user" style={sytle} />
      </div>
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
          <img
            src="/icons/edit.png"
            alt="borrar"
            style={{ height: "2.5rem", width: "2.5rem" }}
          />
        </Link>
        <Link to={`/user/updatePassword/${selectedUser.idusuario}`}>
          <img
            src="/icons/changepassword.png"
            alt="borrar"
            style={{ height: "3rem", width: "3rem" }}
          />
        </Link>
        <form className="delete-user-form">
          <button className="delete-user-button" onClick={deleteUserById}>
            <img
              src="/icons/delete.png"
              alt="borrar"
              style={{ height: "2.5rem", width: "2.5rem" }}
            />
          </button>
        </form>
      </div>
    </>
  );
};

export { Profile };
