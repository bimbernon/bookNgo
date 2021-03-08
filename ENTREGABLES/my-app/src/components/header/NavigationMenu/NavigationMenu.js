import React, { useContext } from "react";
import "./NavigationMenu.css";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import Menu from "../menu/Menu";
import { AuthContext } from "../../providers/AuthProvider";

const NavigationMenu = () => {
  const Navigation = (props) => {
    const { imageId, activeMenu } = props;
    return (
      <>
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
                  <Avatar imageId={imageId} />
                </button>
                <Menu activeMenu={activeMenu} />
              </li>
            </ul>
          </nav>
        </div>
      </>
    );
  };

  const [token, setToken] = useContext(AuthContext);

  const navigation = token ? (
    <Navigation imageId={1} activeMenu={false}></Navigation>
  ) : (
    <Navigation imageId={4} activeMenu={true}></Navigation>
  );
  return navigation;
};

export { NavigationMenu };
