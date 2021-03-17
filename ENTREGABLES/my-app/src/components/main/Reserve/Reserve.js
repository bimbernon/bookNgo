import React from "react";
import "./Reserve.css";

const Reserve = (props) => {
  const {
    reservedBookTitle,
    reserveDate,
    reserveExpiration,
    bookId,
    children,
  } = props;

  return (
    <li key={bookId}>
      <h1 className="reserve-book-title">{reservedBookTitle}</h1>
      <p className="reserve-book-title">{reserveDate.substring(0, 10)}</p>
      <p className="reserve-book-title">{reserveExpiration}</p>
      {/* <div
        className="reserve-info"
        reservedBookTitle={reservedBookTitle}
        reserveExpiration={reserveExpiration}
        reserveDate={reserveDate}
      > */}
      {children}
      {/* </div> */}
    </li>
  );
};

export { Reserve };
