import React from "react";
import "./BookDetails.css";

export const BookDetails = (props) => {
  const { bookName, bookId, bookAuthor, bookPrice } = props;
  return (
    <li className="book-details-item">
      <img
        src={`/booksCovers/${bookId}.jpeg`}
        className="book-details-cover"
        alt="bookCover"
      ></img>
      <div className="book-details-details">
        <h1 className="book-details-title">{bookName}</h1>
        <h1 className="book-details-author">{bookAuthor}</h1>
        <p className="book-details-price">Precio:{bookPrice}$</p>
        <p className="book-details-sinopsis">
          cqevfrevr vwrtbrtbc theh ecth tyhtyhctryn teeybcrtyn cjhgkjh jhhb biblbiubpibib ibpibi bpib ibpi bpiu bpib
        </p>
      </div>
    </li>
  );
};
