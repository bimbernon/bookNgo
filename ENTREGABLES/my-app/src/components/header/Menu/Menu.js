import React from "react";
import { Link } from "react-router-dom";
import { UserMenu } from "../UserMenu/UserMenu";
import "./Menu.css";

const Menu = (props) => {
  const { activeMenu } = props;
  const menuReturn =
    activeMenu === true ? (
      <div className="session-nav-container">
        <ul className="session-nav">
          <li className="session-nav-item">
            <Link to="/users/register" className="navigation-menu-link">
              <p className="link-menu-title">Regístrate</p>
              <div>
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="kirk-icon sc-fjdhpX hvLyfg"
                  width="24"
                  height="24"
                  aria-hidden="true"
                >
                  <polyline
                    fill="none"
                    stroke="#708C91"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    points="9 18 15 12 9 6"
                  />
                </svg>
              </div>
            </Link>
          </li>
          <li className="session-nav-item">
            <Link to="/users/login" className="navigation-menu-link">
              Inicia sesión
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="kirk-icon sc-fjdhpX hvLyfg"
                width="24"
                height="24"
                aria-hidden="true"
              >
                <polyline
                  fill="none"
                  stroke="#708C91"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  points="9 18 15 12 9 6"
                ></polyline>
              </svg>
            </Link>
          </li>
        </ul>
      </div>
    ) : (
      <UserMenu />
    );
  return menuReturn;
};

export { Menu };
