import React from "react";
import "./NavigationMenu.css";
import { Link } from "react-router-dom";

const NavigationMenu = () => {
  return (
    <div>
      <nav className="navigationMenu">
        <ul className="navigationList">
          <li>
            <Link to="/donations" className="navigation-link">
              Dona tus libros
            </Link>
          </li>
          <li>
            <Link to="/users/register" className="navigation-link">
              Regístrate
            </Link>
          </li>
          <li>
            <Link to="/users/login" className="navigation-link">
              Inicia sesión
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export { NavigationMenu };
