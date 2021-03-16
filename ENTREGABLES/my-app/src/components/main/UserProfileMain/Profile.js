import React, { useEffect, useContext, useState } from "react";

import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { UserContext } from "../../providers/UserProvider";
import { useParams } from "react-router-dom";
import { Avatar } from "../../header/Avatar/Avatar";
import Swal from "sweetalert2";
import "./Profile.css";

const Profile = () => {
  const { userId } = useParams();
  const [token, setToken] = useContext(AuthContext);
  const [selectedUser, setSelectedUser] = useContext(UserContext);
  const [userProfile, setUserProfile] = useState({});
  const [errorMsg, setErrorMsg] = useState("");

  const handleDelete = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "¿Estás seguro de que quieres eliminar tu cuenta?",
      text: "¡El perfil no se recuperará!",
      icon: "warning",
      showCancelButton: true,
      fontSize: "2rem",
      confirmButtonColor: "#e1b470",
      cancelButtonColor: "#ec511d",
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUserById();
        // Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  useEffect(() => {
    async function getUserProfile() {
      const userResponse = await (
        await fetch(`http://localhost:3080/api/v1/users/profile/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      ).json();

      token && setUserProfile(userResponse);
    }
    token && getUserProfile();
  }, [userId, token]);

  const sytle = {
    // backgroundImage: `url("/images/users/${userId}.jpg")`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    border: "7px solid  #cc9966",
    borderRadius: "50rem",
    boxShadow: "5px 5px 5px rgb(58, 55, 55",
    width: "7rem",
    height: "7rem",
  };

  const deleteUserById = async (e) => {
    console.log("se ejecuta la funcion");
    const userResponse = await fetch(
      `http://localhost:3080/api/v1/users/delete/${userProfile.idusuario}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (userResponse.ok) {
      await userResponse.json();

      Swal.fire(
        "Eliminado!",
        "El perfil se ha eliminado con exito.",
        "success"
      );
      setToken("");
      setSelectedUser({});
    } else {
      const errorResponse = await userResponse.json();
      Swal.fire("Eliminar Perfil!", "Error al eliminar el perfil", "error");
      setErrorMsg(errorResponse.error);
    }
  };

  const onFileChange = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];

    const data = new FormData();
    data.append("userImage", file);

    await fetch(
      `http://localhost:3080/api/v1/users/image/upload/${selectedUser.idusuario}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }
    );
    // if (!imageResponse.ok) {
    //   const error = await imageResponse.json();
    //   console.error(error);
    // }
  };

  // const style = {
  //   backgroundImage: `url("/icons/upload-photo.png" )`,
  //   backgroundSize: "cover",
  //   width: "2rem",
  //   height: "2rem",
  // };
  if (!token) return <Redirect to="/" />;

  return (
    <>
      <h1>{`Hola, ${userProfile.nombreusuario}`}</h1>

      <div className="user-image-profile" alt="user">
        <form className="upload-photo-form">
          <Avatar imageId={userProfile.idusuario} styleAux={sytle} />
          <div className="upload-photo-input-container">
            <label htmlFor="upload-photo-input" className="photo-logo">
              <img
                src="/icons/white-camera.png"
                alt="uploadphoto"
                style={{
                  height: "1.6rem",
                  width: "2rem",
                  backgroundColor: "#cc9966",
                }}
              />

              <input
                type="file"
                id="upload-photo-input"
                onChange={onFileChange}
                style={{ display: "none" }}
              />
            </label>
          </div>
        </form>
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
            src="/icons/edit-blue-square-pen.png"
            alt="edit"
            style={{
              height: "2.5rem",
              width: "2.5rem",
              padding: "0.2rem 1.5rem",
            }}
          />
        </Link>
        <Link to={`/user/updatePassword/${selectedUser.idusuario}`}>
          <img
            src="/icons/edit-password-lock.jpg"
            alt="borrar"
            style={{
              height: "4rem",
              width: "4rem",
              padding: "0.5rem 1.4rem",
              marginTop: "0.3rem",
            }}
          />
        </Link>
        <form className="delete-user-form" onSubmit={handleDelete}>
          <button className="delete-user-button" type="submit">
            <img
              src="/icons/delete-red-button.png"
              alt="borrar"
              style={{
                height: "2.5rem",
                width: "2.5rem",
                padding: "0.7rem 1rem",
              }}
            />
          </button>
        </form>
      </div>
    </>
  );
};

export { Profile };
