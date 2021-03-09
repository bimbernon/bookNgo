import React from "react";
import { BookDetails } from "../components/main/BookDetails/BookDetails";

function BookPage() {
  return (
    <div className="book-details-container">
      <BookDetails></BookDetails>
      <button className="book-details-reserve-button">RESERVAR</button>
    </div>
  );
}

export { BookPage };
