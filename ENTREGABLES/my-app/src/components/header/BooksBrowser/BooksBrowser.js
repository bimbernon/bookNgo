import React from "react";
import { AdvancedBrowser } from "./AdvancedBrowser/AdvancedBrowser";
import "./BooksBrowser.css";

const BookBrowser = () => {
  return (
    <>
      <div className="browser-container">
        <ul className="browser-list">
          <li className="browser-item">
            <input type="search" className="ppal-browser"></input>
          </li>
          <li className="browser-item">
            <button type="button" className="advanced-browser-button">
              <img
                className="button-logo"
                src="/logosProyecto/logoPrincipal/logo/logo_small_icon_only_inverted.png"
                alt="logo"
              />
              <AdvancedBrowser />
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export { BookBrowser };
