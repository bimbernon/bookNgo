import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../../components/providers/AuthProvider";
import { User } from "../../components/main/User/User";
import Swal from "sweetalert2";
import "./Administration.css";

function AdministrationUsersPage() {
  const [token] = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [, setErrorMsg] = useState("");

  useEffect(() => {
    async function getAllUsers() {
      const usersResponse = await fetch(`http://localhost:3080/api/v1/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (usersResponse.ok) {
        const usersData = await usersResponse.json();
        setUsers(usersData);
      } else {
        await usersResponse.json();
        setErrorMsg("Algo ha salido mal...");
      }
    }
    getAllUsers();
  }, []);

  const deleteUserById = async (e) => {
    e.preventDefault();
    console.log("ay dios", e.target.value);

    const userDeleteResponse = await fetch(
      `http://localhost:3080/api/v1/users/delete/${e.target.value}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (userDeleteResponse.ok) {
      setUsers(
        users.filter((user) => user.idusuario !== parseInt(e.target.value))
      );
      Swal.fire(
        "¡Eliminado!",
        "El perfil se ha eliminado con exito.",
        "success"
      );
    } else {
      const errorResponse = await userDeleteResponse.json();
      Swal.fire("Eliminar Perfil!", "Error al eliminar el perfil", "error");
      setErrorMsg(errorResponse.error);
    }
  };

  console.log(users);

  const renderUsers = (user) => (
    <User
      key={user.idusuario}
      userid={user.idusuario}
      userName={user.nombreusuario}
      userProfileName={user.nombreperfilusuario}
      userLastname1={user.apel1}
      userLastname2={user.apel2}
      userEmail={user.email}
      userPurse={user.monedero}
      value={user.idusuario}
      onDeleteUser={deleteUserById}
    ></User>
  );

  if (!token) return <Redirect to="/" />;

  return (
    <div>
      <Link to={`/administration`}>
        <img src={`/icons/back.png`} height="30" width="30" alt="Botón" />
      </Link>
      <ul className="users-list">{users.map(renderUsers)}</ul>
    </div>
  );
}

export { AdministrationUsersPage };
