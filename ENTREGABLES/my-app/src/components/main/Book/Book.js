import React from "react";
import "./Book.css";

const Book = (props) => {
  const { bookName, bookId } = props;

  return (
    <li className="book-item">
      <img
        src={`/booksCovers/${bookId}.jpeg`}
        className="bookCover"
        alt="bookCover"
      ></img>
      <h1 className="book-title">{bookName}</h1>
    </li>
  );
};

export { Book };
