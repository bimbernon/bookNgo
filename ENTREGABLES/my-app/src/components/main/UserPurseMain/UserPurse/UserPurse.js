import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { UserContext } from "../../../providers/UserProvider";
import { Card } from "../Card/Card";
import "./UserPurse.css";

export const UserPurse = () => {
  const [userMoney, setUserMoney] = useState([]);
  const [cards, setCard] = useState([]);
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

  console.log(cards);

  const renderCards = (card) => (
    <Card
      Key={card.idtarjeta}
      cardId={card.idtarjeta}
      cardNumber={card.numerotarjeta}
    />
  );

  // const renderRecharge = (recharge) => (
  //   <Recharge key={recharge.idusuario} recharge={recharge.monedero}></Recharge>
  // );
  const style = {
    padding: "0",
    margin: "0",
    width: "1.9rem",
    height: "1.9rem",
  };

  return (
    <div className="purse-container">
      <h1 className="purse-title">Monedero</h1>
      <div className="money-container">
        <h2>Saldo</h2>
        <div className="money-display-container">
          <h2 className="money-display">{userMoney}</h2>
        </div>
      </div>
      <div className="recharge-container">
        <div className="recharge-button-container">
          <button type="submit" value="1 B" className="recharge-button">
            <p className="recharge-button-value">1</p>
            <img
              src="/logosProyecto/logoPrincipal/logo_blanco/logo_small_icon_only_inverted.png"
              alt="logo"
              className="logo-img"
              style={style}
            ></img>
          </button>
        </div>
        <div className="recharge-button-container">
          <button type="submit" value="5 B" className="recharge-button">
            <p className="recharge-button-value">5</p>
            <img
              src="/logosProyecto/logoPrincipal/logo_blanco/logo_small_icon_only_inverted.png"
              alt="logo"
              className="logo-img"
              style={style}
            ></img>
          </button>
        </div>
        <div className="recharge-button-container">
          <button type="submit" value="10 B" className="recharge-button">
            <p className="recharge-button-value">10</p>
            <img
              src="/logosProyecto/logoPrincipal/logo_blanco/logo_small_icon_only_inverted.png"
              alt="logo"
              className="logo-img"
              style={style}
            ></img>
          </button>
        </div>
        <div className="recharge-button-container">
          <button type="submit" value="20 B" className="recharge-button">
            <p className="recharge-button-value">20</p>
            <img
              src="/logosProyecto/logoPrincipal/logo_blanco/logo_small_icon_only_inverted.png"
              alt="logo"
              className="logo-img"
              style={style}
            ></img>
          </button>
        </div>
      </div>
      <div className="payment-container">
        <h2>Selecciona método de pago</h2>
        <form className="card-select">
          <select className="card-options" onChange="">
            {cards.map(renderCards)}
          </select>
        </form>
      </div>
      <div className="recharge-container">
        {/* QUEDA METER AQUI CUATRO BOTONES CON IMPORTES PARA RECARGAR */}
        {/* <ul className="recharge-list">
          <li></li>
        </ul> */}
        <Link to="/cards">
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
