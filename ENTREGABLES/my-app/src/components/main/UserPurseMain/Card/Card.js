import React from "react";

export function Card(props) {
  const { cardId, cardNumber, userName, expirationDate, csv } = props;

  return (
    <option
      key={cardId}
      value={cardId}
      cardid={cardId}
      expirationdate={expirationDate}
      csv={csv}
    >
      {cardNumber}
    </option>
  );
}
