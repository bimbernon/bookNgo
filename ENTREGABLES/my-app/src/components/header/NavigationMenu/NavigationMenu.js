import React from "react";
import "./NavigationMenu.css";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import Menu from "../menu/Menu";

const NavigationMenu = () => {
  return (
    <div>
      <nav className="navigation-menu">
        <ul className="navigation-menu-list">
          <li className="navigation-menu-item">
            <Link to="/donations" className="navigation-link">
              Dona tus libros
            </Link>
          </li>
          <li className="navigation-menu-item">
            <button>
              <Avatar imageId={4} />
            </button>
            <Menu />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export { NavigationMenu };
