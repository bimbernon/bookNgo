import React from "react";
import "./Donation.css";

const Donation = (props) => {
  const {
    donationId,
    userId,
    donationTitle,
    donationDate,
    donationCheck,
    donationState,
  } = props;

  return (
    <div className="donation-info-container">
      <tr className="donation-main-info">
        {/* <td className="donation-info">{`${donationId} $ ${userId}`}</td> */}
        <td>{donationId}</td>
        <td>{donationTitle}</td>
        <td>{userId}</td>
        <td>{donationDate}</td>
        {/* <h2 className="donation-date"></h2> */}
        <td>
          <div className="donation-main-item">
            <form>
              <label className="donation-state-checkbox-label">
                Revisado
                <input type="checkbox" value={donationCheck} />
              </label>
              <label className="donation-state-checkbox-label">
                Correcto
                <input type="checkbox" value={donationState} />
              </label>
              <button type="submit">ACTUALIZAR</button>
            </form>
          </div>
        </td>
      </tr>
    </div>
  );
};

export { Donation };
