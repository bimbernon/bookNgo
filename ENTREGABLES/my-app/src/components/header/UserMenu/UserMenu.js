import React, { useContext } from "react";
import "./UserMenu.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../providers/UserProvider";
import { AuthContext } from "../../providers/AuthProvider";

const UserMenu = () => {
  const [selectedUser, setSelectedUser] = useContext(UserContext);
  const [token, setToken] = useContext(AuthContext);

  if (selectedUser.admin === 1) {
    return (
      <div className="user-menu-container">
        <ul className="user-list-menu">
          <Link to={`/users/profile/${selectedUser.idusuario}`}>
            <li className="user-list-item-menu">Mi Perfil</li>
          </Link>
          <Link to={`/reserves/${selectedUser.idusuario}`}>
            <li className="user-list-item-menu">Mis Reservas</li>
          </Link>
          <Link to={`/users/purse/${selectedUser.idusuario}`}>
            <li className="user-list-item-menu">Monedero</li>
          </Link>
          <Link to="/administration">
            <li className="user-list-item-menu">Administracion</li>
          </Link>
          <button
            onClick={() => {
              setSelectedUser(null);
              setToken(null);
            }}
          >
            Log-fucking-out
          </button>
          <img
            className="close-menu-button"
            src="/icons/aspa.png"
            alt="aspa"
          ></img>
        </ul>
      </div>
    );
  } else {
    return (
      <div className="user-menu-container">
        <ul className="user-list-menu-administration">
          <Link
            to={`/users/profile/${selectedUser.idusuario}`}
            classname="ul-first-child"
          >
            <li className="user-list-item-menu">Mi Perfil</li>
          </Link>
          <Link to={`/reserves/${selectedUser.idusuario}`}>
            <li className="user-list-item-menu">Mis Reservas</li>
          </Link>
          <Link to={`/users/purse/${selectedUser.idusuario}`}>
            <li className="user-list-item-menu">Monedero</li>
          </Link>
          <button
            onClick={() => {
              setSelectedUser(null);
              setToken(null);
            }}
          >
            Log-fucking-out
          </button>
          <img
            className="close-menu-button"
            src="/icons/aspa.png"
            alt="aspa"
          ></img>
        </ul>
      </div>
    );
  }
};
export { UserMenu };
