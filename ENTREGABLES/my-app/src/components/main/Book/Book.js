import React from "react";
import "./Book.css";

const Book = (props) => {
  const { bookName, bookId } = props;

  return (
    <li className="bookItem">
      <img
        src={`/booksCovers/${bookId}.jpg`}
        className="bookCover"
        alt="bookCover"
      ></img>
      <h1>{bookName}</h1>
    </li>
  );
};

export { Book };
