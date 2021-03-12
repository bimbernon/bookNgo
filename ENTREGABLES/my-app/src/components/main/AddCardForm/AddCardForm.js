import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { UserContext } from "../../providers/UserProvider";
import { Card } from "../UserPurseMain/Card/Card";
import "./AddCardForm.css";

const AddCardForm = () => {
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

  // useEffect(() => {
  //   async function deleteCardById() {
  //     const deleteCardResponse = await fetch(
  //       `http://localhost:3080/api/v1/cards/delete/${}`,
  //       {
  //         method: "DELETE",
  //         headers: {
  //           "Content-type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     if (deleteCardResponse.ok) {
  //       const userCardData = await deleteCardResponse.json();
  //       console.log(userCardData);
  //       setCard(userCardData);
  //     } else {
  //       const errorMsg = await deleteCardResponse.json();
  //       setErrorMsg("Algo ha salido mal...");
  //     }
  //   }
  //   deleteCardById();
  // }, []);

  console.log(cards);

  const renderCards = (card) => (
    <Card
      Key={card.idtarjeta}
      cardId={card.idtarjeta}
      cardNumber={card.numerotarjeta}
    />
  );

  // const handleDeleteCard = (e) => ();

  return (
    <div className="add-card-form-container">
      <form className="add-card-selector">
        <select className="add-card-options" onChange="">
          {cards.map(renderCards)}
        </select>
        {/* <button type="submit" onSubmit={handleDeleteCard}>
          BORRAR
        </button> */}

        {/* LA IDEA ES METER UN HANDLE EN EL SELECT PARA CAMBIAR LOS DATOS DE LA TARJETA
    O METER UNA TARJETA NUEVA CUBRIENDO LOS CAMPOS, QUE VALGA PARA LOS DOS */}
      </form>
      <div>
        <h1 className="add-card-form-title">Añade tu tarjeta</h1>

        <form className="add-card-form">
          <div className="add-card-form-item">
            <input type="text" placeholder="Nombre del titular" />
          </div>
          <div className="add-card-form-item">
            <input type="text" placeholder="Numero de tarjeta" />
          </div>
          <div className="add-card-form-item">
            <input type="text" placeholder="Fecha de caducidad" />
          </div>
          <div className="add-card-form-item">
            <input type="text" placeholder="CSV" />
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
