import React from "react";
import { Link } from "react-router-dom";
import "./Book.css";

const Book = (props) => {
  const { bookName, bookId, bookAuthor } = props;

  return (
    <li className="book-item">
      <Link to={`/books/id/${bookId}`}>
        <img
          src={`/booksCovers/${bookId}.jpeg`}
          className="book-cover"
          alt="bookCover"
        ></img>
        <h1 className="book-title">{bookName}</h1>
        <h1 className="book-author">{bookAuthor}</h1>
      </Link>
    </li>
  );
};

export { Book };
