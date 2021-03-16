// import React, { useState, useEffect, useContext } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../../../providers/AuthProvider";
// import { UserContext } from "../../../providers/UserProvider";
// import { Card } from "../Card/Card";
// import Swal from "sweetalert2";
// import "./UserPurse.css";

// export const UserPurse = () => {
//   const [userMoney, setUserMoney] = useState(0);
//   const [cards, setCard] = useState([]);
//   const [currentCard, setCurrentCard] = useState({});
//   const [newRecharge, setNewRecharge] = useState(0);
//   const [errorMsg, setErrorMsg] = useState("");
//   const [token] = useContext(AuthContext);
//   const [selectedUser] = useContext(UserContext);

//   //falta por añadir la recarga al usuario a la base de datos

//   const handleSelecteCard = (e) => {
//     const selectedCard = cards.find((card) => {
//       return parseInt(card.idtarjeta) === parseInt(e.target.value);
//     });

//     setCurrentCard(selectedCard);
//   };

//   useEffect(() => {
//     async function getUserInfo() {
//       const moneyResponse = await fetch(
//         `http://localhost:3080/api/v1/users/id/${selectedUser.idusuario}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if (moneyResponse.ok) {
//         const moneyResponseData = await moneyResponse.json();
//         setUserMoney(moneyResponseData.monedero);
//         console.log("Monedero Inicial ", userMoney);
//       } else {
//         const errorMsg = await moneyResponse.json();
//         setErrorMsg("Algo ha salido mal...");
//       }
//     }
//     getUserInfo();
//   }, []);

//   const rechargePurse = async (e) => {
//     console.log("usermoney dentro del post" + userMoney);

//     const userRechargeResponse = await fetch(
//       `http://localhost:3080/api/v1/users/purse/recharge/${selectedUser.idusuario}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           ammount: userMoney + newRecharge,
//         }),
//       }
//     );
//     if (userRechargeResponse.ok) {
//       console.log("entro");
//       const userRechargeData = await userRechargeResponse.json();
//       setUserMoney(userRechargeData.ammount);
//     } else {
//       setErrorMsg("Algo ha salido mal...");
//     }
//   };

//   useEffect(() => {
//     async function getUserCard() {
//       const userCardResponse = await fetch(
//         `http://localhost:3080/api/v1/cards/user/${selectedUser.idusuario}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if (userCardResponse.ok) {
//         const userCardData = await userCardResponse.json();
//         setCard(userCardData);

//         if (cards.length === 1) {
//           setCurrentCard(cards[0]);
//         }
//       } else {
//         const errorMsg = await userCardResponse.json();
//         setErrorMsg("Algo ha salido mal...");
//       }
//     }

//     getUserCard();
//   }, []);

//   const renderCards = (card) => (
//     <Card
//       key={card.idtarjeta}
//       cardId={card.idtarjeta}
//       cardNumber={card.numerotarjeta}
//     />
//   );

//   const style = {
//     padding: "0",
//     margin: "0",
//     width: "1.9rem",
//     height: "1.9rem",
//   };

//   const handleCuantity = (e) => {
//     setNewRecharge(parseInt(e.currentTarget.value));
//   };
//   const handleRecharge = (e) => {
//     e.preventDefault();
//     const prueba = currentCard.numerotarjeta + "";
//     let numerotarjetaConAsteriscos = "";

//     for (let i = 0; i < prueba.length; i++) {
//       if (i < 15) {
//         numerotarjetaConAsteriscos = numerotarjetaConAsteriscos + "*";
//       } else {
//         numerotarjetaConAsteriscos =
//           numerotarjetaConAsteriscos + prueba.charAt(i);
//       }
//     }
//     console.log(numerotarjetaConAsteriscos);

//     if (cards.length > 0) {
//       Swal.fire({
//         title: `¿Estás seguro de que quieres recargar con la tarjeta ${numerotarjetaConAsteriscos}?`,
//         text: `Se sumara ${newRecharge} coins a tu monedero`,
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#e1b470",
//         cancelButtonColor: "#ec511d",
//         confirmButtonText: "SI",
//         cancelButtonText: "NO",
//       }).then((result) => {
//         if (result.isConfirmed) {
//           console.log(
//             "En el dialogo " + userMoney + "y recarga nueva de " + newRecharge
//           );
//           rechargePurse();
//         }
//       });
//     } else {
//       console.log("no se puede no tienes una tarjeta seleccionada");
//     }
//   };

//   return (
//     <div className="purse-container">
//       <h1 className="purse-title">Mi monedero</h1>
//       <div className="money-container">
//         <h2>Saldo</h2>
//         <div className="money-display-container">
//           <h2 className="money-display">{userMoney}</h2>
//         </div>
//       </div>

//       <div className="recharge-container">
//         <div className="recharge-button-container">
//           <button
//             value={1}
//             className="recharge-button"
//             onClick={handleCuantity}
//           >
//             <p className="recharge-button-value">1</p>
//             <img
//               src="/logosProyecto/logoPrincipal/logo_blanco/logo_small_icon_only_inverted.png"
//               alt="logo"
//               className="logo-img"
//               style={style}
//             ></img>
//           </button>
//         </div>
//         <div className="recharge-button-container">
//           <button
//             value={5}
//             className="recharge-button"
//             onClick={handleCuantity}
//           >
//             <p className="recharge-button-value">5</p>
//             <img
//               src="/logosProyecto/logoPrincipal/logo_blanco/logo_small_icon_only_inverted.png"
//               alt="logo"
//               className="logo-img"
//               style={style}
//             ></img>
//           </button>
//         </div>
//         <div className="recharge-button-container">
//           <button
//             value={10}
//             className="recharge-button"
//             onClick={handleCuantity}
//           >
//             <p className="recharge-button-value">10</p>
//             <img
//               src="/logosProyecto/logoPrincipal/logo_blanco/logo_small_icon_only_inverted.png"
//               alt="logo"
//               className="logo-img"
//               style={style}
//             ></img>
//           </button>
//         </div>
//         <div className="recharge-button-container">
//           <button
//             value={20}
//             className="recharge-button"
//             onClick={handleCuantity}
//           >
//             <p className="recharge-button-value">20</p>
//             <img
//               src="/logosProyecto/logoPrincipal/logo_blanco/logo_small_icon_only_inverted.png"
//               alt="logo"
//               className="logo-img"
//               style={style}
//             ></img>
//           </button>
//           <div className="effective-recharge-button-container">
//             <form onSubmit={handleRecharge}>
//               <button className="effective-recharge-button" type="submit">
//                 Recargar
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>

//       <div className="payment-container">
//         <h2>Selecciona método de pago</h2>
//         <form className="card-select">
//           <select onChange={handleSelecteCard} className="card-options">
//             {cards.map(renderCards)}
//           </select>
//           <Link to="/cards">
//             <button className="add-card-button">Añadir tarjeta</button>
//           </Link>
//         </form>
//       </div>

//       {/* {errorMsg && (
//         <div
//           style={{
//             color: "red",
//             minHeight: "1.5em",
//             textAlign: "center",
//             marginTop: "20px",
//           }}
//         >
//           {" "}
//           {errorMsg}
//         </div>
//       )} */}
//     </div>
//   );
// };
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { UserContext } from "../../../providers/UserProvider";
import { Card } from "../Card/Card";
import Swal from "sweetalert2";
import "./UserPurse.css";

export const UserPurse = () => {
  const [userMoney, setUserMoney] = useState(0);
  const [cards, setCard] = useState([]);
  const [currentCard, setCurrentCard] = useState({});
  const [newRecharge, setNewRecharge] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [token] = useContext(AuthContext);
  const [selectedUser] = useContext(UserContext);

  //falta por añadir la recarga al usuario a la base de datos

  const handleSelecteCard = (e) => {
    const selectedCard = cards.find((card) => {
      return parseInt(card.idtarjeta) === parseInt(e.target.value);
    });

    setCurrentCard(selectedCard);
  };

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
        console.log("Monedero Inicial ", userMoney);
      } else {
        const errorMsg = await moneyResponse.json();
        setErrorMsg("Algo ha salido mal...");
      }
    }
    getUserInfo();
  }, []);

  const rechargePurse = async (e) => {
    console.log("usermoney dentro del post" + userMoney);

    const userRechargeResponse = await fetch(
      `http://localhost:3080/api/v1/users/purse/recharge/${selectedUser.idusuario}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ammount: userMoney + newRecharge,
        }),
      }
    );
    if (userRechargeResponse.ok) {
      console.log("entro");
      const userRechargeData = await userRechargeResponse.json();
      setUserMoney(userRechargeData.ammount);
    } else {
      setErrorMsg("Algo ha salido mal...");
    }
  };

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
        setCard(userCardData);

        if (cards.length === 1) {
          setCurrentCard(cards[0]);
        }
      } else {
        const errorMsg = await userCardResponse.json();
        setErrorMsg("Algo ha salido mal...");
      }
    }

    getUserCard();
  }, []);

  const renderCards = (card) => (
    <Card
      key={card.idtarjeta}
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

  const handleCuantity = (e) => {
    setNewRecharge(parseInt(e.currentTarget.value));
  };
  const handleRecharge = (e) => {
    e.preventDefault();
    const prueba = currentCard.numerotarjeta + "";
    let numerotarjetaConAsteriscos = "";

    for (let i = 0; i < prueba.length; i++) {
      if (i < 15) {
        numerotarjetaConAsteriscos = numerotarjetaConAsteriscos + "*";
      } else {
        numerotarjetaConAsteriscos =
          numerotarjetaConAsteriscos + prueba.charAt(i);
      }
    }
    console.log(numerotarjetaConAsteriscos);

    if (cards.length > 0) {
      Swal.fire({
        title: `¿Estás seguro de que quieres recargar con la tarjeta ${numerotarjetaConAsteriscos}?`,
        text: `Se sumara ${newRecharge} coins a tu monedero`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#e1b470",
        cancelButtonColor: "#ec511d",
        confirmButtonText: "SI",
        cancelButtonText: "NO",
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(
            "En el dialogo " + userMoney + "y recarga nueva de " + newRecharge
          );
          rechargePurse();
        }
      });
    } else {
      console.log("no se puede no tienes una tarjeta seleccionada");
    }
  };

  return (
    <div className="purse-container">
      <h1 className="purse-title">Mi monedero</h1>
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
          <div className="effective-recharge-button-container">
            <form onSubmit={handleRecharge}>
              <button className="effective-recharge-button" type="submit">
                Recargar
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="payment-container">
        <h2>Selecciona método de pago</h2>
        <form className="card-select">
          <select onChange={handleSelecteCard} className="card-options">
            {cards.map(renderCards)}
          </select>
          <Link to="/cards">
            <button className="add-card-button">Añadir tarjeta</button>
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