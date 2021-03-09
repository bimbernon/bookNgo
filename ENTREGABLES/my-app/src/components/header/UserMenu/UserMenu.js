import React, { useContext } from "react";
import "./UserMenu.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const UserMenu = () => {
  const [token] = useContext(AuthContext);
  let activeUserMenu;
  const isToken = !token ? (activeUserMenu = false) : (activeUserMenu = true);

  const UserMenuReturn =
    activeUserMenu === true ? (
      <div className="user-menu-container">
        <ul className="user-list-menu">
          <Link to="/users/profile/:userId">
            <li className="user-list-item-menu">Mi Perfil</li>
          </Link>
          <Link to="/reserves/:userId">
            <li className="user-list-item-menu">Mis Reservas</li>
          </Link>
          <Link to="/users/purse/:userId">
            <li className="user-list-item-menu">Monedero</li>
          </Link>
          <Link to="/administration">
            <li className="user-list-item-menu">ADMINISTRACION</li>
          </Link>
        </ul>
      </div>
    ) : (
      <></>
    );
  return UserMenuReturn;
};
export default UserMenu;
