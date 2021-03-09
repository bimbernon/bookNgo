import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import "./UserPurse.css";

export const UserPurse = () => {
  const [userMoney, setUserMoney] = useState([]);
  console.log(userMoney);
  const [card, setCard] = useState([]);
  console.log(card);
  const [errorMsg, setErrorMsg] = useState("");
  let userId = 4;

  useEffect(() => {
    async function getUserInfo() {
      const userInfoResponse = await fetch(
        `http://localhost:3080/api/v1/reserves/1`
      );
      if (userInfoResponse.ok) {
        await userInfoResponse.json();
        setUserMoney(userInfoResponse);
        console.log(userInfoResponse);
      } else {
        const errorMsg = await userInfoResponse.json();
        setErrorMsg("Algo ha salido mal...");
      }
    }
    getUserInfo();
  }, []);

  useEffect(() => {
    async function getUserCard() {
      const userCardResponse = await fetch(
        `http://localhost:3080/api/v1/cards/user/${userId}`
      );
      if (userCardResponse.ok) {
        await userCardResponse.json();
        setCard(userCardResponse);
        console.log(userCardResponse);
      } else {
        const errorMsg = await userCardResponse.json();
        setErrorMsg("Algo ha salido mal...");
      }
    }
    getUserCard();
  }, []);

  const Cards = () => <option></option>;

  const renderCard = (card) => (
    <Cards
      Key={card.idtarjeta}
      cardId={card.idtarjeta}
      cardNumber={card.numeroTarjeta}
      userId={card.idusuario}
      expirationDate={card.fechaexpiracion}
    ></Cards>
  );

  const Recharge = () => (<div>
      <button type="submit" value="1e">1e</button>
  <button type="submit" value="3e">3e</button>
      </div>);

  const renderRecharge = (recharge) => (
    <Recharge key={recharge.idusuario} recharge={recharge.monedero}></Recharge>
  );

  return (
    <div className="purse-container">
      <h1 className="purse-title">Monedero</h1>
      <div className="money-container">
        <h2>Saldo</h2>
        <div className="money-display-container">
          <h2 className="money-display">20k</h2>
        </div>
      </div>
      <div className="payment-container">
        <h2>Selecciona método de pago</h2>
        <form className="card-select">
          <select className="card-options">{card.map(renderCard)}</select>
        </form>
      </div>
      <div className="recharge-container">
        <ul className="recharge-list">
          <li>{userMoney.map(renderRecharge)}</li>
        </ul>
      </div>
      {/* {errorMsg && (
        <div
          style={{
            color: "red",
            minHeight: "1.5em",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          {" "}
          {errorMsg}
        </div>
      )} */}
    </div>
  );
};
