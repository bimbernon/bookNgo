import React from "react";
import "./BooksBrowser.css";

const BookBrowser = (props) => {
  return (
    <div className="browser-container">
      <input type="search" className="ppal-browser"></input>
      <button type="button" className="advanced-browser-button">
        <img
          className="button-logo"
          src="/logosProyecto/logoPrincipal/logo/logo_small_icon_only_inverted.png"
          alt="logo"
        />
      </button>
    </div>
  );
};

export { BookBrowser };
