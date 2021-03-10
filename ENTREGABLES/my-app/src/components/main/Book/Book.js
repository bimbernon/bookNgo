import React from "react";
import { Link } from "react-router-dom";
import "./Book.css";

const Book = (props) => {
  const {
    bookName,
    bookId,
    bookAuthor,
    bookPrice,
    bookSinopsis,
    style,
  } = props;

  return (
    <li className="book-item" style={style}>
      <Link to={`/books/id/${bookId}`}>
        <img
          src={`/images/books/${bookId}.jpg`}
          className="book-cover"
          alt="bookCover"
        ></img>
        <div className="book-information">
          <h1 className="book-title">{bookName}</h1>
          <h2 className="book-author">{bookAuthor}</h2>
          <h2 className="book-price">{bookPrice}</h2>
          <p className="book-sinopsis">{bookSinopsis}</p>
        </div>
      </Link>
    </li>
  );
};

export { Book };
