import React, { useEffect, useContext, useState } from "react";

import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { UserContext } from "../../providers/UserProvider";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "./Profile.css";

const Profile = () => {
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

  let { userId } = useParams();

  useEffect(() => {
    console.log(userProfile.nombreusuario);
    async function getUserProfile() {
      const userResponse = await (
        await fetch(`http://localhost:3080/api/v1/users/profile/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      ).json();
      setUserProfile(userResponse);
      console.log(userProfile.nombreusuario);
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
      const errorMsg = await userResponse.json();
      Swal.fire("Eliminar Perfil!", "Error al eliminar el perfil", "error");
      setErrorMsg("Algo ha salido mal...");
    }
  };

  const [file, setFile] = useState();
  //esta funcion
  async function uploadFile(e) {
    e.preventDefault();
    let data = new FormData();
    data.append("userImage", file);
    const imageResponse = await fetch(
      `http://localhost:3080/api/v1/users/image/upload/${selectedUser.idusuario}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }
    );
    if (imageResponse.ok) {
      const imageData = imageResponse.json();
    }
  }

  const onFileChange = (e) => {
    const f = e.target.files[0];
    setFile(f);
  };

  // const style = {
  //   backgroundImage: `url("/icons/upload-photo.png" )`,
  //   backgroundSize: "cover",
  //   width: "2rem",
  //   height: "2rem",
  // };

  return (
    <>
      <h1>{`Hola, ${userProfile.nombreusuario}`}</h1>

      <div className="user-image-profile" alt="user">
        <form className="upload-photo-form" onSubmit={uploadFile}>
          <img src={`/images/users/${userId}.jpg`} alt="user" style={sytle} />
          <input
            type="file"
            className="upload-photo-input"
            onChange={onFileChange}
            // style={style}
          />
          {/* <img src="/icons/upload-photo.png" alt="upload"></img> */}

          <button classNAme="upload-user-button" type="submit">
            <img
              src="/icons/upload-photo.png"
              alt="borrar"
              style={{ height: "1.8rem", width: "1.8rem" }}
            />
          </button>
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
        <form className="delete-user-form" onSubmit={handleDelete}>
          <button className="delete-user-button" type="submit">
            <img
              src="/icons/delete.png"
              alt="borrar"
              style={{ height: "2.5rem", width: "2.5rem" }}
            />
          </button>
          {token === "" && <Redirect to="/" />}
        </form>
      </div>
    </>
  );
};

export { Profile };
