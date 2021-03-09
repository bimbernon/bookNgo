import React, { useContext } from "react";
import "./UserMenu.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../providers/UserProvider";

const UserMenu = () => {
  const [selectedUser] = useContext(UserContext);

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
          <li className="user-list-item-menu">ADMINISTRACION</li>
        </Link>
      </ul>
    </div>
  );
};
export { UserMenu };
