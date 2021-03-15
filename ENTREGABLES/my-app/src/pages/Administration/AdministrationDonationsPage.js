import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../components/providers/AuthProvider";
import { Donation } from "../../components/main/Donation/Donation";
import "../../components/main/Donation/Donation.css";

function AdministrationDonationsPage() {
  const [token] = useContext(AuthContext);
  const [donations, setDonations] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function getAllDonations() {
      const donationsResponse = await fetch(
        `http://localhost:3080/api/v1/donations`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (donationsResponse.ok) {
        const donationsData = await donationsResponse.json();
        setDonations(donationsData);
      } else {
        const errorMsg = await donationsResponse.json();
        setErrorMsg("Algo ha salido mal...");
      }
    }
    getAllDonations();
  }, []);

  console.log(donations);

  //seria ideal que el update donacion se hiciese en la misma pagina
  const renderDonations = (donation) => (
    <Donation
      key={donation.iddonacion}
      donationId={donation.iddonacion}
      userId={donation.idusuario}
      donationTitle={donation.titulo}
      donationDate={donation.fechadonacion}
      donationCheck={donation.revisado}
      donationState={donation.correcto}
    />
  );

  return (
    <div className="donations-list-container">
      <h1 className="donations-title-list">DONACIONES</h1>
      <ul className="donations-list">
        <li className="donations-item">{donations.map(renderDonations)}</li>
      </ul>
    </div>
  );
}

export { AdministrationDonationsPage };
