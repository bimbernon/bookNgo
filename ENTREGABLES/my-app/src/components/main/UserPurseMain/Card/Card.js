import React from "react";

export function Card(props) {
  const { cardId, cardNumber, userName, expirationDate, csv } = props;
  console.log(props)

  return (
    <option
      key={cardId}
      value={userName}
      cardid={cardId}
      expirationdate={expirationDate}
      csv={csv}
    >
      {cardNumber}
    </option>
  );
}
