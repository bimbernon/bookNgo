import { Link } from "react-router-dom";
import { BookBrowser } from "../BooksBrowser/BooksBrowser";
import { NavigationMenu } from "../NavigationMenu/NavigationMenu";
import "./HeaderContainer.css";

const HeaderContainer = () => {
  return (
    <div className="header-container">
      <div className="header-items">
        <Link to="/" className="ppal-logo">
          <img src="/logosProyecto/logoPrincipal/logo/logo.svg" alt="logo" />
        </Link>
        <NavigationMenu />
      </div>
      <BookBrowser />
    </div>
  );
};

export { HeaderContainer };
