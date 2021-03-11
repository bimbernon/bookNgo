import React from "react";

export function Card(props) {
  const { cardId, cardNumber, userName, expirationDate } = props;
  return (
    <li value={userName} cardId={cardId} expirationDate={expirationDate}>
      {cardNumber}
    </li>
  );
}
