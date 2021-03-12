import React from "react";

export function Card(props) {
  const { cardId, cardNumber, userName, expirationDate, csv } = props;
  console.log(props)

  return (
    <option
      key={cardId}
      value={userName}
      cardId={cardId}
      expirationDate={expirationDate}
      csv={csv}
    >
      {cardNumber}
    </option>
  );
}
