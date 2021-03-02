import React from "react";
import "./BooksBrowser.css";

const BookBrowser = (props) => {
  return (
    <div>
      <input type="search" className="ppal-browser"></input>
      <button className="advanced-browser-button" />
    </div>
  );
};

export { BookBrowser };
