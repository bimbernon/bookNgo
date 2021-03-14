import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { UserContext } from "../../providers/UserProvider";
import { Card } from "../UserPurseMain/Card/Card";
import "./AddCardForm.css";

const AddCardForm = () => {
  // const [userMoney, setUserMoney] = useState([]);
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
        console.log(userCardData);
        setCards(userCardData);
      } else {
        const errorMsg = await userCardResponse.json();
        setErrorMsg();
      }
    }
    getUserCard();
  }, []);

  const handleSelectedCard = (e) => {
    console.log("change");
    const selectedCard = cards.find((card) => {
      return parseInt(card.numerotarjeta) === parseInt(e.target.value);
    });
    console.log(selectedCard.idtarjeta);
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
      key={card.idtarjeta}
      cardId={card.idtarjeta}
      cardNumber={card.numerotarjeta}
    />
  );

  return (
    <div className="add-card-form-container">
      {/* METER BIEN LA RUTA VAGA */}
      <a href="javascript:history.back()" className="back-button">
        <img src={`/icons/back.png`} height="30" width="30" alt="Botón" />
      </a>
      <div>
        <h1 className="add-card-form-title">Añade tu tarjeta</h1>

        <form className="add-card-form" onSubmit={handleSubmitCard}>
          <div className="add-card-form-item">
            <input
              type="text"
              placeholder={`     Numero de tarjeta`}
              value={cardNumber}
              onChange={handleChangeCardNumber}
            />
          </div>
          <div className="add-card-form-item">
            <input
              type="text"
              placeholder={`     Fecha de caducidad`}
              value={expirationDate}
              onChange={handleChangeExpirationDate}
            />
          </div>
          <div className="add-card-form-item">
            <input
              type="text"
              placeholder={`     CSV`}
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
