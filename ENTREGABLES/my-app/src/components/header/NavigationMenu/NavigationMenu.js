import React from "react";
import "./NavigationMenu.css";
import { Link } from "react-router-dom";

const NavigationMenu = () => {
  return (
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
  );
};

export { NavigationMenu };
