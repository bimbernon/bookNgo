import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { UserContext } from "../../providers/UserProvider";
import { Card } from "../UserPurseMain/Card/Card";
import "./AddCardForm.css";

const AddCardForm = () => {
  const [userMoney, setUserMoney] = useState([]);
  const [cards, setCards] = useState([]);
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
        setCards(userCardData);
      } else {
        const errorMsg = await userCardResponse.json();
        setErrorMsg("Algo ha salido mal...");
      }
    }
    getUserCard();
  }, []);

  const [currentCard, setCurrentCard] = useState({});
  console.log(currentCard);

  const handleSelectedCard = (e) => {
    const selectedCard = cards.find((card) => {
      return parseInt(card.numerotarjeta) === parseInt(e.target.value);
    });
    console.log(selectedCard);
    setCurrentCard(selectedCard);
  };

  console.log(currentCard);
  const deleteCardById = async (e) => {
    e.preventDefault();
    console.log("hola");

    if (cards.length > 0) {
      setCurrentCard(cards[0]);
    }

    const deleteCardResponse = await fetch(
      `http://localhost:3080/api/v1/cards/delete/${currentCard.idtarjeta}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (deleteCardResponse.ok) {
      await deleteCardResponse.json();
    } else {
      const errorMsg = await deleteCardResponse.json();
      setErrorMsg("Algo ha salido mal...");
    }
  };

  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [csv, setCsv] = useState("");

  const handleChangeCardNumber = (e) => setCardNumber(e.target.value);
  const handleChangeExpirationDate = (e) => setExpirationDate(e.target.value);
  const handleChangeCsv = (e) => setCsv(e.target.value);

  const handleSubmitCard = async (e) => {
    e.preventDefault();

    const resp = await fetch("http://localhost:3080/api/v1/cards", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        numerotarjeta: cardNumber,
        fechaExpiracion: expirationDate,
        csv: csv,
      }),
    });
    if (resp.ok) {
      await resp.json();
      setCardNumber("");
      setExpirationDate("");
      setCsv("");
    }
  };

  const renderCards = (card) => (
    <Card
      Key={card.idtarjeta}
      cardId={card.idtarjeta}
      cardNumber={card.numerotarjeta}
    />
  );

  return (
    <div className="add-card-form-container">
      <form className="add-card-selector" onSubmit={deleteCardById}>
        <select className="add-card-options" onChange={handleSelectedCard}>
          {cards.map(renderCards)}
        </select>
        <button type="submit">BORRAR</button>
      </form>
      <div>
        <h1 className="add-card-form-title">Añade tu tarjeta</h1>

        <form className="add-card-form" onSubmit={handleSubmitCard}>
          <div className="add-card-form-item">
            <input
              type="text"
              placeholder="Numero de tarjeta"
              value={cardNumber}
              onChange={handleChangeCardNumber}
            />
          </div>
          <div className="add-card-form-item">
            <input
              type="text"
              placeholder="Fecha de caducidad"
              value={expirationDate}
              onChange={handleChangeExpirationDate}
            />
          </div>
          <div className="add-card-form-item">
            <input
              type="text"
              placeholder="CSV"
              value={csv}
              onChange={handleChangeCsv}
            />
          </div>
          <div className="add-card-button-container">
            <button className="add-card-submit-button" type="submit">
              <img
                className="add-card-button-logo"
                src="/logosProyecto/logoPrincipal/logo/logo_small_icon_only_inverted.png"
                alt="logo"
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { AddCardForm };
