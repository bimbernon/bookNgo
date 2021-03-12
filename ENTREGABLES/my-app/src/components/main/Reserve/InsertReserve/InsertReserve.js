import React, { useState, useContext } from "react";
import { AuthContext } from "../../../../components/providers/AuthProvider";
import { UserContext } from "../../../../components/providers/UserProvider";
import "./InsertReserve.css";

export const InsertReserve = (props) => {
  const { bookId } = props;
  const [token] = useContext(AuthContext);
  const [reserve, setReserve] = useState([]);
  const [selectedUser] = useContext(UserContext);
  console.log(selectedUser);

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
    >
      <input
        className="hidden-input"
        type="number"
        value={bookId}
        onClick={handleChangeReserve}
      ></input>
      <button className="book-details-reserve-button" type="submit">
        Pagar
      </button>
    </form>
  );
};
