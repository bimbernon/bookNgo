import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../components/providers/AuthProvider";
import { UserContext } from "../../../../components/providers/UserProvider";
import "./InsertReserve.css";

export const InsertReserve = (props) => {
  const { bookId } = props;
  const [token] = useContext(AuthContext);
  const [reserve, setReserve] = useState([]);
  const [selectedUser] = useContext(UserContext);

  const handleChangeReserve = (e) => setReserve(e.target.value);

  const insertReserveEffect = async (e) => {
    e.preventDefault();

    const reserveResponse = await fetch(
      "http://localhost:3080/api/v1/reserves/",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          idlibro: bookId,
        }),
      }
    );

    //esta peti deberia darnos la info del book a reservar para conocer el stock
    const bookStockResponse = await fetch(
      `http://localhost:3080/api/v1/books/id/${bookId}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(bookStockResponse);
    //este if es para, si no hay en el stock en el libro que devuelve la peti salte el mensaje
    if (bookStockResponse.ok) {
      const selectedBookData = await bookStockResponse.json();
      console.log(selectedBookData);
      if (selectedBookData.stock < 1) {
        const error = new Error("No hay stock actualmente");
        throw error;
      }
    }

    if (reserveResponse.ok) {
      await reserveResponse.json();
      setReserve(reserveResponse);
    } else {
      const error = new Error("Algo ha salido mal.");
      throw error;
    }
  };

  return (
    <form
      onSubmit={insertReserveEffect}
      action={`/reserves/${selectedUser.idusuario}`}
      className="reserve-form"
    >
      <Link to={`/reserves/${selectedUser.idusuario}`}>
        <button
          className="book-details-reserve-button"
          type="submit"
          value={bookId}
          onClick={handleChangeReserve}
        >
          Pagar
        </button>
      </Link>
    </form>
  );
};
