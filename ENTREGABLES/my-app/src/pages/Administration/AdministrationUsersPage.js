import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../components/providers/AuthProvider";
import { User } from "../../components/main/User/User";
import "./Administration.css";

function AdministrationUsersPage() {
  const [token] = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function getAllUsers() {
      const usersResponse = await fetch(`http://localhost:3080/api/v1/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (usersResponse.ok) {
        const usersData = await usersResponse.json();
        setUsers(usersData);
      } else {
        const errorMsg = await usersResponse.json();
        setErrorMsg("Algo ha salido mal...");
      }
    }
    getAllUsers();
  }, []);
  console.log(users);

  const renderUsers = (user) => (
    <Link to={`/users/profile/${user.idusuario}`}>
      <User
        key={user.idusuario}
        userName={user.nombreusuario}
        userProfileName={user.nombreperfilusuario}
        userLastname1={user.apel1}
        userLastname2={user.apel2}
        userEmail={user.email}
        userPurse={user.monedero}
      />
    </Link>
  );

  return (
    <div>
      <ul className="users-list">{users.map(renderUsers)}</ul>
    </div>
  );
}

export { AdministrationUsersPage };
