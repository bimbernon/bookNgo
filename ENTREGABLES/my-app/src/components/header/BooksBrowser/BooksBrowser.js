import React from "react";
import "./BooksBrowser.css";

const BookBrowser = (props) => {
  return (
    <div>
      <input type="search" className="ppal-browser"></input>
      <button type="button" className="advanced-browser-button"><img className="logo" src="/logosProyecto/logoPrincipal/logo/logo_small_icon_only_inverted.png" alt="logo"></img></button>
    </div>
  );
};

export { BookBrowser };
