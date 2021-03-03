import React from "react";
import "./NavigationMenu.css";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";

const NavigationMenu = () => {
  return (
    <div>
      <nav className="navigation-menu">
        <ul className="navigation-list">
          <li className="nav-item">
            <Link to="/donations" className="navigation-link">
              Dona tus libros
            </Link>
          </li>
          <li className="nav-item">
            <button>
              <Avatar imageId={4} />
              <ul className="session-nav">
                <li className="session-nav-item">
                  <Link to="/users/register" className="navigation-link">
                    Regístrate
                  </Link>
                </li>
                <li className="session-nav-item">
                  <Link to="/users/login" className="navigation-link">
                    Inicia sesión
                  </Link>
                </li>
              </ul>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export { NavigationMenu };
