import React, { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Redirect } from "react-router-dom";
import Swal from "sweetalert2";
import "./DonationsForm.css";

export const DonationsForm = () => {
  const [token] = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [authorsName, setAuthorsName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChangeDonationTitle = (e) => setTitle(e.target.value);
  const handleChangeDonationAuthorsName = (e) => setAuthorsName(e.target.value);

  const handleSubmitDonations = async (e) => {
    e.preventDefault();
    const resp = await fetch("http://localhost:3080/api/v1/donations/create", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title,
        authorsName: authorsName,
      }),
    });

    if (resp.ok) {
      await resp.json();
      setTitle("");
      setAuthorsName("");
      Swal.fire({
        icon: "error",
        title: "¡Ooops!",
        text:
          "Gracias por tu donación. Tus libros llenarán nuestras estanterías online. book'N'go.",
      });
    } else {
      setErrorMessage("Debes estar registrado para hacer tu donación.");
    }
  };

  if (errorMessage === "") return <Redirect to="/users/login" />;

  return (
    <div className="donations-container">
      <form className="donations-form" onSubmit={handleSubmitDonations}>
        <h1 className="donations-form-title">Envíanos tus libros</h1>
        <input
          required
          type="text"
          className="donations-input"
          placeholder="Título del libro"
          value={title}
          onChange={handleChangeDonationTitle}
        ></input>
        <input
          required
          type="text"
          className="donations-input"
          placeholder="Nombre del autor"
          value={authorsName}
          onChange={handleChangeDonationAuthorsName}
        ></input>
        <div className="donation-error-message-container">{errorMessage}</div>
        <p className="donations-form-direction">
          Envíanos tu libro a Evergreen Terrace 123, Springfield (Colorado).
          United States.
        </p>
        <button className="donations-form-button" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
};
