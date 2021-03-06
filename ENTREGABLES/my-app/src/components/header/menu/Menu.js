import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

const Menu = () => {
  return (
    <div className="session-nav-container">
      <ul className="session-nav">
        <li className="session-nav-item">
          <Link to="/users/register" className="navigation-link">
            <p>Regístrate</p>
            <div>
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                class="kirk-icon sc-fjdhpX hvLyfg"
                width="24"
                height="24"
                aria-hidden="true"
              >
                <polyline
                  fill="none"
                  stroke="#708C91"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  points="9 18 15 12 9 6"
                ></polyline>
              </svg>
            </div>
          </Link>
        </li>
        <li className="session-nav-item">
          <Link to="/users/login" className="navigation-link">
            Inicia sesión
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              class="kirk-icon sc-fjdhpX hvLyfg"
              width="24"
              height="24"
              aria-hidden="true"
            >
              <polyline
                fill="none"
                stroke="#708C91"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                points="9 18 15 12 9 6"
              ></polyline>
            </svg>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
