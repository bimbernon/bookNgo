import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { UserContext } from "../../providers/UserProvider";
import { Card } from "../UserPurse/Card/Card";
import "./UserPurse.css";

export const UserPurse = () => {
  const [userMoney, setUserMoney] = useState([]);
  const [cards, setCard] = useState([]);
  console.log(cards);
  const [errorMsg, setErrorMsg] = useState("");
  const [token] = useContext(AuthContext);
  const [selectedUser] = useContext(UserContext);

  useEffect(() => {
    async function getUserInfo() {
      const moneyResponse = await fetch(
        `http://localhost:3080/api/v1/users/id/${selectedUser.idusuario}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (moneyResponse.ok) {
        const moneyResponseData = await moneyResponse.json();
        setUserMoney(moneyResponseData.monedero);
      } else {
        const errorMsg = await moneyResponse.json();
        setErrorMsg("Algo ha salido mal...");
      }
    }
    getUserInfo();
  }, []);

  useEffect(() => {
    async function getUserCard() {
      const userCardResponse = await fetch(
        `http://localhost:3080/api/v1/cards/user/${selectedUser.idusuario}`,

        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (userCardResponse.ok) {
        const userCardData = await userCardResponse.json();
        console.log(userCardData);
        setCard(userCardData);
      } else {
        const errorMsg = await userCardResponse.json();
        setErrorMsg("Algo ha salido mal...");
      }
    }
    getUserCard();
  }, []);

  const renderCards = (card) => (
    <Card
      Key={card.idtarjeta}
      cardId={card.idtarjeta}
      cardNumber={card.numeroTarjeta}
      userName={card.nombreusuario}
      // expirationDate={card.fechaexpiracion}
    >
      {card.numeroTarjeta}
    </Card>
  );

  // const Recharge = () => (
  //   <div>
  //     <button type="submit" value="1e">
  //       1e
  //     </button>
  //     <button type="submit" value="3e">
  //       3e
  //     </button>
  //   </div>
  // );

  // const renderRecharge = (recharge) => (
  //   <Recharge key={recharge.idusuario} recharge={recharge.monedero}></Recharge>
  // );

  return (
    <div className="purse-container">
      <h1 className="purse-title">Monedero</h1>
      <div className="money-container">
        <h2>Saldo</h2>
        <div className="money-display-container">
          <h2 className="money-display">{userMoney}</h2>
        </div>
      </div>
      <div className="payment-container">
        <h2>Selecciona método de pago</h2>
        <form className="card-select">
          <ul className="card-options" onChange="">
            {cards.map(renderCards)}
          </ul>
        </form>
      </div>
      <div className="recharge-container">
        {/* <ul className="recharge-list">
          <li></li>
        </ul> */}
        <Link to="">
          <button>Añadir tarjeta</button>
        </Link>
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
