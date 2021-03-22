import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { UserContext } from "../../providers/UserProvider";
import { Card } from "../UserPurseMain/Card/Card";
import { Link } from "react-router-dom";
import "./AddCardForm.css";

const AddCardForm = () => {
  const [cards, setCards] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [token] = useContext(AuthContext);
  const [selectedUser] = useContext(UserContext);
  const [currentCard, setCurrentCard] = useState(0);

  useEffect(() => {
    setCurrentCard(cards[0]);
  }, [cards]);

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
        setCards(userCardData);
      } else {
        const errorMsg = await userCardResponse.json();
        setErrorMsg(errorMsg.error);
      }
    }
    getUserCard();
  }, []);

  const handleSelectedCard = (e) => {
    const selectedCard = cards.find((card) => {
      return parseInt(card.numerotarjeta) === parseInt(e.target.value);
    });
    setCurrentCard(selectedCard);
  };

  const deleteCardById = async (e) => {
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
      setErrorMsg(errorMsg.error);
    }
  };

  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [csv, setCsv] = useState("");

  const handleChangeCardNumber = (e) => setCardNumber(e.target.value);
  const handleChangeExpirationDate = (e) => setExpirationDate(e.target.value);
  const handleChangeCsv = (e) => setCsv(e.target.value);

  const handleSubmitCard = async (e) => {
    setErrorMsg("");
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
    const newCard = await resp.json();
    if (resp.ok) {
      setCardNumber("");
      setExpirationDate("");
      setCsv("");

      setCards([newCard, ...cards]);
    } else {
      setErrorMsg(newCard.error);
    }
  };

  const renderCards = (card) => (
    <Card
      key={card.idtarjeta}
      cardId={card.idtarjeta}
      cardNumber={card.numerotarjeta}
    />
  );

  return (
    <div className="add-card-form-container">
      {/* {errorMsg ? <p>{errorMsg}</p> : null} */}
      {/* <Link to={`/users/purse/${selectedUser.idusuario}`}>
        <img src={`/icons/brown-back-button.svg`} height="30" width="30" alt="Botón" />
      </Link> */}
      <div>
        <h1 className="add-card-form-title">Añade tu tarjeta</h1>

        <form className="add-card-form" onSubmit={handleSubmitCard}>
          <div className="add-card-form-item">
            <input
              type="text"
              placeholder={`Numero de tarjeta`}
              value={cardNumber}
              onChange={handleChangeCardNumber}
            />
          </div>
          <div className="add-card-form-item">
            <input
              type="text"
              placeholder={`Fecha de caducidad`}
              value={expirationDate}
              onChange={handleChangeExpirationDate}
            />
          </div>
          <div className="add-card-form-item">
            <input
              type="text"
              placeholder={`CSV`}
              value={csv}
              onChange={handleChangeCsv}
            />
          </div>
          <div className="add-card-button-container">
            <button className="add-card-submit-button" type="submit">
              +
            </button>
          </div>
        </form>
      </div>
      <form className="add-card-selector" onSubmit={deleteCardById}>
        Selecciona una tarjeta
        <select className="add-card-options" onChange={handleSelectedCard}>
          {cards.map(renderCards)}
        </select>
        <button type="submit" className="delete-card-button">
          BORRAR
        </button>
      </form>
    </div>
  );
};

export { AddCardForm };
