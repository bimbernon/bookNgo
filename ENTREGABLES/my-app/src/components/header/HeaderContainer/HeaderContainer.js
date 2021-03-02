import React from "react";
import { BookBrowser } from "../BooksBrowser/BooksBrowser";
import { NavigationMenu } from "../NavigationMenu/NavigationMenu";
import "./HeaderContainer.css";

const HeaderContainer = () => {
  return (
    <div className="header-container">
      <div className="header-items">
        <img
          src="/logosProyecto/logoPrincipal/logo/logo.svg"
          alt="logo"
          className="ppal-logo"
        />
        <NavigationMenu />
      </div>
      <div className="browser-container">
        <BookBrowser />
      </div>
    </div>
  );
};

export { HeaderContainer };
