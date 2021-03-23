import React from "react";
import "./Reserve.css";

const Reserve = (props) => {
  const {
    reservedBookTitle,
    reserveDate,
    expirationDate,
    bookId,
    children,
  } = props;
  console.log(props);

  return (
    <li className="reserve-item-li" key={bookId}>
      <h1 className="reserve-book-title">{reservedBookTitle}</h1>
      <div className="reserve-date-container">
        <p className="reserve-book-title">
          Inicio {reserveDate.substring(0, 10)}
        </p>
        <p className="reserve-book-title">
          Fin {expirationDate.substring(0, 10)}
        </p>
      </div>
      {children}
    </li>
  );
};

export { Reserve };
