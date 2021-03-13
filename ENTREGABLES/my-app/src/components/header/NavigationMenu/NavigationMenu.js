import React, { useContext } from "react";
import "./NavigationMenu.css";
import { Link } from "react-router-dom";
import { Avatar } from "../Avatar/Avatar";
import { Menu } from "../Menu/Menu";
import { AuthContext } from "../../providers/AuthProvider";
import { UserContext } from "../../providers/UserProvider";

const NavigationMenu = () => {
  const Navigation = (props) => {
    const { imageId, activeMenu } = props;
    return (
      <>
        <div>
          <nav className="navigation-menu">
            <ul className="navigation-menu-list">
              <li className="navigation-menu-item">
                <Link to="/donations/create" className="navigation-link">
                  Dona tus libros
                </Link>
              </li>
              <li className="navigation-menu-item">
                <button className="avatar-button">
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

  const [token] = useContext(AuthContext);
  const [selectedUser] = useContext(UserContext);

  const navigation = token ? (
    <Navigation imageId={selectedUser.idusuario} activeMenu={false} />
  ) : (
    <Navigation imageId={0} activeMenu={true} />
  );
  return navigation;
};

export { NavigationMenu };
