import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { BookDetails } from "../components/main/BookDetails/BookDetails";

export function BookPage() {
  let { bookId } = useParams();

  return (
    <div className="book-details-container">
      <BookDetails></BookDetails>
      <Link to={`/user/book/mochila/${bookId}`}>
        <button
          type="submit"
          className="book-details-reserve-button"
          bookId={bookId}
        >
          RESERVAR
        </button>
      </Link>
    </div>
  );
}
