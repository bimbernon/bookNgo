import React, { useContext, useEffect, useState } from "react";
import "./NavigationMenu.css";
import { Avatar } from "../Avatar/Avatar";
import { Menu } from "../Menu/Menu";
import { AuthContext } from "../../providers/AuthProvider";
import { UserContext } from "../../providers/UserProvider";

const NavigationMenu = () => {
  const [token] = useContext(AuthContext);
  const [selectedUser] = useContext(UserContext);

  const Navigation = (props) => {
    const { imageId, activeMenu } = props;
    const [userProfile, setUserProfile] = useState({});

    useEffect(() => {
      async function getUserProfile() {
        const userResponse = await (
          await fetch(
            `http://localhost:3080/api/v1/users/profile/${selectedUser.idusuario}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
        ).json();
        setUserProfile(userResponse);
      }
      token && getUserProfile();
    }, []);

    const WelcomeMsg = !token ? (
      <>
        <div>
          <nav className="navigation-menu">
            <ul className="navigation-menu-list">
              <li className="navigation-menu-item">¡Hola, Booker!</li>
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
    ) : (
      <>
        <div>
          <nav className="navigation-menu">
            <ul className="navigation-menu-list">
              <li className="navigation-menu-item">
                ¡Hola {userProfile.nombreusuario}!
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
    return WelcomeMsg;
  };

  const navigation = token ? (
    <Navigation imageId={selectedUser.idusuario} activeMenu={false} />
  ) : (
    <Navigation imageId={0} activeMenu={true} />
  );
  return navigation;
};

export { NavigationMenu };
