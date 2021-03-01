import React from "react";
import { NavigationMenu } from "../NavigationMenu/NavigationMenu";
import "./HeaderContainer.css";

const HeaderContainer = () => {
  return (
    <div className="headerContainer">
      <img
        src="/logosProyecto/logoPrincipal/logo/logo.svg"
        alt="logo"
        className="logo"
      />
      <NavigationMenu />
    </div>
  );
};

export { HeaderContainer };
