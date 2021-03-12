import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { UserContext } from "../../../providers/UserProvider";
import { Card } from "../Card/Card";
import "./UserPurse.css";

export const UserPurse = () => {
  const [userMoney, setUserMoney] = useState(0);
  const [cards, setCard] = useState([]);
  const [newRecharge, setNewRecharge] = useState(0);
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
      cardNumber={card.numerotarjeta}
    />
  );

  const style = {
    padding: "0",
    margin: "0",
    width: "1.9rem",
    height: "1.9rem",
  };

  const handleCuantity = (e) => setNewRecharge(e.target.value);
  const handleRecharge = (e) => setUserMoney(userMoney + newRecharge);

  console.log(userMoney);
  console.log(newRecharge);
  console.log(userMoney + newRecharge);

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
          <button
            value={1}
            className="recharge-button"
            onClick={handleCuantity}
          >
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
          <button
            value={5}
            className="recharge-button"
            onClick={handleCuantity}
          >
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
          <button
            value={10}
            className="recharge-button"
            onClick={handleCuantity}
          >
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
          <button
            value={20}
            className="recharge-button"
            onClick={handleCuantity}
          >
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
          <select className="card-options">{cards.map(renderCards)}</select>
          <button type="submit" onSubmit={handleRecharge}>
            RECARGAR
          </button>
          <Link to="/cards">
            <button>Añadir tarjeta</button>
          </Link>
        </form>
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