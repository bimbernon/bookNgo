import React from "react";
import "./NavigationMenu.css";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import Menu from "../menu/Menu";

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
                </button>
              <Menu>
              </Menu>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export { NavigationMenu };
