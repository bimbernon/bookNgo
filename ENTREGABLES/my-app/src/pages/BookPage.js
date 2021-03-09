import React from "react";
import { Link } from "react-router-dom";
import { BookDetails } from "../components/main/BookDetails/BookDetails";

function BookPage() {
  return (
    <div className="book-details-container">
      <BookDetails></BookDetails>
      <Link to="/user/:bookId/mochila">
        <button className="book-details-reserve-button">RESERVAR</button>
      </Link>
    </div>
  );
}

export { BookPage };
