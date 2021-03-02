import React from "react";
import "./NavigationMenu.css";
import { Link, Switch, Route } from "react-router-dom";
import { Donations } from "../../../pages/donations";

const NavigationMenu = () => {
  return (
    <div>
      <nav className="navigationMenu">
        <ul className="navigationList">
          <li>
            <Link to="/donations" className="link">
              Dona tus libros
            </Link>
          </li>
          <li>
            <Link to="/users/register" className="link">
              Regístrate
            </Link>
          </li>
          <li>
            <Link to="/users/login" className="link">
              Inicia sesión
            </Link>
          </li>
        </ul>
      </nav>

    </div> 
  );
};

export { NavigationMenu };
