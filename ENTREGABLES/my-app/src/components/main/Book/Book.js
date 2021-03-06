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
    stockMsg,
  } = props;

  const imgStyle = {
    width: "7rem",
    height: "9.5rem",
  };

  return (
    <li className="book-item" style={style}>
      <Link to={`/books/id/${bookId}`}>
        <img
          src={`/images/books/${bookId}.jpg`}
          className="book-cover"
          alt="bookCover"
          style={imgStyle}
        />
        <div className="book-information">
          <h1 className="book-title">{bookName}</h1>
          <h2 className="book-author">{bookAuthor}</h2>
          <h2 className="book-price">{bookPrice}</h2>
          {stockMsg && (
            <div style={{ color: "red", minHeight: "1.5em" }}> {stockMsg}</div>
          )}
          <p className="book-sinopsis">{bookSinopsis}</p>
        </div>
      </Link>
    </li>
  );
};

export { Book };
