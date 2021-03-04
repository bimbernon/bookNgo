import React from "react";
import { Link } from "react-router-dom";
import "./Book.css";

const Book = (props) => {
  const { bookName, bookId } = props;

  return (
    <Link to={`/books/id/${bookId}`}>
      <li className="book-item">
        <img
          src={`/booksCovers/${bookId}.jpeg`}
          className="book-cover"
          alt="bookCover"
        ></img>
        <h1 className="book-title">{bookName}</h1>
      </li>
    </Link>
  );
};

export { Book };
