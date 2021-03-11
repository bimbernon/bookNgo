import React from "react";


export function Card(props) {
    const {cardId, cardNumber, userId, expirationDate} = props;
  return (
    <option
      cardId={cardId}
      cardNumber={cardNumber}
      userId={userId}
      expirationDate={expirationDate}
    ></option>
  );
}
